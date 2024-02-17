import express from "express"
import admin from "firebase-admin"
import { authenticateJwt } from "../middleware/authenticate-jwt.js"
import { UserController } from "./controller.js"
import cors from 'cors';
const app = express()

const userController = new UserController()
app.use(cors());

app.get("/",
  (request,response,next) => authenticateJwt(request,response,next,admin.auth()),
  (request,response) => userController.findProductsByUser(request,response)
)

app.get("/:id",
  (request,response,next) => authenticateJwt(request,response,next,admin.auth()),
  (request,response) => userController.findProductsById(request,response)
)

app.post("/",
  (request,response,next) => authenticateJwt(request,response,next,admin.auth()),
  (request,response) => userController.addNewProduct(request,response)
)

app.put("/:id",
  (request,response,next) => authenticateJwt(request,response,next,admin.auth()),
  (request,response) => userController.updateProduct(request,response)
)

app.delete("/:id",
  (request,response,next) => authenticateJwt(request,response,next,admin.auth()),
  (request,response) => userController.deleteProduct(request,response)
)

export const productsRouter = app 