import "@component/styles/globals.css";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#2C3639",
            },
            secondary: {
                main: "#222",
            },
            text: {
                primary: "#ffffff",
            },
            background: {
                default: "rgb(17, 17, 19)", // sets the
            },
        },
        typography: {
            fontFamily: "Kanit",
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
