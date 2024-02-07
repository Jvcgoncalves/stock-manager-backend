import express, { response } from "express"
import admin from "firebase-admin"

const app = express()

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.get('/users', (request,response) =>{
  console.log("get users")
  response.json([{id:1}])
})

app.listen(3000,() => console.log("api foi iniciada http://localhost:3000"))