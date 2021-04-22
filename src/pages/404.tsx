import {NextPage} from "next";
import {Avatar, makeStyles} from "@material-ui/core";
import React from "react";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    root: {

    },
    background: {
        minHeight: 500,
    },
    large_image: {
        margin: 14,
    }
}));

const Custom404: NextPage = () => {

    const classes = useStyles();

    return (
        <div>
            <Box width={"100%"} height={"50%"}>

            </Box>
            <p>not found</p>
        </div>
    );
}

export default Custom404;
