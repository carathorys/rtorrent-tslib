import { WritableKeys } from '../..//helpers';
import { GetFieldsToPopulate } from './XmlPropertyDecorator';

// tslint:disable-next-line: no-empty-interface
export class XmlRpcEntity<T extends XmlRpcEntity<T>> {
  /**
   *
   */
  constructor() {
    GetFieldsToPopulate(this).forEach((field) => {
      this.setValue(field, null);
    });
  }

  public setValue(key: string, value: XmlRpcEntity<T>[keyof XmlRpcEntity<T>]): void {
    this[key.toString()] = value;
  }
}
