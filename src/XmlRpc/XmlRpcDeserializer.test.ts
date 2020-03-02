import { XmlRpcDeserializer } from './XmlRpcDeserializer';

describe('XmlRpcDeserializer', () => {
  let deserializer: XmlRpcDeserializer<any>;

  beforeEach(() => {
    deserializer = new XmlRpcDeserializer();
  });

  it('should be initialized', () => {
    expect(deserializer).toBeTruthy();
  });

  it('should parse a primitive', async () => {
    const result = await deserializer.DeserializeResponse('<string>x</string>');
    expect(result).toBe('x');
  });

  it('should parse a primitive within "data" tag', async () => {
    const result = await deserializer.DeserializeResponse('<data><string>x</string></data>');
    expect(result).toBe('x');
  });

  it('should parse an array', async () => {
    const result = await deserializer.DeserializeResponse('<array><data><string>x</string><i4>3</i4><double>3.3</double></data></array>');
    expect(result).toStrictEqual(['x', 3, 3.3]);
  });

  it('should parse a simple with one key', async () => {
    const result = await deserializer.DeserializeResponse('<struct><member><name>key</name><value><string>value</string></value></member></struct>');
    expect(result).toStrictEqual({ key: 'value' });
  });
  it('should parse a simple with multiple keys', async () => {
    const result = await deserializer.DeserializeResponse(`<struct>
<member><name>key1</name><value><string>value1</string></value></member>
<member><name>key2</name><value><string>value2</string></value></member>
<member><name>key3</name><value><string>value3</string></value></member>
<member><name>key4</name><value><string>value4</string></value></member>
</struct>`);
    expect(result).toStrictEqual({ key1: 'value1', key2: 'value2', key3: 'value3', key4: 'value4' });
  });

  it('should parse a complex struct', async () => {
    const result = await deserializer.DeserializeResponse(`
<struct>
  <member>
    <name>key1</name>
    <value>
      <array>
        <data>
          <value><string>Data</string></value>
          <value><i4>136</i4></value>
          <value><double>3.3</double></value>
        </data>
      </array>
    </value>
  </member>
</struct>`);
    expect(result).toStrictEqual({ key1: ['Data', 136, 3.3] });
  });
});
