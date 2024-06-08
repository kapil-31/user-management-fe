import {  useParams } from "react-router-dom"
import  UserEditAddComponent  from "../components/UserEditAddComponent"

const UserAddEditPage = ()=>{
    const {id}  = useParams()

    return <div className="container mx-auto p-4">
        <h2 className="text-xl mb-4 font-semibold">{id ? "Edit User" : "Add User"}</h2>
        <UserEditAddComponent className = "grid grid-cols-4 m-auto" userId={id} />
    </div>
}

export default UserAddEditPage