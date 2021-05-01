import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LayoutLoginAppBar from "./LayoutLoginAppBar";
import {useRouter} from "next/router";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const LayoutAppBar: React.FC = () => {

    const router = useRouter();

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" color={"transparent"} elevation={0}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}
                        onClick={async () => {
                            await router.push('/');
                        }}>BlogJS
                    </Typography>
                        <LayoutLoginAppBar/>
                </Toolbar>
            </AppBar>
        </div>
    );
}


export default LayoutAppBar;
