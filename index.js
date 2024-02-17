import express, { json } from "express"
import admin from "firebase-admin"
import { productsRouter } from "./products/routes.js";

const app = express()

admin.initializeApp({
  credential: admin.credential.cert("./serviceAccoutKey.json")
});

app.use(json())

app.use('/users', productsRouter)

app.listen(3000,() => console.log("api foi iniciada http://localhost:3000"))