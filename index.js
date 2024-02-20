import express, { json } from "express"
import admin from "firebase-admin"
import { productsRouter } from "./products/routes.js";
import cors from 'cors';
const allKey = JSON.parse(process.env.FIREBASE_ALL_KEY)
const app = express()
const port = process.env.PORT || 3000

app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(allKey),
  databaseURL: 'https://stock-store.firebaseio.com'
});

app.use(json())

app.use('/users', productsRouter)

app.listen(port)

export default app

