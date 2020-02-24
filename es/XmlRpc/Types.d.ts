export interface ClientOptions {
    host?: string;
    path?: string;
    port?: number;
    isSecure?: boolean;
    useCookies?: boolean;
    headers?: {
        [header: string]: string;
    };
    basic_auth?: {
        user: string;
        pass: string;
    };
    method?: 'CONNECT' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT' | 'TRACE';
}
export interface Cookies {
    get(name: string): string;
    set(name: string, value: string, options?: {
        secure: boolean;
        expires: Date;
    }): void;
    toString(): string;
}
export declare type Headers = {
    [header: string]: string;
};
export interface HeadersProcessor {
    composeRequest(headers: Headers): void;
    parseResponse(headers: Headers): void;
}
