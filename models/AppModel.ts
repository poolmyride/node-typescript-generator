
import  {Deferred} from 'dojo/Promise'
import * as mongoose from "mongoose"

export class AppModel{
    mongooseModel:mongoose.Model<any>;
    constructor(mongooseModel:mongoose.Model<any>){
        this.mongooseModel = mongooseModel
    }

    get(params:any):Promise<any>{
        return typeof params === "string" ? this._getRecordByID(params as string) : this._getRecordByQuery(params);
    }
    private _getRecordByQuery(query:any):Promise<any>{
        var def = new Deferred()
        this.mongooseModel.findOne(query).lean().exec((err,doc)=>{

            return err ? def.reject(err) : (doc ? def.resolve(doc):def.reject(new Error("Not found")))
        })
        return def.promise
    }

    private _getRecordByID(id:string):Promise<any>{
        var def = new Deferred()
        this.mongooseModel.findById(id).lean().exec((err,doc)=>{
            return err ? def.reject(err) : (doc ? def.resolve(doc):def.reject(new Error("Not found")))
        })
        return def.promise
    }

    query(query:any,options:any):Promise<any>{

        var def = new Deferred()
        var queryObj = this.mongooseModel.find(query)
        queryObj = this._addQueryOptions(queryObj,options)
        queryObj = queryObj.lean()
        queryObj.exec((err,result)=>{
             err ? def.reject(err) : def.resolve(result)
        })
        return def.promise
    }

    _addQueryOptions(queryObj:any,options:any):any{
        options = options || {}
        if (options.sort && typeof options.sort === "object"){
            queryObj = queryObj.sort(options.sort)
        }
     
        if (options.populate instanceof Array) {
            options.populate.forEach(  (item) => {
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
    }
    put(id:string,body:any):Promise<any>{
        var def =  new Deferred()
        delete body._id
        this.mongooseModel.findByIdAndUpdate( id, body).lean().exec((err, result)=>{
            return err ? def.reject(err) : def.resolve(result);
        });
        return def.promise;
    }
    add(body:any):Promise<any>{
        var def =  new Deferred();
        new this.mongooseModel(body).save( (err, pool) => {
            return err ? def.reject(err) : def.resolve(pool);
        });
        return def.promise;
    }
    remove(ids:any):Promise<any>{
        var query = this._constructRemoveQuery(ids);
        var def = new Deferred();

        this.mongooseModel.remove(query).exec((err, result)=> {
            return err?def.reject(err):def.resolve(result);
        });
        return def.promise;
    }
    removeUsingQuery(query:any):Promise<any>{
        var def =  new Deferred();

        this.mongooseModel.remove(query).exec((err, result)=> {
            return err?def.reject(err):def.resolve(result);
        });
        return def.promise;
    }

    _constructRemoveQuery(ids:any):any{
        var query = ids || {};

        if (ids instanceof Array) {
            query = {
                '_id': {$in: ids}
            };
        } else if (typeof query === "string") {
            query = {
                '_id': ids
            }
        } else if (typeof ids === "object") {
            query = ids;
        }
        return query;
    }

}

