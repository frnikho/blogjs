import React, {useState} from "react";
import {User} from "../../types/User";
import {
    Button,
    Dialog, DialogActions, DialogContent,
    DialogTitle, Grid, InputAdornment,
    TextField
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import theme from "../../theme";

import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";
import {CancelOutlined, Check} from "@material-ui/icons";

interface LayoutLoginAppBarProps {
    data?: User
}

const useStyles = makeStyles({
    loginRoot: {

    },
    registerRoot: {

    },
    dialog: {

    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

export function RegisterDialog({isOpen, handleClose}) {

    const classes = useStyles();

    const [username, setUsername] = useState("");
    const [usernameIsValid, setUsernameIsValid] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleUsernameChange = (event) => setUsername(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    const ValidUsername = () => {
        return (
            <InputAdornment position="end">
                <Check/>
            </InputAdornment>
        )
    }

    const InvalidUsername = () => {
        return (
            <InputAdornment position="end">
                <CancelOutlined/>
            </InputAdornment>
        )
    }

    const submit = () => {

    }

    return (
        <Grid container spacing={1} className={classes.registerRoot}>
            <Dialog className={classes.dialog} open={isOpen} onClose={handleClose}>
                <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                <DialogTitle id="format-dialog-title">
                    Register
                </DialogTitle>
                <Box p={2}>
                    <DialogContent>
                        <TextField fullWidth={true} autoFocus={true} margin={"normal"} label={"Username"} type="text" value={username} onInput={handleUsernameChange} InputProps={{
                            endAdornment: usernameIsValid ? ValidUsername() : InvalidUsername()
                        }}/>
                        <TextField fullWidth={true} margin={"normal"} label={"Email"} type="email" value={email} onInput={handleEmailChange}/>
                        <TextField fullWidth={true} margin={"normal"} label={"Password"} type="password" value={password} onInput={handlePasswordChange}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            setPassword("");
                            setEmail("");
                            setUsername("");
                        }}>Clear</Button>
                        <Button color={"primary"} onClick={submit}>Register</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Grid>
    );
}

export function LoginDialog({isOpen, handleClose}) {

    const classes = useStyles();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const submit = () => {
        console.log(username);
        console.log(password);
    }

    return (
        <div className={classes.loginRoot}>
            <Dialog className={classes.dialog} open={isOpen} onClose={handleClose}>
                <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                <DialogTitle id="format-dialog-title">
                    Login
                </DialogTitle>
                <Box p={2}>
                    <DialogContent>
                        <TextField fullWidth={true} autoFocus={true} margin={"dense"} label={"Username"} type="email" value={username} onInput={handleUsernameChange}/>
                        <TextField fullWidth={true} margin={"dense"} label={"Password"} type="password" value={password} onInput={handlePasswordChange}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={submit}>Submit</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
}

function LayoutLoginAppBar({data}: LayoutLoginAppBarProps): JSX.Element {

    const [loginDialogIsOpen, setLoginDialog] = useState(false);
    const [registerDialogIsOpen, setRegisterDialog] = useState(false);

    const closeLoginDialog = () => setLoginDialog(false);
    const closeRegisterDialog= () => setRegisterDialog(false);

    return (
        <div>
            <Button variant="outlined" color={"primary"} onClick={() => setLoginDialog(true)}>
                Login
            </Button>
            <Button variant="outlined" color={"primary"} onClick={() => setRegisterDialog(true)}>
                Register
            </Button>
            <LoginDialog isOpen={loginDialogIsOpen} handleClose={closeLoginDialog}/>
            <RegisterDialog isOpen={registerDialogIsOpen} handleClose={closeRegisterDialog}/>
        </div>

    )
}

export default LayoutLoginAppBar;
