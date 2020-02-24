import 'reflect-metadata';
var XmlPropertyMetadataKey = Symbol('XmlRpcMetadata');
var InitializeByDefault = Symbol('InitializeByDefault');
export var GetXmlRpcPropertyKey = function (target, propertyKey) {
    var data = Reflect.getMetadata(XmlPropertyMetadataKey, target, propertyKey.toString());
    return data;
};
export var GetFieldsToPopulate = function (target) {
    return Reflect.getMetadata(InitializeByDefault, target);
};
export var XmlRpcKey = function (xmlPropertyName, initialize) {
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