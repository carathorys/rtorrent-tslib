"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var XmlRpc_1 = require("../XmlRpc");
var Download = /** @class */ (function (_super) {
    tslib_1.__extends(Download, _super);
    function Download() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Download.prototype, "IsClosed", {
        get: function () {
            return this.isOpen === false && this.state === false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Download.prototype, "IsPaused", {
        get: function () {
            return this.isOpen === true && this.isActive === false && this.state === false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Download.prototype, "IsStarted", {
        get: function () {
            return this.isOpen === true && this.isActive === true && this.state === true;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        XmlRpc_1.XmlRpcKey('d.name'),
        tslib_1.__metadata("design:type", String)
    ], Download.prototype, "name", void 0);
    tslib_1.__decorate([
        XmlRpc_1.XmlRpcKey('d.directory'),
        tslib_1.__metadata("design:type", String)
    ], Download.prototype, "directory", void 0);
    tslib_1.__decorate([
        XmlRpc_1.XmlRpcKey('d.state'),
        tslib_1.__metadata("design:type", Boolean)
    ], Download.prototype, "state", void 0);
    tslib_1.__decorate([
        XmlRpc_1.XmlRpcKey('d.is_open'),
        tslib_1.__metadata("design:type", Boolean)
    ], Download.prototype, "isOpen", void 0);
    tslib_1.__decorate([
        XmlRpc_1.XmlRpcKey('d.is_active'),
        tslib_1.__metadata("design:type", Boolean)
    ], Download.prototype, "isActive", void 0);
    tslib_1.__decorate([
        XmlRpc_1.XmlRpcKey('d.bytes_done'),
        tslib_1.__metadata("design:type", Number)
    ], Download.prototype, "bytesDone", void 0);
    tslib_1.__decorate([
        XmlRpc_1.XmlRpcKey('d.complete'),
        tslib_1.__metadata("design:type", Boolean)
    ], Download.prototype, "complete", void 0);
    tslib_1.__decorate([
        XmlRpc_1.XmlRpcKey('d.completed_bytes'),
        tslib_1.__metadata("design:type", Number)
    ], Download.prototype, "completedBytes", void 0);
    tslib_1.__decorate([
        XmlRpc_1.XmlRpcKey('d.connection_current'),
        tslib_1.__metadata("design:type", Number)
    ], Download.prototype, "connectionCurrent", void 0);
    tslib_1.__decorate([
        XmlRpc_1.XmlRpcKey('d.connection_leech'),
        tslib_1.__metadata("design:type", Number)
    ], Download.prototype, "connectedLeeches", void 0);
    tslib_1.__decorate([
        XmlRpc_1.XmlRpcKey('d.connection_seed'),
        tslib_1.__metadata("design:type", Number)
    ], Download.prototype, "connectedSeeds", void 0);
    tslib_1.__decorate([
        XmlRpc_1.XmlRpcKey('d.creation_date'),
        tslib_1.__metadata("design:type", String)
    ], Download.prototype, "creationDate", void 0);
    tslib_1.__decorate([
        XmlRpc_1.XmlRpcKey('d.down.rate'),
        tslib_1.__metadata("design:type", Number)
    ], Download.prototype, "downRate", void 0);
    tslib_1.__decorate([
        XmlRpc_1.XmlRpcKey('d.hash'),
        tslib_1.__metadata("design:type", String)
    ], Download.prototype, "hash", void 0);
    tslib_1.__decorate([
        XmlRpc_1.XmlRpcKey('d.hashing'),
        tslib_1.__metadata("design:type", Number)
    ], Download.prototype, "hashing", void 0);
    tslib_1.__decorate([
        XmlRpc_1.XmlRpcKey('d.is_partially_done'),
        tslib_1.__metadata("design:type", Boolean)
    ], Download.prototype, "isPartiallyDone", void 0);
    tslib_1.__decorate([
        XmlRpc_1.XmlRpcKey('d.is_private'),
        tslib_1.__metadata("design:type", Boolean)
    ], Download.prototype, "isPrivate", void 0);
    tslib_1.__decorate([
        XmlRpc_1.XmlRpcKey('d.bitfield'),
        tslib_1.__metadata("design:type", Boolean)
    ], Download.prototype, "bitfield", void 0);
    tslib_1.__decorate([
        XmlRpc_1.XmlRpcKey('d.priority'),
        tslib_1.__metadata("design:type", Number)
    ], Download.prototype, "priority", void 0);
    tslib_1.__decorate([
        XmlRpc_1.XmlRpcKey('d.peers_accounted'),
        tslib_1.__metadata("design:type", Number)
    ], Download.prototype, "peers", void 0);
    tslib_1.__decorate([
        XmlRpc_1.XmlRpcKey('d.peers_complete'),
        tslib_1.__metadata("design:type", Number)
    ], Download.prototype, "peersCompleted", void 0);
    tslib_1.__decorate([
        XmlRpc_1.XmlRpcKey('d.peers_connected'),
        tslib_1.__metadata("design:type", Number)
    ], Download.prototype, "connectedPeers", void 0);
    return Download;
}(XmlRpc_1.XmlRpcEntity));
exports.Download = Download;
//# sourceMappingURL=Download.js.map