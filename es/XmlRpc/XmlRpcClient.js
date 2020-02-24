import { __awaiter, __generator } from "tslib";
// import * as url from 'url';
var XmlRpcClient = /** @class */ (function () {
    function XmlRpcClient(options) {
        this.clientOptions = options;
        this.clientOptions.headers = {
            'User-Agent': 'NodeJS XML-RPC Client TS',
            'Content-Type': 'text/xml',
            Accept: 'text/xml',
            'Accept-Charset': 'UTF8',
            Connection: 'Keep-Alive',
        };
        if (this.clientOptions.useCookies === true) {
            // TODO: implemnent something...
        }
    }
    XmlRpcClient.prototype.methodCall = function (method) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log('Calling method: ', method, this.options);
                return [2 /*return*/, fetch((this.clientOptions.isSecure ? 'http' : 'https') + "://" + this.clientOptions.host + ":" + this.clientOptions.port + "/" + this.clientOptions.path, {
                        method: this.clientOptions.method,
                        headers: this.clientOptions.headers,
                        keepalive: true,
                        body: JSON.stringify(params),
                    }).then(function (d) { return d.json(); })];
            });
        });
    };
    XmlRpcClient.prototype.getCookie = function (name) {
        return this.Cookies.get('name');
    };
    XmlRpcClient.prototype.setCookie = function (name, value) {
        this.Cookies.set(name, value);
        return this;
    };
    return XmlRpcClient;
}());
export { XmlRpcClient };
//# sourceMappingURL=XmlRpcClient.js.map