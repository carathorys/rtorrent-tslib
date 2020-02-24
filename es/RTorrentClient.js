import { __awaiter, __generator, __spreadArrays } from "tslib";
import { GetXmlRpcPropertyKey, GetFieldsToPopulate } from './XmlRpc/XmlPropertyDecorator';
import { Download } from './models';
import { XmlRpcClient } from './XmlRpc';
var RTorrentClient = /** @class */ (function () {
    function RTorrentClient(clientOptions) {
        this.client = new XmlRpcClient(clientOptions);
        this.downloadInstance = new Download();
    }
    RTorrentClient.prototype.getTorrents = function (fetchDetails) {
        if (fetchDetails === void 0) { fetchDetails = false; }
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var torrentIds;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.methodCall('download_list', [''])];
                    case 1:
                        torrentIds = _a.sent();
                        if (!(fetchDetails === true)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getTorrentDetails.apply(this, __spreadArrays([torrentIds], keys))];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [2 /*return*/, torrentIds];
                }
            });
        });
    };
    RTorrentClient.prototype.getTorrentDetails = function (torrentIds) {
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var mappedKeys;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if ((keys === null || keys === void 0 ? void 0 : keys.length) <= 0) {
                            keys = GetFieldsToPopulate(new Download()).map(function (x) { return x.key; });
                        }
                        mappedKeys = (_a = this.PrepareQuery(keys)) === null || _a === void 0 ? void 0 : _a.map(function (x) { return x + "="; });
                        return [4 /*yield*/, (_b = this.client).methodCall.apply(_b, __spreadArrays(['d.multicall2', torrentIds, ''], mappedKeys))];
                    case 1: return [2 /*return*/, (_c.sent()).map(function (x) {
                            var obj = new Download();
                            keys.forEach(function (key, index) {
                                obj.setValue(key, x[index]);
                            });
                            return obj;
                        })];
                }
            });
        });
    };
    RTorrentClient.prototype.getCommands = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.methodCall('system.listMethods')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RTorrentClient.prototype.PrepareQuery = function (keysToInclude) {
        var _this = this;
        if (keysToInclude instanceof Array) {
            return keysToInclude.map(function (keyToInclude) {
                return GetXmlRpcPropertyKey(_this.downloadInstance, keyToInclude);
            });
        }
        else {
            return [GetXmlRpcPropertyKey(this.downloadInstance, keysToInclude)];
        }
    };
    return RTorrentClient;
}());
export { RTorrentClient };
//# sourceMappingURL=RTorrentClient.js.map