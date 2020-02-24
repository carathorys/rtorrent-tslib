import 'reflect-metadata';
import { XmlRpcEntity } from './XmlRpcEntity';
import { WritableKeys } from '../helpers';
export declare type XmlRpcEntityMetadata<T> = {
    key: WritableKeys<T>;
    initialize: boolean;
};
export declare const GetXmlRpcPropertyKey: <T extends XmlRpcEntity<T>>(target: T | (new () => T), propertyKey: Exclude<{ [P in keyof T]-?: import("../helpers").IfEquals<{ [Q in P]: T[P]; }, { -readonly [Q_1 in P]: T[P]; }, P, never>; }[keyof T], "setValue">) => string;
export declare const GetFieldsToPopulate: <T extends XmlRpcEntity<T>>(target: XmlRpcEntity<T> | (new () => XmlRpcEntity<T>)) => XmlRpcEntityMetadata<T>[];
declare type TAlias<T> = T | (new () => T);
export declare const XmlRpcKey: <T extends XmlRpcEntity<T>, A = TAlias<T>>(xmlPropertyName: string, initialize?: boolean) => {
    (target: A, key: Exclude<{ [P in keyof T]-?: import("../helpers").IfEquals<{ [Q in P]: T[P]; }, { -readonly [Q_1 in P]: T[P]; }, P, never>; }[keyof T], "setValue">): void;
    (target: A, key: Exclude<{ [P in keyof T]-?: import("../helpers").IfEquals<{ [Q in P]: T[P]; }, { -readonly [Q_1 in P]: T[P]; }, P, never>; }[keyof T], "setValue">): void;
};
export {};
