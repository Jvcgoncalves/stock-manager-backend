import { User } from "./model.js"

export class UserController{

  #user

  constructor(user){
    this.#user = user || new User()
  }


  findProductsByUser(request,response) {
    this.#user.userUid = request.userUid
    return this.#user.findByUser().then(user => {
      response.json(user[0].products || user.products)
    }).catch(error=>{
      response.status(error.code).json(error)
    })
  }

  findProductsById(request,response){
    this.#user.userUid = request.userUid
    return this.#user.findProductById(request.params.id).then(product => {
      if(product === "product-not-found") response.status(404).json({
        error: "product-not-found"
      })
      response.status(200).json(product[0] || product)
    }).catch(error=>{
      response.status(error.code).json(error)
    })
  }

  addNewProduct(request,response){
    this.#user.userUid = request.userUid
    this.#user.productToAdd = request.body.product
    return this.#user.addNewProduct(request.body).then(res => {
      response.status(200).json(res || this.#user)
    }).catch(e =>{
      response.status(e.code).json(e)
    })
  }

  updateProduct(request,response){
    this.#user.productToUpdate = request.params.model
    this.#user.userUid = request.userUid
    return this.#user.updateProduct(request.body).then(res => {
      response.status(200).json(res || this.#user)
    }).catch(e =>{
      response.status(e.code).json(e)
    }) 
  }
  
  deleteProduct(request,response){
    this.#user.productToUpdate = request.params
    this.#user.userUid = request.userUid
    return this.#user.deleteProduct(this.#user.productToUpdate.id).then(res => {
      response.status(200).json(res || this.#user)
    }).catch(e =>{
      response.status(e.code).json(e)
    }) 
  }
}