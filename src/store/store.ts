import { Action, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authApi, profileApi, aiFlowsApi, publicAiFlowApi } from "./rtk";
import { errorReducer } from "./slices/error-slice";
import { profileReducer } from "./slices/profile-slice";
import { login, userReducer } from "./slices/user-slice";
import { careerReducer } from "./slices/career-slice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = {
  user: userReducer,
  error: errorReducer,
  profile: profileReducer,
  career: careerReducer,
  [authApi.reducerPath]: authApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [aiFlowsApi.reducerPath]: aiFlowsApi.reducer,
  [publicAiFlowApi.reducerPath]: publicAiFlowApi.reducer,
};

const persistedReducer = persistCombineReducers(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false, immutableCheck: false })
      .prepend((_: any) => (next: Function) => (action: any) => logOut(action, next))
      .concat(authApi.middleware)
      .concat(profileApi.middleware)
      .concat(aiFlowsApi.middleware)
      .concat(publicAiFlowApi.middleware),
});

function logOut(action: Action, next: Function) {
  if (action.type === "CLEAR_APP") {
    console.log("purging state now...");
    // purgeStoredState(persistConfig);
    persistor.purge().then(() => {
      console.log("🚀🚀🚀 APP RESET PERFORMED");
      return next(login(false));
    });
  }
  return next(action);
}

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
