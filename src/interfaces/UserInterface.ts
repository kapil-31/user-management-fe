
export interface IUSER {
    name: string;
    email: string;
    password: string;
}
export interface ID{
    _id: string;
}
export interface UserEditPageProps {
    userId?: string;
    className?:string
    user?:IUSER & ID
    fetchUser: (id:string,axiosConfig?:any) => void;
    emptyUser:()=>void;
  }
 
 export interface UserEditPageState {
    user: IUSER & ID;
    
  }