import { jwtDecode } from "jwt-decode";
import { UserState } from "../common";

import { BASE_URL, getMutex } from "../constants";
import { store } from "../store";
import { setUser } from "../store/slices/user-slice";
// function used to refresh token
export async function getToken() {
  const release = await getMutex().acquire(); // get the lock
  const user = store.getState().user;

  try {
    const { accessToken, refreshToken, exp, refreshTknExpTime } = user;
    if (!accessToken) throw new Error("Access token not set");
    if (!refreshTknExpTime) throw new Error("Refresh token expiry time not set");
    if (refreshTknExpTime < Date.now()) {
      // refresh token expired
      //   store.dispatch(setLogout(true));
      throw new Error("Refresh token expired");
    }
    if (!exp) throw new Error("EXP NOT SET");
    if (!refreshToken) throw new Error("REFRESH");
    // access token expires in 2 minutes
    if (exp - 2 * 60 * 1000 < Date.now()) return await refresh(refreshToken, user);

    return accessToken; // accessToken is still valid
  } catch (error) {
    console.log("error in refresh token logic", error);
    // if ("error" in (error as HttpErrorRes)) {
    //   if ((error as HttpErrorRes).error.logout) store.dispatch(setLogout(true));
    // }
    throw error; // to be handled by the caller
  } finally {
    release(); // release the lock
  }
}

async function refresh(refreshToken: string, user: UserState) {
  const body = {
    refreshToken: refreshToken,
  };
  const response = await fetch(`${BASE_URL}/refresh-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data: { accessToken: string; refreshToken: string } = await response.json();
  const decoded = jwtDecode<Omit<UserState, "refreshToken" | "refreshTknExpTime">>(data.accessToken);
  const decoded1 = jwtDecode(data.refreshToken);
  if (!decoded.exp || !decoded1.exp) throw new Error("Invalid token");

  const updatedUser: UserState = {
    ...user,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    refreshTknExpTime: decoded1.exp * 1000,
    exp: decoded.exp * 1000,
  };

  store.dispatch(setUser(updatedUser));
  return data.accessToken;
}
