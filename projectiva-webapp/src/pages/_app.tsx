import "../styles/globals.css";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import { useEffect } from "react";
import store from "@/redux/store";
import { loginSuccess } from "../redux/store/authSlice";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const user = localStorage.getItem("user");

    if (accessToken && user) {
      try {
        const parsedUser = JSON.parse(user);
        store.dispatch(
          loginSuccess({
            access_token: accessToken,
            user: parsedUser,
          })
        );
      } catch (error) {
        console.error("Erro ao analisar o usuário do localStorage:", error);
      }
    }
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
