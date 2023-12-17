import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html
            lang="en"
            style={{ minHeight: "100vh" }}
        >
            <Head>
                <link
                    rel="preconnect"
                    href="https://fonts.googleapis.com"
                />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Oswald&family=Sigmar&family=Ubuntu&family=Poppins&family=Lato&family=Inter&family=Kanit&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body style={{ minHeight: "100vh" }}>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
