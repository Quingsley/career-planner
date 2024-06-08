import { Mutex } from "async-mutex";
let MUTEX: Mutex | undefined;

export function getMutex() {
  if (MUTEX === undefined) {
    MUTEX = new Mutex();
  }
  return MUTEX;
}

// export const BASE_URL = "http://192.168.0.104:4000";
export const BASE_URL = "http://192.168.90.192:4000";
