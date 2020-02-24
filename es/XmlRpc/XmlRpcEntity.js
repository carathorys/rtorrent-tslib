import { GetFieldsToPopulate } from './XmlPropertyDecorator';
var XmlRpcEntity = /** @class */ (function () {
    function XmlRpcEntity() {
        var _this = this;
        var _a;
        (_a = GetFieldsToPopulate(this)) === null || _a === void 0 ? void 0 : _a.forEach(function (field) {
            if ((field === null || field === void 0 ? void 0 : field.initialize) === true) {
                _this.setValue(field.key, null);
            }
        });
    }
    XmlRpcEntity.prototype.setValue = function (key, value) {
        this[key] = value;
    };
    return XmlRpcEntity;
}());
export { XmlRpcEntity };
//# sourceMappingURL=XmlRpcEntity.js.map