import { ClientOptions, Cookies, HeadersProcessor } from './Types';
export declare class XmlRpcClient {
    private readonly clientOptions;
    constructor(options: ClientOptions);
    methodCall<T extends any>(method: string, ...params: any): Promise<T>;
    headersProcessors: {
        processors: HeadersProcessor[];
    };
    Cookies: Cookies;
    isSecure: boolean;
    options: ClientOptions;
    getCookie(name: string): string;
    setCookie(name: string, value: string): XmlRpcClient;
}
