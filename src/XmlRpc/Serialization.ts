import { XMLElement, create } from 'xmlbuilder';

export const objectToXml = async (jsObject: any, root: XMLElement): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (jsObject === null || undefined) {
      root.ele('value').ele('nil');
    } else if (typeof jsObject === 'string') {
      root.ele('value').ele('string', {}, jsObject);
    } else if (typeof jsObject === 'number') {
      if (Number.isInteger(jsObject)) {
        root.ele('value').ele('int', {}, jsObject);
      } else {
        root.ele('value').ele('double', {}, jsObject);
      }
    } else if (typeof jsObject === 'object') {
      if (jsObject instanceof Array) {
        const array = root.ele('array').ele('data');
        jsObject.forEach(d => objectToXml(d, array));
      } else if (jsObject instanceof Date) {
        root.ele('value').ele('date', {}, jsObject.toISOString());
      } else if (jsObject instanceof Buffer || Buffer.isBuffer(jsObject)) {
        root.ele('value').ele('base64', {}, jsObject.toString('base64'));
      } else {
        const struct = root.ele('struct');
        Object.keys(jsObject).forEach(async sKey => {
          const member = struct.ele('member');
          member.ele('name', {}, sKey);
          await objectToXml(jsObject[sKey], member);
        });
      }
    }
    resolve();
  });
};

export const CreateMethodRequest = async (method: string, ...params: any[]): Promise<string> => {
  const root = create('methodCall');
  root.ele('methodName', {}, method);
  const paramsSection = root.ele('params');
  params.forEach(async (param: any) => {
    await objectToXml(param, paramsSection.ele('param'));
  });
  return root.end({ pretty: false });
};

export const CreateMethodResponse = async (...params: any[]): Promise<string> => {
  const root = create('methodResponse');
  const paramsSection = root.ele('params');
  params.forEach(async (param: any) => {
    await objectToXml(param, paramsSection.ele('param'));
  });
  return root.end({ pretty: false });
};
