import { message } from "antd"
import { request } from "../../requests"
import { removeUser, setUser } from "../slices/userSlice"
import store, { AppDispatch } from "../store"
// we can dispatch action with store object's dispatch
export const deleteUserCall =  (_id:string)=>{
    request.deleteUser(_id).then((response)=>{
        store.dispatch(removeUser({_id:_id}))
        message.success(response.data.message)
      }).catch(err=>console.error('er'))
}


export const  fetchUser  = (userId: string,axioConfig?:any) =>(dispatch:AppDispatch) =>{
    request
      .getUser(userId,undefined,axioConfig)
      .then((response) => {
        const user = response.data.data;

        const {password,...rest} = user
        // removing password from user
        dispatch(setUser(rest))
      })
      .catch((error) => {
        message.error("User Not Found")
        window.location.href='/users'
        // console.log("Error in Fetching User", error);
      });
  }



  