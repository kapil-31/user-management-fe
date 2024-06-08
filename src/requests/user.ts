import { IUSER } from "../interfaces/UserInterface"
import { api } from "./api_instance"
export type paginationType = {
    perPage?:number,
    page?:number
}
export const user = {
    getUser:(id?:string|null,pagination?:paginationType,axiosConfig?:any)=> {
      let options = axiosConfig?.signal  ? {signal:axiosConfig.signal} :{}
      return  api.get(`user` + (id ? `/${id}` : ''),{params:pagination,...options})
    },
    updateUser:(id:string,updateFields:any)=> api.put('user/'+id,updateFields),
    postUser:(payload:IUSER)=> api.post('user/',payload),
    deleteUser:(id:string) =>api.delete('user/'+id)
}