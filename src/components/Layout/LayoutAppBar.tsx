import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
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

const LayoutAppBar: React.FC = ({children}) => {

    const router = useRouter();

    const classes = useStyles();

    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color={"transparent"} elevation={0}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}
                        onClick={async () => {
                            await router.push('/');
                        }}>BlogJS
                    </Typography>
                    {auth && (
                        <LayoutLoginAppBar/>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}


export default LayoutAppBar;
