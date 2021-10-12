import "../styles/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ThemeProvider } from "@emotion/react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Head from "next/head";
import AppLayout from "components/AppLayout/AppLayout";

const theme = {};

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
      <main>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </main>
    </ThemeProvider>
  );
  return;
}

export default MyApp;
