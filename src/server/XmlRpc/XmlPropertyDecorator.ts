import 'reflect-metadata';
import { XmlRpcEntity } from './XmlRpcEntity';
import { WritableKeys } from '../../helpers';

const XmlPropertyMetadataKey = Symbol('XmlRpcMetadata');
const InitializeByDefault = Symbol('InitializeByDefault');

export const XmlRpcKey = <T extends XmlRpcEntity<T>, P extends WritableKeys<T>>(
  xmlPropertyName: string,
  initialize: boolean = true,
): {
  (target: T | (new () => T), key: P): void;
  (target: T, propertyKey: string | symbol): void;
} => {
  const classLevelMetadata = (target: T | (new () => T)) => {
    // Reflect.getOwnMetadata(InitializeByDefault, target);
  };
  const propertyLevelMetadata = (target: T, key: string | symbol): void => {
    if (initialize) {
      const existing = Reflect.getOwnMetadata(InitializeByDefault, target) || [];
      existing.push(key);
      Reflect.defineMetadata(InitializeByDefault, existing, target);
    }
    Reflect.defineMetadata(XmlPropertyMetadataKey, xmlPropertyName, target, key);
  };
  return (target, key) => {
    classLevelMetadata(target), propertyLevelMetadata(target, key);
  };
};

export const GetXmlRpcPropertyKey = <T extends XmlRpcEntity<T>>(
  target: T,
  propertyKey: WritableKeys<T>,
): string => {
  const data = Reflect.getMetadata(XmlPropertyMetadataKey, target, propertyKey.toString());
  return data;
};

export const GetFieldsToPopulate = <
  T extends XmlRpcEntity<T>
>(
  target: T,
): WritableKeys<XmlRpcEntity<T>>[] => {
  return Reflect.getMetadata(InitializeByDefault, target);
};
