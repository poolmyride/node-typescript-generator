import AppModel from "./AppModel";
import * as mongoose from "mongoose"



class Bot extends AppModel{

    constructor(mongooseModel:mongoose.Model<any>){
        super(mongooseModel)
        this.mongooseModel = mongooseModel
    }

}