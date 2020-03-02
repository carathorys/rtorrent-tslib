import { create } from 'xmlbuilder2';
import { XMLBuilder } from 'xmlbuilder2/lib/interfaces';

export const objectToXml = async (jsObject: any, root: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (jsObject === null || undefined) {
      root.ele('value').ele('nil');
    } else if (typeof jsObject === 'string') {
      root.ele('value').ele('string').txt(jsObject);
    } else if (typeof jsObject === 'number') {
      if (Number.isInteger(jsObject)) {
        root.ele('value').ele('int').txt(jsObject);
      } else {
        root.ele('value').ele('double').txt(jsObject);
      }
    } else if (typeof jsObject === 'object') {
      if (jsObject instanceof Array) {
        const array = root.ele('value').ele('array').ele('data');
        jsObject.forEach(d => objectToXml(d, array));
      } else if (jsObject instanceof Date) {
        root.ele('value').ele('date').txt(jsObject.toISOString());
      } else if (jsObject instanceof Buffer || Buffer.isBuffer(jsObject)) {
        root.ele('value').ele('base64').txt(jsObject.toString('base64'));
      } else {
        const struct = root.ele('struct');
        Object.keys(jsObject).forEach(async sKey => {
          const member = struct.ele('member');
          member.ele('name').txt(sKey);
          await objectToXml(jsObject[sKey], member);
        });
      }
    }
    resolve();
  });
};

export const CreateMethodRequest = async (method: string, ...params: any[]): Promise<string> => {
  const root = create({ version: '1.0' }).ele('methodCall');
  root.ele('methodName').txt(method);
  const paramsSection = root.ele('params');
  for (const param of params) {
    await objectToXml(param, paramsSection.ele('param'));
  }
  return root.end({ prettyPrint: false }).toString();
};

export const CreateMethodResponse = async (...params: any[]): Promise<string> => {
  const root = create({ version: '1.0' }).ele('methodResponse');
  const paramsSection = root.ele('params');
  for (const param of params) {
    await objectToXml(param, paramsSection.ele('param'));
  }
  return root.end({ prettyPrint: false }).toString();
};
