import React, {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../theme";
import {Alert} from "@material-ui/lab";
import {instanceOfUser} from "../../types/User";
import HOST_URL from "../../data";

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

export function LoginDialog({isOpen, handleClose, onLogin}) {

    const classes = useStyles();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [result, setResult] = useState(null);

    const [isValid, setIsValid] = useState(true);
    const [invalidMessage, setInvalidMessage] = useState("");

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const showResult = () => {
        if (result === null)
            return;

        if (result.code === 200) {
            return (<Alert severity="success">User '{username}' logged !</Alert>)
        }
        if (result.code === 400 || result === "") {
            return (<Alert severity="error">Bad username or password !</Alert>)
        }
    }

    const submit = async () => {

        await fetch(HOST_URL + "/api/auth/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password}),
        }).then(async (result) => result.json())
            .then((response) => {
                setResult(response);
                if (response !== null && instanceOfUser(response.data))
                    onLogin(response.data);
            }).catch((err) => {
                setResult("");
            });
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
                        <TextField fullWidth={true} margin={"dense"} label={"Password"} type="password" value={password} onInput={handlePasswordChange} onKeyPress={async (key) => {
                        if (key.code === 'Enter')
                            await submit();
                        }
                        }/>
                    </DialogContent>
                    {showResult()}
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={submit}>Submit</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
}
