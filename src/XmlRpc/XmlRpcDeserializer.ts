import { DateFormatter } from './DateFormatter';
import { Saxophone } from 'saxophone-ts';

export class XmlRpcDeserializer<T> {
  private type?: any;
  private responseType?: any;
  private stack: any[] = [];
  private marks: any[] = [];
  private data: any[] = [];
  private methodName?: string;
  private parser: Saxophone;
  private value: any;
  private readonly dateFormatter: DateFormatter = new DateFormatter();
  private readonly isInteger = /^-?\d+$/;

  push(value: any) {
    this.stack.push(value);
  }

  public DeserializeResponse<T extends any>(stream: string | Buffer): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.parser = new Saxophone();
      this.parser.on('tagOpen', this.onOpenTag.bind(this));
      this.parser.on('tagClose', this.onCloseTag.bind(this));
      this.parser.on('text', this.onText.bind(this));
      this.parser.on('cdata', this.onCData.bind(this));
      this.parser.on('finish', () => {
        if (this.type === null || this.marks.length) {
          reject(new Error('Invalid XML-RPC message'));
        } else if (this.responseType === 'fault') {
          const error: any = new Error(
            'XML-RPC fault' + (this.stack[0].faultString ? ': ' + this.stack[0].faultString : ''),
          );
          error.code = this.stack[0].faultCode;
          error.faultCode = this.stack[0].faultCode;
          error.faultString = this.stack[0].faultString;
          reject(error);
        } else {
          resolve(this.stack[0]);
        }
      });
      this.parser.on('error', reject.bind(this));
      this.parser.parse(stream);
    });
  }

  private onOpenTag(tag: { name: string }): void {
    if (tag.name.toUpperCase() === 'ARRAY' || tag.name.toUpperCase() === 'STRUCT') {
      this.marks.push(this.stack.length);
    }
    this.data = [];
    this.value = tag.name === 'VALUE';
  }

  private onText(text: { contents: string }): void {
    this.data.push(text.contents);
  }

  private onCData(cData: { contents: string }): void {
    this.data.push(cData.contents);
  }

  private onCloseTag(tagName: { name: string }): void {
    const data = this.data.join('');

    switch (tagName.name.toUpperCase()) {
      case 'BOOLEAN':
        this.endBoolean(data);
        break;
      case 'INT':
      case 'I4':
        this.endInt(data);
        break;
      case 'I8':
        this.endI8(data);
        break;
      case 'DOUBLE':
        this.endDouble(data);
        break;
      case 'STRING':
      case 'NAME':
        this.endString(data);
        break;
      case 'ARRAY':
        this.endArray(data);
        break;
      case 'STRUCT':
        this.endStruct(data);
        break;
      case 'BASE64':
        this.endBase64(data);
        break;
      case 'DATETIME.ISO8601':
        this.endDateTime(data);
        break;
      case 'VALUE':
        this.endValue(data);
        break;
      case 'PARAMS':
        this.endParams();
        break;
      case 'FAULT':
        this.endFault();
        break;
      case 'METHODRESPONSE':
        this.endMethodResponse();
        break;
      case 'METHODNAME':
        this.endMethodName(data);
        break;
      case 'METHODCALL':
        this.endMethodCall();
        break;
      case 'NIL':
        this.endNil();
        break;
      case 'DATA':
      case 'PARAM':
      case 'MEMBER':
        // Ignored by design
        break;
      default:
        throw new Error(`Unknown XML-RPC tag '${tagName}'`);
    }
    // } catch (error) {
    //   this.onError(error);
    // }
  }

  private onEnd() {
  }

  private endNil() {
    this.push(null);
    this.value = false;
  }

  private endMethodCall() {
    this.type = 'methodCall';
  }

  private endMethodName(data: string) {
    this.methodName = data;
  }

  private endMethodResponse() {
    this.type = 'methodResponse';
  }

  private endFault() {
    this.responseType = 'fault';
  }

  private endParams() {
    this.responseType = 'params';
  }

  private endValue(data: string) {
    if (this.value) {
      this.endString(data);
    }
  }

  private endDateTime(data: string) {
    const date = this.dateFormatter.decodeIso8601(data);
    this.push(date);
    this.value = false;
  }

  private endBase64(data: string) {
    const buffer = Buffer.alloc(data.length, 0, 'base64');
    this.push(buffer);
    this.value = false;
  }

  private endStruct(data: string) {
    const mark = this.marks.pop();
    const items = this.stack.slice(mark);
    let struct: any = {};
    let i = 0;

    for (; i < items.length; i += 2) {
      struct[items[i]] = items[i + 1];
    }
    this.stack.splice(mark, this.stack.length - mark, struct);

    this.value = false;
  }

  private endArray(data: string) {
    const mark = this.marks.pop();

    this.stack.splice(mark, this.stack.length - mark, this.stack.slice(mark));
    this.value = false;
  }

  private endString(data: string) {
    this.push(data);
    this.value = false;
  }

  private endDouble(data: string) {
    const value = parseFloat(data);
    if (isNaN(value)) {
      throw new Error('Expected a double but got \'' + data + '\'');
    } else {
      this.push(value);
      this.value = false;
    }
  }

  private endI8(data: string) {
    if (!this.isInteger.test(data)) {
      throw new Error('Expected integer (I8) value but got \'' + data + '\'');
    } else {
      this.endString(data);
    }
  }

  private endInt(data: string) {
    const value = parseInt(data, 10);
    if (isNaN(value)) {
      throw new Error('Expected an integer but got \'' + data + '\'');
    } else {
      this.push(value);
      this.value = false;
    }
  }

  private endBoolean(data: string) {
    if (data === '1') {
      this.push(true);
    } else if (data === '0') {
      this.push(false);
    } else {
      throw new Error('Illegal boolean value \'' + data + '\'');
    }
    this.value = false;
  }

  //
  // public DeserializeRequest<T extends any>(s: string): Promise<T> {
  //   throw new Error('Not implemented!');
  // }
}
