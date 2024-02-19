import { getAuth } from "firebase-admin/auth";

export async function authenticateJwt(request,response,next,auth){
  const jwt = await request.headers.authorization

  if(!jwt){
    response.status(401).json({message:`User not allowed`})
    return
  } 
  
  let decoded_id_token
  
  try{
    decoded_id_token = await getAuth()._verifyAuthBlockingToken(jwt,"stock-store-1b54d")
    .then((decodedToken) => {
      return decodedToken;
    })
    .catch((error) => {
      response.status(error.code).json({message:error.message})
    });
  } catch (error){
    response.status(401).json({message:`User not allowed`,})
    return
  }
  
  request.userUid = decoded_id_token.uid
  next()
}