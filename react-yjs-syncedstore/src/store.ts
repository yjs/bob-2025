import { getYjsValue, syncedStore } from "@syncedstore/core";
import { WebsocketProvider } from "y-websocket";

export type Todo = {
  title: string;
  completed: boolean;
};

export const globalStore = syncedStore({ todos: [] as Todo[] });
new WebsocketProvider("wss://demos.yjs.dev/ws", 'syncedstore-todo-app', getYjsValue(globalStore) as any); // sync via webrtc
