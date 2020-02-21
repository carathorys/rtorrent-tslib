export interface XmlRpcClientOptions {
  host?: string;
  path?: string;
  port?: number;
  url?: string;
  cookies?: boolean;
  headers?: { [header: string]: string };
  basic_auth?: { user: string; pass: string };
  method?: string;
}

export interface XmlRpcCookies {
  get(name: string): string;
  set(name: string, value: string, options?: { secure: boolean; expires: Date }): void;
  toString(): string;
}
export type Headers = { [header: string]: string };

export interface XmlRpcHeadersProcessor {
  composeRequest(headers: Headers): void;
  parseResponse(headers: Headers): void;
}
