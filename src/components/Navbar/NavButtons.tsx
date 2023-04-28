import { Button } from "@mui/material";
import router, { useRouter } from "next/router";
import React from "react";

type Props = {
    route: string;
    text: string;
};

const NavButtons = (props: Props) => {
    const router = useRouter();
    return (
        <Button
            onClick={() => router.push(props.route)}
            sx={{
                color: "#fff",
                // mx: 1,
                fontSize: "2.2vh",
            }}
        >
            {props.text}
        </Button>
    );
};

export default NavButtons;
