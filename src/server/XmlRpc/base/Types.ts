export interface ClientOptions {
  host?: string;
  path?: string;
  port?: number;
  url?: string;
  cookies?: boolean;
  headers?: { [header: string]: string };
  basic_auth?: { user: string; pass: string };
  method?: string;
}
