/**
 * @author seancabalse
 * @email seancabalse.dev@gmail.com
 * @create date 2023-11-22 08:10:46
 * @modify date 2023-11-22 08:10:46
 * @desc This file houses the reducer logic and actions for the users
 * state
 */
import { initialUsers } from "@data/users";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"


interface User {
  id: number
  branchId: number;
  userName: string;
  password: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  position: string;
}

const initialUsersState : User[] = initialUsers;

const userSlice = createSlice({
  name: "users",
  initialState : initialUsersState,
  reducers: {
    // Reducer function to add new user to the users state synchronously
    addUser: (state, { payload } : PayloadAction<User>) => {
      state.push(payload)
    },
    // Reducer function to delete user from the users state synchronously
    deleteUser: (state, { payload } : PayloadAction<number>) => {
      return state.filter(({ id }) => id !== payload)
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(addUserAsync.fulfilled, (state, action : PayloadAction<User>) => {
        state.push(action.payload)
      })
    .addCase(deleteUserAsync.fulfilled, (state, action : PayloadAction<number>) => {
        return state.filter(({ id }) => id!== action.payload)
      })
  }
})

export const addUserAsync = createAsyncThunk(
  "users/addUserAsync",
  async (user: User) => {
    await  new Promise((resolve) => setTimeout(resolve, 1000));
    return user;
  }
)

export const deleteUserAsync = createAsyncThunk(
  "users/deleteUserAsync",
  async (id: number) => {
    await  new Promise((resolve) => setTimeout(resolve, 1000));
    return id;
  }
)

export const { addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;