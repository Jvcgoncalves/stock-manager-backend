import express, { json } from "express"
import admin from "firebase-admin"
import { productsRouter } from "./products/routes.js";
import cors from 'cors';

const app = express()
const port = process.env.PORT || 3000
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert("./serviceAccoutKey.json")
});

app.use(json())

app.use('/users', productsRouter)

app.listen(port,() => console.log(`api foi iniciada ${port}`))