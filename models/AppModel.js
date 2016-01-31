var Promise_1 = require('dojo/Promise');
var AppModel = (function () {
    function AppModel(mongooseModel) {
        this.mongooseModel = mongooseModel;
    }
    AppModel.prototype.get = function (params) {
        return typeof params === "string" ? this._getRecordByID(params) : this._getRecordByQuery(params);
    };
    AppModel.prototype._getRecordByQuery = function (query) {
        var def = new Promise_1.Deferred();
        this.mongooseModel.findOne(query).lean().exec(function (err, doc) {
            return err ? def.reject(err) : (doc ? def.resolve(doc) : def.reject(new Error("Not found")));
        });
        return def.promise;
    };
    AppModel.prototype._getRecordByID = function (id) {
        var def = new Promise_1.Deferred();
        this.mongooseModel.findById(id).lean().exec(function (err, doc) {
            return err ? def.reject(err) : (doc ? def.resolve(doc) : def.reject(new Error("Not found")));
        });
        return def.promise;
    };
    AppModel.prototype.query = function (query, options) {
        var def = new Promise_1.Deferred();
        var queryObj = this.mongooseModel.find(query);
        queryObj = this._addQueryOptions(queryObj, options);
        queryObj = queryObj.lean();
        queryObj.exec(function (err, result) {
            err ? def.reject(err) : def.resolve(result);
        });
        return def.promise;
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
        var def = new Promise_1.Deferred();
        delete body._id;
        this.mongooseModel.findByIdAndUpdate(id, body).lean().exec(function (err, result) {
            return err ? def.reject(err) : def.resolve(result);
        });
        return def.promise;
    };
    AppModel.prototype.add = function (body) {
        var def = new Promise_1.Deferred();
        new this.mongooseModel(body).save(function (err, pool) {
            return err ? def.reject(err) : def.resolve(pool);
        });
        return def.promise;
    };
    AppModel.prototype.remove = function (ids) {
        var query = this._constructRemoveQuery(ids);
        var def = new Promise_1.Deferred();
        this.mongooseModel.remove(query).exec(function (err, result) {
            return err ? def.reject(err) : def.resolve(result);
        });
        return def.promise;
    };
    AppModel.prototype.removeUsingQuery = function (query) {
        var def = new Promise_1.Deferred();
        this.mongooseModel.remove(query).exec(function (err, result) {
            return err ? def.reject(err) : def.resolve(result);
        });
        return def.promise;
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
})();
exports.AppModel = AppModel;
//# sourceMappingURL=AppModel.js.map