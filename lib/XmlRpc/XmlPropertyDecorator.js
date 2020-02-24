"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var XmlPropertyMetadataKey = Symbol('XmlRpcMetadata');
var InitializeByDefault = Symbol('InitializeByDefault');
exports.GetXmlRpcPropertyKey = function (target, propertyKey) {
    var data = Reflect.getMetadata(XmlPropertyMetadataKey, target, propertyKey.toString());
    return data;
};
exports.GetFieldsToPopulate = function (target) {
    return Reflect.getMetadata(InitializeByDefault, target);
};
exports.XmlRpcKey = function (xmlPropertyName, initialize) {
    if (initialize === void 0) { initialize = false; }
    var classLevelMetadata = function (_) {
        // tslint:disable-next-line: no-empty
    };
    var propertyLevelMetadata = function (target, key) {
        var existing = Reflect.getOwnMetadata(InitializeByDefault, target) || [];
        existing.push({ key: key, initialize: initialize });
        Reflect.defineMetadata(InitializeByDefault, existing, target);
        Reflect.defineMetadata(XmlPropertyMetadataKey, xmlPropertyName, target, key.toString());
    };
    return function (target, key) {
        classLevelMetadata(target), propertyLevelMetadata(target, key);
    };
};
//# sourceMappingURL=XmlPropertyDecorator.js.map