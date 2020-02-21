import 'reflect-metadata';
import { XmlRpcEntity } from './XmlRpcEntity';
import { WritableKeys } from '../helpers';

const XmlPropertyMetadataKey = Symbol('XmlRpcMetadata');
const InitializeByDefault = Symbol('InitializeByDefault');

export const GetXmlRpcPropertyKey = <T extends XmlRpcEntity<T>>(
  target: T,
  propertyKey: WritableKeys<T>,
): string => {
  const data = Reflect.getMetadata(XmlPropertyMetadataKey, target, propertyKey.toString());
  return data;
};

export const GetFieldsToPopulate = <T extends XmlRpcEntity<T>>(
  target: XmlRpcEntity<T>,
): WritableKeys<T>[] => {
  return Reflect.getMetadata(InitializeByDefault, target);
};

export const XmlRpcKey = <T extends XmlRpcEntity<T>, P extends WritableKeys<T>>(
  xmlPropertyName: string,
  initialize: boolean = true,
): {
  (target: T | (new () => T), key: string | symbol): void;
  (target: T, propertyKey: P): void;
} => {
  // tslint:disable-next-line: no-empty
  const classLevelMetadata = (_: T | (new () => T)) => {};

  const propertyLevelMetadata = (target: T, key: P | string | symbol): void => {
    if (initialize) {
      const existing = Reflect.getOwnMetadata(InitializeByDefault, target) || [];
      existing.push(key);
      Reflect.defineMetadata(InitializeByDefault, existing, target);
    }
    Reflect.defineMetadata(XmlPropertyMetadataKey, xmlPropertyName, target, key.toString());
  };
  return (target: T, key: P | string | symbol) => {
    classLevelMetadata(target), propertyLevelMetadata(target, key);
  };
};
