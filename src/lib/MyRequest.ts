import * as nodeRequest from "request"
import * as Promise from "bluebird"
import {hostname} from "os";
import * as url from "url"
import * as querystring from "querystring"

export function request(urlStr:string,options?:any):Promise<any>{
    options = options || {}
    options.qs = options.query
    options.json = options.handleAs === 'json'

    var prom = new Promise((resolve,reject)=>{

        nodeRequest(urlStr,options,(error,response,body)=>{
            (response as any).data = body
            error ? reject(error) : resolve(response)
        })
    })

    return prom



}
