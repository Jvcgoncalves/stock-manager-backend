import express, { json } from "express"
import admin from "firebase-admin"
import { productsRouter } from "./products/routes.js";

const app = express()
const port = process.env.PORT || 3000

admin.initializeApp({
  credential: admin.credential.cert("./serviceAccoutKey.json")
});

app.use(json())

app.use('/users', productsRouter)

app.listen(port,() => console.log(`api foi iniciada ${port}`))