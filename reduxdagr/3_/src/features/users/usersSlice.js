import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: '0', name: 'Farrel Adria'},
    { id: '1', name: 'Farhah Dw'},
    { id: '2', name: 'Fira Fayy'}
]

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export const selectAllUsers = (state) => state.users
export default userSlice.reducer