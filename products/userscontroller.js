import { User } from "./model.js"

export class UserController{

  #user

  constructor(user){
    this.#user = user || new User()
  }


  findProductsByUser(request,response) {
    this.#user.userUid = request.userUid
    return this.#user.findByUser().then(user => {
      console.log(`user usercontroller ${user}`);
      if (Array.isArray(user) && user.length > 0) {
        response.json(user[0].products || user.products);
      } else {
        response.status(404).json({ message: "No products found for this user" });
      }
    }).catch(error=>{
      console.log(`user controller error find products by user ${error}`);
      response.status(error).json({message:`error ${error}, userUid ${this.#user.userUid}, request ${request}`})
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
      response.status(error.code).json({message:`error ${error}, user ${request.userUid}`})
    })
  }

  addNewProduct(request,response){
    this.#user.userUid = request.userUid
    this.#user.productToAdd = request.body.product
    return this.#user.addNewProduct(request.body).then(res => {
      response.status(200).json(res || this.#user)
    }).catch(error=>{
      response.status(error.code).json({message:`error ${error}, user ${request.userUid}`})
    })
  }

  updateProduct(request,response){
    this.#user.productToUpdate = request.params.model
    this.#user.userUid = request.userUid
    return this.#user.updateProduct(request.body).then(res => {
      response.status(200).json(res || this.#user)
    }).catch(error=>{
      response.status(error.code).json({message:`error ${error}, user ${request.userUid}`})
    })
  }
  
  deleteProduct(request,response){
    this.#user.productToUpdate = request.params
    this.#user.userUid = request.userUid
    return this.#user.deleteProduct(this.#user.productToUpdate.id).then(res => {
      response.status(200).json(res || this.#user)
    }).catch(error=>{
      response.status(error.code).json({message:`error ${error}, user ${request.userUid}`})
    }) 
  }
}