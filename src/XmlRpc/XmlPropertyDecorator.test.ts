import { XmlRpcKey, GetXmlRpcPropertyKey, GetFieldsToPopulate } from './XmlPropertyDecorator';
import { XmlRpcEntity } from './XmlRpcEntity';

describe('XmlPropertyDecorator', () => {
  class X extends XmlRpcEntity<X> {
    public field1: any;

    @XmlRpcKey<X>('field2', true)
    public field2: string;
    @XmlRpcKey<X>('field3', true)
    public field3: string;
  }

  it('should be able to read the metadata at runtime', () => {
    const fieldKey = 'My custom field key';
    XmlRpcKey<X>(fieldKey)(X, 'field2');
    expect(GetXmlRpcPropertyKey(X, 'field2')).toBe(fieldKey);
  });

  it('should retrive the class metadata about properties', () => {
    const m: X = new X();
    const metadata = GetFieldsToPopulate(m);
    expect(metadata).toBeDefined();
    expect(metadata.length).toBe(2); // Field 1 is read only, it's not registered.
  });
});
