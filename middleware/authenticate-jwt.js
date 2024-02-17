export async function authenticateJwt(request,response,next,auth){
  const jwt = request.headers.authorization
  if(!jwt){
    response.status(401).json({message:"User not allowed"})
    return
  } 
  
  let decoded_id_token
  try{
    decoded_id_token = await auth.verifyIdToken(jwt,true)
  } catch (error){
    response.status(401).json({message:"User not allowed"})
    return
  }

  request.userUid = decoded_id_token.sub
  next()
}