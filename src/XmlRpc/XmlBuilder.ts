export class XmlBuilder {
  private text: string;
  private children: XmlBuilder[];

  constructor(private readonly elementName: string, private readonly attributes?: any) {
    if (!attributes) {
      this.attributes = {};
    }
    this.children = [];
  }

  public attr(key: string, value: any) {
    this.attributes[key] = value;
  }

  public ele(elementName: string, attributes?: any, textContent?: string): XmlBuilder {
    const lastChild = new XmlBuilder(elementName, attributes);
    if (textContent) {
      lastChild.txt(textContent);
    }
    this.children.push(lastChild);
    return lastChild;
  }

  public txt(text: string) {
    this.text = text;
  }

  public end(): string {
    if (this.children?.length > 0 || this.text?.length > 0) {
      if (this.text?.length > 0) {
        return `<${this.elementName}>${this.text}</${this.elementName}>`;
      } else {
        let str = `<${this.elementName}>`;
        for (const child of this.children) {
          str += child.end();
        }
        str += `</${this.elementName}>`;
        return str;
      }
    } else {
      return `<${this.elementName}/>`;
    }
  }
}
