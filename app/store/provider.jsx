"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { setupAxios } from "../lib/axios";

setupAxios({
  getToken: () => store.getState().auth.accessToken,
  reduxDispatch: store.dispatch,
});

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}