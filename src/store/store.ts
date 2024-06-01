import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/user-slice";
import { errorReducer } from "./slices/error-slice";
import { authApi } from "./rtk";

const store = configureStore({
  reducer: {
    user: userReducer,
    error: errorReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export { store };
