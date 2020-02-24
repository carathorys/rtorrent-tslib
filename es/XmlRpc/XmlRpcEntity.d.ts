declare type IndexedEntity<T extends XmlRpcEntity<T>> = {
    [K in keyof T]: T[K];
};
export declare class XmlRpcEntity<T extends XmlRpcEntity<T>> {
    constructor();
    setValue<X extends IndexedEntity<T>, K extends keyof X>(key: K, value: X[K]): void;
}
export {};
