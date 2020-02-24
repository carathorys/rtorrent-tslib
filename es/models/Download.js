import { __decorate, __extends, __metadata } from "tslib";
import { XmlRpcKey, XmlRpcEntity } from '../XmlRpc';
var Download = /** @class */ (function (_super) {
    __extends(Download, _super);
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
    __decorate([
        XmlRpcKey('d.name'),
        __metadata("design:type", String)
    ], Download.prototype, "name", void 0);
    __decorate([
        XmlRpcKey('d.directory'),
        __metadata("design:type", String)
    ], Download.prototype, "directory", void 0);
    __decorate([
        XmlRpcKey('d.state'),
        __metadata("design:type", Boolean)
    ], Download.prototype, "state", void 0);
    __decorate([
        XmlRpcKey('d.is_open'),
        __metadata("design:type", Boolean)
    ], Download.prototype, "isOpen", void 0);
    __decorate([
        XmlRpcKey('d.is_active'),
        __metadata("design:type", Boolean)
    ], Download.prototype, "isActive", void 0);
    __decorate([
        XmlRpcKey('d.bytes_done'),
        __metadata("design:type", Number)
    ], Download.prototype, "bytesDone", void 0);
    __decorate([
        XmlRpcKey('d.complete'),
        __metadata("design:type", Boolean)
    ], Download.prototype, "complete", void 0);
    __decorate([
        XmlRpcKey('d.completed_bytes'),
        __metadata("design:type", Number)
    ], Download.prototype, "completedBytes", void 0);
    __decorate([
        XmlRpcKey('d.connection_current'),
        __metadata("design:type", Number)
    ], Download.prototype, "connectionCurrent", void 0);
    __decorate([
        XmlRpcKey('d.connection_leech'),
        __metadata("design:type", Number)
    ], Download.prototype, "connectedLeeches", void 0);
    __decorate([
        XmlRpcKey('d.connection_seed'),
        __metadata("design:type", Number)
    ], Download.prototype, "connectedSeeds", void 0);
    __decorate([
        XmlRpcKey('d.creation_date'),
        __metadata("design:type", String)
    ], Download.prototype, "creationDate", void 0);
    __decorate([
        XmlRpcKey('d.down.rate'),
        __metadata("design:type", Number)
    ], Download.prototype, "downRate", void 0);
    __decorate([
        XmlRpcKey('d.hash'),
        __metadata("design:type", String)
    ], Download.prototype, "hash", void 0);
    __decorate([
        XmlRpcKey('d.hashing'),
        __metadata("design:type", Number)
    ], Download.prototype, "hashing", void 0);
    __decorate([
        XmlRpcKey('d.is_partially_done'),
        __metadata("design:type", Boolean)
    ], Download.prototype, "isPartiallyDone", void 0);
    __decorate([
        XmlRpcKey('d.is_private'),
        __metadata("design:type", Boolean)
    ], Download.prototype, "isPrivate", void 0);
    __decorate([
        XmlRpcKey('d.bitfield'),
        __metadata("design:type", Boolean)
    ], Download.prototype, "bitfield", void 0);
    __decorate([
        XmlRpcKey('d.priority'),
        __metadata("design:type", Number)
    ], Download.prototype, "priority", void 0);
    __decorate([
        XmlRpcKey('d.peers_accounted'),
        __metadata("design:type", Number)
    ], Download.prototype, "peers", void 0);
    __decorate([
        XmlRpcKey('d.peers_complete'),
        __metadata("design:type", Number)
    ], Download.prototype, "peersCompleted", void 0);
    __decorate([
        XmlRpcKey('d.peers_connected'),
        __metadata("design:type", Number)
    ], Download.prototype, "connectedPeers", void 0);
    return Download;
}(XmlRpcEntity));
export { Download };
//# sourceMappingURL=Download.js.map