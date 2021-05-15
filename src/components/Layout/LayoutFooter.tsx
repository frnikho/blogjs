import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {Container} from "@material-ui/core";
import Link from "@material-ui/core/Link";


const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: "#E7EEF1",
        padding: theme.spacing(1, 0),
        margin: theme.spacing(3, 0, 0, 0),
    }
}));

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                build with MaterialUI
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const LayoutFooter: React.FC = ({children}) => {

    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Container maxWidth="lg" >
                <Typography variant="h6" align="center" gutterBottom>
                    {"BlogJS"}
                </Typography>
                <Copyright />
            </Container>
        </footer>
    );
}

export default LayoutFooter;
