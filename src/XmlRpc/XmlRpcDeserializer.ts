import { DateFormatter } from './DateFormatter';
import { Saxophone, TagOpenNode, TagCloseNode, TextNode, CDATANode } from 'Saxophone';

export class XmlRpcDeserializer {
  private type?: any;
  private responseType?: any;
  private stack: any[] = [];
  private marks: any[] = [];
  private data: any[] = [];
  private methodName?: string;
  private parser: Saxophone;
  private value: any;
  private readonly dateFormatter: DateFormatter = new DateFormatter();
  private resolve: (...params: any) => any;
  private reject: (...params: any) => void;

  constructor(private readonly encoding: string = 'utf8') {
    this.parser = new Saxophone();
    this.parser.on('tagopen', this.onOpenTag.bind(this));
    this.parser.on('tagclose', this.onCloseTag.bind(this));
    this.parser.on('text', this.onText.bind(this));
    this.parser.on('cdata', this.onCData.bind(this));
    this.parser.on('finish', this.onEnd.bind(this));
    this.parser.on('error', this.onError.bind(this));
  }

  private onOpenTag(tag: TagOpenNode): void {
    if (tag.name === 'ARRAY' || tag.name === 'STRUCT') {
      this.marks.push(this.stack.length);
    }
    this.data = [];
    this.value = tag.name === 'VALUE';
  }

  push(value: any) {
    this.stack.push(value);
  }

  private onText(text: TextNode): void {
    this.data.push(text.contents);
  }
  private onCData(cData: CDATANode): void {
    this.data.push(cData.contents);
  }

  private onCloseTag(tagName: TagCloseNode): void {
    const data = this.data.join('');
    try {
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
          this.onError(new Error(`Unknown XML-RPC tag '${tagName}'`));
          break;
      }
    } catch (error) {
      this.onError(error);
    }
  }

  private onEnd() {
    if (this.type === null || this.marks.length) {
      this.reject(new Error('Invalid XML-RPC message'));
    } else if (this.responseType === 'fault') {
      const error: any = new Error(
        'XML-RPC fault' + (this.stack[0].faultString ? ': ' + this.stack[0].faultString : ''),
      );
      error.code = this.stack[0].faultCode;
      error.faultCode = this.stack[0].faultCode;
      error.faultString = this.stack[0].faultString;
      this.reject(error);
    } else {
      this.resolve(this.stack);
    }
  }
  private onError(error: Error): void {
    this.reject(error);
  }

  private endNil() {
    this.push(null);
    this.value = false;
  }
  private endMethodCall() {
    this.type = 'methodcall';
  }
  private endMethodName(data: string) {
    this.methodName = data;
  }
  private endMethodResponse() {
    this.type = 'methodresponse';
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
    // tslint:disable-next-line: deprecation

    const buffer = Buffer.alloc(data.length, '0', 'base64');
    // new Buffer(data, 'base64');

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
      throw new Error("Expected a double but got '" + data + "'");
    } else {
      this.push(value);
      this.value = false;
    }
  }

  private readonly isInteger = /^-?\d+$/;
  private endI8(data: string) {
    if (!this.isInteger.test(data)) {
      throw new Error("Expected integer (I8) value but got '" + data + "'");
    } else {
      this.endString(data);
    }
  }

  private endInt(data: string) {
    const value = parseInt(data, 10);
    if (isNaN(value)) {
      throw new Error("Expected an integer but got '" + data + "'");
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
      throw new Error("Illegal boolean value '" + data + "'");
    }
    this.value = false;
  }

  public DeserializeResponse<T extends any>(stream: string | Buffer): Promise<T> {
    return new Promise<T>((res, rej) => {
      this.resolve = res;
      this.reject = rej;
      this.parser.write(stream);
      this.parser.end();
    });
  }

  public DeserializeRequest<T extends any>(s: string): Promise<T> {
    throw new Error('Not implemented!');
  }
}
