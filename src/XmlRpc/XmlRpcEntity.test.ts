import { XmlRpcEntity } from './XmlRpcEntity';
import { XmlRpcKey } from './XmlPropertyDecorator';

export class MockEntity extends XmlRpcEntity<MockEntity> {
  public readonly field: string = "i'm read only!";

  @XmlRpcKey<MockEntity>('field2.Name', true)
  public field2: string;

  @XmlRpcKey<MockEntity>('field3.Name')
  public field3: string;
}

describe('XmlRpcEntity', () => {
  it('should correctly use the XmlRpcKey decorators', () => {
    const entity = new MockEntity();
    expect(entity.field).toBe("i'm read only!");
    expect(entity.field2).toBe(null);
    expect(entity.field3).toBeUndefined();
  });
});
