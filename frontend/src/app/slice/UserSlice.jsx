import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  entities : '',
  token : JSON.parse(localStorage.getItem('authkey')) || '',
  loading : false
}
export const UserSlice = createSlice({
  name: 'counter',
  initialState ,
  reducers: {
    setuserlogin: (state, action) => {
      state.token = action.payload
      localStorage.setItem('authkey', JSON.stringify({token:action.payload}))
    },
    updateloading :(state, action) =>{
      state.loading = action.payload
    },
    setuserlogout :(state, action) =>{
      state.entities = ''
      state.token = ''
      state.loading = false
      localStorage.removeItem("authkey")
    }
  },

})

// Action creators are generated for each case reducer function
export const { setuserlogin , updateloading, setuserlogout} = UserSlice.actions

export default UserSlice.reducer 