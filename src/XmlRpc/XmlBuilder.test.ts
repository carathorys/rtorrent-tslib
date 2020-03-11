import { XmlBuilder } from './XmlBuilder';

describe('XmlBuilder', () => {
  it('create <root/>', () => {
    const builder = new XmlBuilder('root');
    expect(builder.end()).toBe('<root/>');
  });
  it('create <root><x/></root>', () => {
    const builder = new XmlBuilder('root');
    builder.ele('x');
    expect(builder.end()).toBe('<root><x/></root>');
  });

  it('create <root><x key="value"/></root> using ele()', () => {
    const builder = new XmlBuilder('root');
    builder.ele('x', { key: 'value' });
    expect(builder.end()).toBe('<root><x key="value"/></root>');
  });

  it('create <root><x key="value"/></root> using attr()', () => {
    const builder = new XmlBuilder('root');
    builder.ele('x').attr('key', 'value');
    expect(builder.end()).toBe('<root><x key="value"/></root>');
  });

  it('create <root><x key="value">str</x></root> using ele()', () => {
    const builder = new XmlBuilder('root');
    builder.ele('x', { key: 'value' }, 'str');
    expect(builder.end()).toBe('<root><x key="value">str</x></root>');
  });

  it('create <root><x key="value">str</x></root> using attr().txt()', () => {
    const builder = new XmlBuilder('root');
    builder
      .ele('x')
      .attr('key', 'value')
      .txt('str');
    expect(builder.end()).toBe('<root><x key="value">str</x></root>');
  });

  it('create <root><x>str</x></root> using ele()', () => {
    const builder = new XmlBuilder('root');
    builder.ele('x', null, 'str');
    expect(builder.end()).toBe('<root><x>str</x></root>');
  });

  it('create <root><x key="value">str</x></root> using ele().txt()', () => {
    const builder = new XmlBuilder('root');
    builder.ele('x').txt('str');
    expect(builder.end()).toBe('<root><x>str</x></root>');
  });


  it('create <root key="value"><x>str</x></root> using ele()', () => {
    const builder = new XmlBuilder('root', { key: 'value'});
    builder.ele('x', null, 'str');
    expect(builder.end()).toBe('<root key="value"><x>str</x></root>');
  });

  it('create <root key="value"><x>str</x></root> using ele().attr()', () => {
    const builder = new XmlBuilder('root');
    builder.attr('key', 'value').ele('x').txt('str');
    expect(builder.end()).toBe('<root key="value"><x>str</x></root>');
  });
});
