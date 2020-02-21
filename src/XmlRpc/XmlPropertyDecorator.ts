import 'reflect-metadata';
import { XmlRpcEntity } from './XmlRpcEntity';
import { WritableKeys } from '../helpers';

const XmlPropertyMetadataKey = Symbol('XmlRpcMetadata');
const InitializeByDefault = Symbol('InitializeByDefault');

export type XmlRpcEntityMetadata<T> = { key: WritableKeys<T>; initialize: boolean };

export const GetXmlRpcPropertyKey = <T extends XmlRpcEntity<T>>(
  target: T | (new () => T),
  propertyKey: WritableKeys<T>,
): string => {
  const data = Reflect.getMetadata(XmlPropertyMetadataKey, target, propertyKey.toString());
  return data;
};

export const GetFieldsToPopulate = <T extends XmlRpcEntity<T>>(
  target: XmlRpcEntity<T> | (new () => XmlRpcEntity<T>),
): XmlRpcEntityMetadata<T>[] => {
  return Reflect.getMetadata(InitializeByDefault, target);
};

type TAlias<T> = T | (new () => T);

export const XmlRpcKey = <T extends XmlRpcEntity<T>, A = TAlias<T>>(
  xmlPropertyName: string,
  initialize: boolean = false,
): {
  (target: A, key: WritableKeys<T>): void;
  (target: A, key: WritableKeys<T>): void;
} => {
  const classLevelMetadata = (_: A) => {
    // tslint:disable-next-line: no-empty
  };

  const propertyLevelMetadata = (target: A, key: WritableKeys<T>): void => {
    const existing = Reflect.getOwnMetadata(InitializeByDefault, target) || [];
    existing.push({ key, initialize });
    Reflect.defineMetadata(InitializeByDefault, existing, target);
    Reflect.defineMetadata(XmlPropertyMetadataKey, xmlPropertyName, target, key.toString());
  };
  return (target: A, key: WritableKeys<T>) => {
    classLevelMetadata(target), propertyLevelMetadata(target, key);
  };
};
