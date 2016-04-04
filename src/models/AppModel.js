"use strict";
var Promise = require('bluebird');
var AppModel = (function () {
    function AppModel(mongooseModel) {
        this.mongooseModel = mongooseModel;
    }
    AppModel.prototype.get = function (params) {
        return typeof params === "string" ? this._getRecordByID(params) : this._getRecordByQuery(params);
    };
    AppModel.prototype._getRecordByQuery = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.mongooseModel.findOne(query).lean().exec(function (err, doc) {
                return err ? reject(err) : (doc ? resolve(doc) : reject(new Error("Not found")));
            });
        });
    };
    AppModel.prototype._getRecordByID = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.mongooseModel.findById(id).lean().exec(function (err, doc) {
                return err ? reject(err) : (doc ? resolve(doc) : reject(new Error("Not found")));
            });
        });
    };
    AppModel.prototype.query = function (query, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var queryObj = _this.mongooseModel.find(query);
            queryObj = _this._addQueryOptions(queryObj, options);
            queryObj = queryObj.lean();
            queryObj.exec(function (err, result) {
                err ? reject(err) : resolve(result);
            });
        });
    };
    AppModel.prototype._addQueryOptions = function (queryObj, options) {
        options = options || {};
        if (options.sort && typeof options.sort === "object") {
            queryObj = queryObj.sort(options.sort);
        }
        if (options.populate instanceof Array) {
            options.populate.forEach(function (item) {
                queryObj = queryObj.populate(item);
            });
        }
        if (typeof Number(options.limit) === 'number') {
            queryObj = queryObj.limit(Number(options.limit));
        }
        if (typeof options.fields === 'string') {
            queryObj = queryObj.select(options.fields);
        }
        return queryObj;
    };
    AppModel.prototype.put = function (id, body) {
        var _this = this;
        delete body._id;
        return new Promise(function (resolve, reject) {
            _this.mongooseModel.findByIdAndUpdate(id, body).lean().exec(function (err, result) {
                return err ? reject(err) : resolve(result);
            });
        });
    };
    AppModel.prototype.add = function (body) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            new _this.mongooseModel(body).save(function (err, pool) {
                return err ? reject(err) : resolve(pool);
            });
        });
    };
    AppModel.prototype.remove = function (ids) {
        var _this = this;
        var query = this._constructRemoveQuery(ids);
        return new Promise(function (resolve, reject) {
            _this.mongooseModel.remove(query).exec(function (err, result) {
                return err ? reject(err) : resolve(result);
            });
        });
    };
    AppModel.prototype.removeUsingQuery = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.mongooseModel.remove(query).exec(function (err, result) {
                return err ? reject(err) : resolve(result);
            });
        });
    };
    AppModel.prototype._constructRemoveQuery = function (ids) {
        var query = ids || {};
        if (ids instanceof Array) {
            query = {
                '_id': { $in: ids }
            };
        }
        else if (typeof query === "string") {
            query = {
                '_id': ids
            };
        }
        else if (typeof ids === "object") {
            query = ids;
        }
        return query;
    };
    return AppModel;
}());
exports.__esModule = true;
exports["default"] = AppModel;
//# sourceMappingURL=AppModel.js.map