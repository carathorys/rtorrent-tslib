import { XmlRpcKey, GetXmlRpcPropertyKey, GetFieldsToPopulate } from './XmlPropertyDecorator';
import { MockEntity } from './XmlRpcEntity.test';

describe('XmlPropertyDecorator', () => {
  it('should be able to read the metadata at runtime', () => {
    const fieldKey = 'My custom field key';
    XmlRpcKey<MockEntity>(fieldKey)(MockEntity, 'field2');
    expect(GetXmlRpcPropertyKey(MockEntity, 'field2')).toBe(fieldKey);
  });

  it('should retrive the class metadata about properties', () => {
    const m: MockEntity = new MockEntity();
    const metadata = GetFieldsToPopulate(m);
    expect(metadata).toBeDefined();
    expect(metadata.length).toBe(2); // Field 1 is read only, it's not registered.
  });
});
