import { ProductRepository } from "./productsRepository.js";
import { UserNotInformedError } from "./errors/.error.js";

export class User {
  userUid;
  productToAdd
  productToUpdate
  #repository

  constructor(repository){
    this.#repository = repository || new ProductRepository()
  }

  async findByUser(){
    if(!this.userUid){
      return Promise.reject(new UserNotInformedError())
    }
    return await this.#repository.findByUserUid(this.userUid)
  }

  async findProductById(id){
    if(!id || !this.userUid){
      return Promise.reject({code:500})
    }
    return await this.#repository.findProductById(this.userUid,id) ?? new Response("product not found", {code:404})
  }

  addNewProduct(params){
    const productToAdd = params
    
    return this.#repository.save(productToAdd,this.userUid).then(res =>{
      const product = res.product || res.product
      product.userUid = res.userUid || res.uid
      return product
    })
  }

  updateProduct(params){
    const productToUpdate = params
    return this.#repository.updateProduct(productToUpdate,productToUpdate.userUid).then(async res =>{
      if(productToUpdate.userUid !== this.userUid) return {code: 403}
      const mainProduct = await this.#repository.findProductById(productToUpdate.userUid,productToUpdate.id)
      if(!mainProduct) return {code:404}
      return productToUpdate
    })
  }
  //productToDeleteId,userUid
  deleteProduct(params){
    const productToDeleteId = params
    return this.#repository.deleteProduct(productToDeleteId,this.userUid).then(async res =>{
      return res
    })
  }
}