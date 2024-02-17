import { authenticateJwt } from "../authenticate-jwt.js";

describe("Authenticate jwt", () => {
  test("given no authorization header, then return error 401", () =>{
    const request = {
      headers:{}
    }
    const response =  new ResponseMock()
    const next = () => {}

    authenticateJwt(request,response,next);

    expect(response._status).toEqual(401)
  })

  test("given authorization header,when invalid, then return error 401",async () =>{
    const request = {
      headers:{authorization:"invalid"}
    }
    const response =  new ResponseMock()
    const next = () => {}

    await authenticateJwt(request,response,next, {
      verifyIdToken: () => Promise.reject()
    });

    expect(response._status).toEqual(401)
  })

  test("given authorization header,when valid, then add user to request",async () =>{
    const request = {
      headers:{authorization:"valid"}
    }
    const response =  new ResponseMock()
    const next = () => {}

    await authenticateJwt(request,response,next,{verifyIdToken: () => ({sub:"anyUserUid"})});

    expect(request.userUid).toEqual("anyUserUid")
  })
  class ResponseMock{
    _json = null
    _status = 0
    json(value){
      this._json = value
    }
    status(value){
      this._status = value
      return this
    }
  }
})