import { WritableKeys } from '../helpers';
import { GetFieldsToPopulate } from './XmlPropertyDecorator';

type IndexedEntity<T extends XmlRpcEntity<T>> = {
  [K in keyof T]: T[K];
};

export class XmlRpcEntity<T extends XmlRpcEntity<T>> {
  constructor() {
    GetFieldsToPopulate(this)?.forEach((field) => {
      if (field?.initialize === true) {
        this.setValue<T, any>(field.key, null);
      }
    });
  }

  public setValue<X extends IndexedEntity<T>, K extends keyof X>(key: K, value: X[K]): void {
    ((this as unknown) as X)[key] = value;
  }
}
