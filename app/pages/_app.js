import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Provider, useSession, signIn } from "next-auth/client";
import Head from "next/head";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#31313D",
    },
    secondary: {
      main: "#edf2ff",
    },
  },
});

function Auth({ children }) {
  const [session, loading] = useSession();
  const router = useRouter();
  const isUser = !!session?.user;
  useEffect(() => {
    if (loading) return; // Do nothing while loading
    if (!isUser) router.replace("/auth/login"); // If not authenticated, log in
  }, [isUser, loading]);

  if (isUser) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

function MyApp({ Component, pageProps }) {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <Provider
      session={pageProps.session}
      options={{
        clientMaxAge: 60 * 60 * 24 * 7, // Re-fetch session if cache is older than 7 days
        keepAlive: 15 * 60, // Send keepAlive message every 15 minutes
      }}
    >
      <ThemeProvider theme={theme}>
        <Head>
          <title>Media browser</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <meta name="theme-color" content="#000000" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
        </Head>
        <ToastContainer />
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
