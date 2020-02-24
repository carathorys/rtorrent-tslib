"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var XmlPropertyDecorator_1 = require("./XmlRpc/XmlPropertyDecorator");
var models_1 = require("./models");
var XmlRpc_1 = require("./XmlRpc");
var RTorrentClient = /** @class */ (function () {
    function RTorrentClient(clientOptions) {
        this.client = new XmlRpc_1.XmlRpcClient(clientOptions);
        this.downloadInstance = new models_1.Download();
    }
    RTorrentClient.prototype.getTorrents = function (fetchDetails) {
        if (fetchDetails === void 0) { fetchDetails = false; }
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var torrentIds;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.methodCall('download_list', [''])];
                    case 1:
                        torrentIds = _a.sent();
                        if (!(fetchDetails === true)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getTorrentDetails.apply(this, tslib_1.__spreadArrays([torrentIds], keys))];
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var mappedKeys;
            var _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if ((keys === null || keys === void 0 ? void 0 : keys.length) <= 0) {
                            keys = XmlPropertyDecorator_1.GetFieldsToPopulate(new models_1.Download()).map(function (x) { return x.key; });
                        }
                        mappedKeys = (_a = this.PrepareQuery(keys)) === null || _a === void 0 ? void 0 : _a.map(function (x) { return x + "="; });
                        return [4 /*yield*/, (_b = this.client).methodCall.apply(_b, tslib_1.__spreadArrays(['d.multicall2', torrentIds, ''], mappedKeys))];
                    case 1: return [2 /*return*/, (_c.sent()).map(function (x) {
                            var obj = new models_1.Download();
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
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
                return XmlPropertyDecorator_1.GetXmlRpcPropertyKey(_this.downloadInstance, keyToInclude);
            });
        }
        else {
            return [XmlPropertyDecorator_1.GetXmlRpcPropertyKey(this.downloadInstance, keysToInclude)];
        }
    };
    return RTorrentClient;
}());
exports.RTorrentClient = RTorrentClient;
//# sourceMappingURL=RTorrentClient.js.map