import admin from "firebase-admin"
import getCurrentDate from "./scripts/getCurrentData.js"

export class ProductRepository{

  async findByUserUid(uid){
    return await admin.firestore()
        .collection('users')
        .where("userUid","==", uid)
        .get()
        .then(snapshot => {
          return snapshot.docs.map(doc =>{
            return {
              ...doc.data(),
              uid:doc.id
            }
          })
        })
  }

  async findProductById(uid,id){
    return await admin.firestore()
        .collection('users')
        .where("userUid","==", uid)
        .get()
        .then(snapshot => {
          return snapshot.docs.map(doc =>{
            return doc.data().products.find(product => product.id === id ) ?? "product-not-found"
          })
        })
  }

  async save(product,userUid){
    return await admin.firestore()
    .collection('users')
    .doc(userUid)
    .update({
      products: admin.firestore.FieldValue.arrayUnion(product)
    }).then(() =>{
      return {product,userUid}
    })
  }

  async updateProduct(productToUpdate,userUid){
    const userData = await this.findByUserUid(userUid)
    const allProducts = userData[0]?.products
    return await admin.firestore()
    .collection('users')
    .doc(userUid)
    .update({
      products: allProducts.flatMap(product=>{
        if(product.id === productToUpdate.id) return { ...productToUpdate,last_update: getCurrentDate()}
        else return product
      })  
    })
    .then( () => {
      return productToUpdate
    })
  }

  async deleteProduct(productToDeleteId,userUid){
    const userData = await this.findByUserUid(userUid)
    const allProducts = userData[0]?.products
    return await admin.firestore()
    .collection('users')
    .doc(userUid)
    .update({
      products: allProducts.filter(product => product.id !== productToDeleteId)
    })
    .then( () => {
      return productToDeleteId
    })
  }
}