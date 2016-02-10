import AppModel from '../../src/models/AppModel'
describe("AppModel",()=>{
    var model:AppModel
    beforeEach(()=>{
        model = new AppModel()
    })

    describe("#test",()=>{
        it('should support query method',()=>{
            if(typeof model.query !== 'function'){
                throw new Error('Query method not present')
            }
        })
    })
})