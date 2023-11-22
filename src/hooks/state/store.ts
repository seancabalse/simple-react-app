/**
 * @author seancabalse
 * @email seancabalse.dev@gmail.com
 * @create date 2023-11-22 08:22:56
 * @modify date 2023-11-22 08:22:56
 * @desc This file houses the redux store configuration for the
 * application
 */
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@hooks/state/users/usersSlice";


export const store = configureStore({
  reducer: {
    user: userReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;