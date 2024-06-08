import { Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import UserAddEditPage from "./pages/UserAddEditPage";
import UserListingPage from "./pages/UserListingPage";

export const routes  = [
    {
      path:'/',
     
      element:<MainLayout/>,
      children:[
        {
        path:'/users',
        element:<UserListingPage/>
      }
      ,
      {
        path:'/add',
        element:<UserAddEditPage  />
      },
      {
        path:'/edit/:id',
        element:<UserAddEditPage  />
      },
      {
        path:'/',
        element:<Navigate to="users" replace/>
      }
    ],
    }
  ]