import { UserController } from "../controller"

describe("User controller", () =>{
  let request;
  let response;

  beforeEach(()=>{
    request = {}
    response = new ResponseMock()
  })

  test("given find products by user, when succes, then return products", (done)=>{
    const controller = new UserController({
      findByUser: () => Promise.resolve([{userUid:"anyUserUid",products:[{id:1},{id:2}]}])
    })

    controller.findProductsByUser(request, response).then(()=>{
      expect(response._json).toEqual([{id:1},{id:2}])
      done()
    })

  })

  test("given fund products by user, when fail, then return error", (done)=>{
    const error = {code:500}

    const controller = new UserController({
      findByUser: () => Promise.reject(error)
    })

    controller.findProductsByUser(request, response).then(()=>{
      expect(response._status).toEqual(500)
      done()
    })

  })

  describe("given find products by id", () =>{
    test("given success, then return status 200",async () =>{
      const controller = new UserController({
        findProductById: () => Promise.resolve(createProduct())
      })
      
      const request = {params: {id:1}}
      const response = new ResponseMock()

      await controller.findProductsById(request,response)
      expect(response._status).toEqual(200) 
    })

    test("given success, then return product",async () =>{
      
      const controller = new UserController({userUid:"anyUserUid",products:[{id:createProduct()},{id:2}],findProductById: () => Promise.resolve(createProduct())})
      const request = {params: {id:"anyId"}}
      const response = new ResponseMock()

      await controller.findProductsById(request,response)
      expect(response._json).toEqual(createProduct())
    })

    test("when fail, then return error status",async () =>{
      
      const controller = new UserController({
        findProductById: () => Promise.reject({code: 500})
      })
      const request = {params: {id:"anyId"}}
      const response = new ResponseMock()

      await controller.findProductsById(request,response)
      expect(response._status).toEqual(500)
    })

    test("when fail, then return error status",async () =>{
      
      const controller = new UserController({
        findProductById: () => Promise.reject({code: 500})
      })
      const request = {params: {id:"anyId"}}
      const response = new ResponseMock()

      await controller.findProductsById(request,response)

      expect(response._json).toEqual({code: 500})
    })
  })

  describe("given create new product", ()=>{

    test("when success, then return status 200", async () =>{
      const controller = new UserController({
        addNewProduct: () => Promise.resolve()
      },"anyProduct")

      const request = {body:{}}
      const response = new ResponseMock()

      await controller.addNewProduct(request,response)

      expect(response._status).toEqual(200)
    })

    test("when success, then return product", async () =>{
      const product = {
        addNewProduct: () => Promise.resolve()
      }
      
      const controller = new UserController({
        addNewProduct: () => Promise.resolve(),
        
      },product)

      const request = {body:{product}}
      const response = new ResponseMock()
      await controller.addNewProduct(request,response)
      expect(response._json.productToAdd).toEqual(product)
    })

    test("then product should belong to user on request", async () =>{
      const product = {
        addNewProduct: () => Promise.resolve()
      }
      
      const controller = new UserController({
        addNewProduct: () => Promise.resolve(), 
      },product)

      const request = {body:{}, userUid:"anyUserUid"}
      const response = new ResponseMock()

      await controller.addNewProduct(request,response)

      expect(response._json.userUid).toEqual("anyUserUid")
    })

    test("when fail, then return error status", async () =>{
      const controller = new UserController({
        addNewProduct: () => Promise.reject({code:500})
      },"anyProduct")

      const request = {body:{}}
      const response = new ResponseMock()

      await controller.addNewProduct(request,response)

      expect(response._status).toEqual(500)
    })

    test("when fail, then return error status", async () =>{
      const controller = new UserController({
        addNewProduct: () => Promise.reject({code:500})
      },"anyProduct")

      const request = {body:{}}
      const response = new ResponseMock()

      await controller.addNewProduct(request,response)

      expect(response._json).toEqual({code:500})
    })
  })

  describe("given update product",()=>{

    const userUid = "anyUserUid"
    const request = {params:{userUid,model:{}}}
    let response;
    let model;
    beforeEach(() =>{
      response = new ResponseMock()
      model = {}
      request.model = model
    })

    test("when success, then return status 200",async () =>{
      const controller = new UserController({
        updateProduct: () => Promise.resolve(createProduct())
      })

      await controller.updateProduct(request,response)

      expect(response._status).toEqual(200)
    })

    test("when success, then return updated product",async () =>{
      const controller = new UserController({
        updateProduct: () => Promise.resolve(createProduct())
      })

      await controller.updateProduct(request,response)
      expect(response._json).toEqual(createProduct())
    })

    test("then product should belong to user on request",async () =>{
      const controller = new UserController({
        updateProduct: () => Promise.resolve(createProduct())
      })

      await controller.updateProduct(request,response)
      expect(response._json.userUid).toEqual(userUid)
    })

    test("when fail, then return error status",async () =>{
      const controller = new UserController({
        updateProduct: () => Promise.reject({code:500})
      })

      await controller.updateProduct(request,response)
      expect(response._status).toEqual(500)
    })

    test("when fail, then return error",async () =>{
      const controller = new UserController({
        updateProduct: () => Promise.reject({code:500})
      })

      await controller.updateProduct(request,response)
      expect(response._json).toEqual({code:500})
    })
  })

  class ResponseMock{
    _json = null
    _status = 0
    json(value){
      this._json = value
    }
    status(value){
      this._status = value
      return this
    }
  }

  const createProduct = () => {
    return {quantity: "anyQuantity",
    price: "anyPrice",
    last_update: "--/--/----",
    name: "anyName",
    description: "anyDescripition",
    register_date: "anyData",
    id: "anyId",
    category: "anyCategory",
    userUid: "anyUserUid"}
  }
})