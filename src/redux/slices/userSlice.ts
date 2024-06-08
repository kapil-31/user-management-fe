import { createSlice,PayloadAction,createAsyncThunk } from "@reduxjs/toolkit";
import { ID, IUSER } from "../../interfaces/UserInterface";
import { request } from "../../requests";
import { paginationType } from "../../requests/user";


interface IUserState{
    users:IUSER[],
    user:IUSER &ID,
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    total:number;
}

const initialState:IUserState = {
    users:[],
    user: { _id: '', name: '', email: '', password: '' },
    status: 'idle',
    error: null,
    total:0
}

interface IFetchUser {
    data:IUSER[],
    pagination:{
        total:number,page:number,pageSize:number
    }
}
export const fetchUsers = createAsyncThunk<IFetchUser,paginationType>('users/fetchUsers',async({page,perPage})=>{
    const response = await request.getUser(null,{page,perPage})
    return response.data as IFetchUser

})

const userSlice = createSlice({
    name:'users',
    initialState,
    reducers:{
        setUser(state, action: PayloadAction<IUSER&ID>) {
            state.user = action.payload;
          },
        removeUser:(state,action:PayloadAction<{_id:string}>)=>{
            state.users = state.users.filter((user:any)=>user._id !==action.payload._id)
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUsers.pending,(state)=>{
            state.status="loading"
        })
        .addCase(fetchUsers.fulfilled,(state,action)=>{
            state.users = action.payload.data
            state.total = action.payload.pagination.total
            state.status = "succeeded"
        })
        .addCase(fetchUsers.rejected,(state,action)=>{
            state.status = 'failed';
            state.error = action.error.message ?? 'Failed to fetch posts';
        })
    },


})

export const {removeUser,setUser} = userSlice.actions

export default userSlice.reducer