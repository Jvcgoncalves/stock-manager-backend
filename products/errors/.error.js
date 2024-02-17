export class UserNotInformedError extends Error{
  constructor(){
    super("User not informed")
    this.name= "user-not-informed"
    this.code = 500
  }
}