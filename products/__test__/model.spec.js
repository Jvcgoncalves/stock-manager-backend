import { UserNotInformedError } from "../errors/.error"
import { User } from "../model.js"
import getCurrentDate from "../scripts/getCurrentData.js"

describe("User model", () =>{

  const productRepositoryMock={
    findByUserUid: () => Promise.resolve([{id:1},{id:2}])
  }

  describe("given find user by uid",() =>{
    test("when user is not informed, then return error 500",async ()=>{
      const model = new User()
  
      const response = model.findByUser()
  
      await expect(response).rejects.toBeInstanceOf(UserNotInformedError)
    })
  
    test("when user uid is not informed, then return error 500",async ()=>{
      const model = new User()
      model.userUid = ""
      const response = model.findByUser()
  
      await expect(response).rejects.toBeInstanceOf(UserNotInformedError)
    })
  
    test("when user is informed, then return products",async ()=>{
      const model = new User(productRepositoryMock)
      model.userUid = "anyUserUid"
      const response = await model.findByUser()
  
      await expect(response).toEqual([{id:1},{id:2}])
    })
  })

  describe("given find product by id", () =>{

    test("then return product",async () =>{
      const model = new User({
        findProductById: () => Promise.resolve(product)
      })
      model.userUid = "anyUserUid"

      expect(await model.findProductById("anyId")).toEqual(product)
    })

    test("when id not present, then return error 500", async () => {
      const model = new User();

      await expect(model.findProductById()).rejects.toEqual({ code: 500 });
    });

    test("when product not found, then return error 404", async () => {
      const model = new User({
        findProductById: () => Promise.reject({code:404})
      });
      model.userUid = "anyUserUid"
      await expect(model.findProductById("anyId")).rejects.toEqual({ code: 404 });
    });

  })

  describe("given create new product", () =>{

    const repositoryMock = {
      _hasSaved: false,
      save(product){
        this._hasSaved =true
        return Promise.resolve({product,uid:1})
      }
    }

    test("then return new product", async ()=>{
      const model = new User(repositoryMock)

      const newProductToAdd = product
      expect(await model.addNewProduct(product)).toEqual(newProductToAdd)
    })

    test("then save new product", async ()=>{
      const model = new User(repositoryMock)

      await model.addNewProduct(product)

      expect(repositoryMock._hasSaved).toBeTruthy()
    })
  })

  describe("given update product", () =>{

    let repositoryMock

    beforeEach(() =>{
      repositoryMock ={
        _hasUpdated: false,
        findProductById: () => Promise.resolve(product),
        updateProduct() {
          this._hasUpdated = true
          return Promise.resolve()
        }
      }
    })

    test("then return updated product", async () =>{
      const model = new User(repositoryMock)
      const params = product
      model.userUid = 1

      const productToUpdate = product
      product.last_update = getCurrentDate()
      expect(await model.updateProduct(params)).toEqual(productToUpdate)
    })

    test("then update product", async () =>{
      const model = new User(repositoryMock)

      const params = product

      await model.updateProduct(params)

      expect(repositoryMock._hasUpdated).toBeTruthy()
    })

    test("given product not exist, return error 404", async () =>{
      const model = new User({
        findProductById: () => Promise.resolve(null),
        updateProduct() {
          this._hasUpdated = true
          return Promise.resolve()
        }
      })
      model.userUid = 1
      const params = product

      expect(await model.updateProduct(params)).toEqual({code: 404})
    })

    test("when product doesnt belong to user, then return error", async () =>{
      const model = new User(repositoryMock)
      model.userUid = "otherUserUid"

      expect(await model.updateProduct(product)).toEqual({code:403})
    })
  })

  const product = {
    quantity: "anyQuantity",
    price: "anyPrice",
    last_update: "--/--/----",
    name: "anyName",
    description: "anyDescripition",
    register_date: "anyData",
    id: "anyId",
    category: "anyCategory",
    userUid: "anyUserUid"
  }
})