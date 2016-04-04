
import  * as Promise from 'bluebird'
import * as mongoose from "mongoose"

 class AppModel{
    mongooseModel:mongoose.Model<any>;
    constructor(mongooseModel?:mongoose.Model<any>){
        this.mongooseModel = mongooseModel
    }

    get(params:any):Promise<any>{
        return typeof params === "string" ? this._getRecordByID(params as string) : this._getRecordByQuery(params);
    }
    private _getRecordByQuery(query:any):Promise<any>{
        return new Promise((resolve,reject)=>{

            this.mongooseModel.findOne(query).lean().exec((err,doc)=>{

                return err ? reject(err) : (doc ? resolve(doc):reject(new Error("Not found")))
            })
        })

    }

    private _getRecordByID(id:string):Promise<any>{
        return new Promise((resolve,reject)=>{
            this.mongooseModel.findById(id).lean().exec((err,doc)=>{
                return err ? reject(err) : (doc ? resolve(doc):reject(new Error("Not found")))
            })
        })

    }

    query(query:any,options:any):Promise<any>{

        return new Promise((resolve,reject)=>{
            var queryObj = this.mongooseModel.find(query)
            queryObj = this._addQueryOptions(queryObj,options)
            queryObj = queryObj.lean()
            queryObj.exec((err,result)=>{
                err ? reject(err) : resolve(result)
            })
        })

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

        delete body._id

        return new Promise((resolve,reject)=>{
            this.mongooseModel.findByIdAndUpdate( id, body).lean().exec((err, result)=>{
                return err ? reject(err) : resolve(result);
            });
        })

    }
    add(body:any):Promise<any>{

        return new Promise((resolve,reject)=>{
            new this.mongooseModel(body).save( (err, pool) => {
                return err ? reject(err) : resolve(pool);
            });
        })

    }
    remove(ids:any):Promise<any>{
        var query = this._constructRemoveQuery(ids);

        return new Promise((resolve,reject)=> {
            this.mongooseModel.remove(query).exec((err, result)=> {
                return err ? reject(err) : resolve(result);
            })
        })
    }
    removeUsingQuery(query:any):Promise<any>{

        return new Promise((resolve,reject)=>{
            this.mongooseModel.remove(query).exec((err, result)=> {
                return err?reject(err):resolve(result);
            });
        })
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

export default AppModel