import React, {useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    InputAdornment,
    TextField
} from "@material-ui/core";
import {CancelOutlined, Check} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../theme";
import Box from "@material-ui/core/Box";
import {checkEmailIsValid, checkPasswordIsValid, checkUsernameSyntax} from "../../helpers/user";
import {Alert} from "@material-ui/lab";
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

export function RegisterDialog({isOpen, handleClose}) {

    const classes = useStyles();

    const [username, setUsername] = useState("");
    const [usernameIsValid, setUsernameIsValid] = useState(false);

    const [password, setPassword] = useState("");
    const [passwordIsValid, setPasswordIsValid] = useState(false);

    const [email, setEmail] = useState("");
    const [emailIsValid, setEmailIsValid] = useState(false);

    const [response, setResponse] = useState(null);

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

    const showResult = () => {
        if (response === null)
            return;
        if (response.code === 200) {
            return (<Alert severity="success">User '{username}' created ! login you now </Alert>)
        }
        if (response.code === 400) {
            return (
                <Alert severity="error">Can't create user !</Alert>
            )
        }
    }

    const checkUsername = async () => {
        setUsernameIsValid(checkUsernameSyntax(username));
    }

    const checkPassword = () => {
        setPasswordIsValid(checkPasswordIsValid(password));
    }

    const checkEmail = () => {
        setEmailIsValid(checkEmailIsValid(email));
    }

    const submit = async () => {
        if (!(usernameIsValid && emailIsValid && passwordIsValid))
            return;

        let resp = await fetch(HOST_URL + "/api/users/create", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password, email}),
        });
        let data = await resp.json();
        setResponse(data);
        console.log(data);
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
                        <TextField
                            error={!usernameIsValid}
                            fullWidth={true} autoFocus={true} margin={"normal"} label={"Username"} type="text" value={username} onInput={handleUsernameChange} InputProps={{
                            endAdornment: usernameIsValid ? ValidUsername() : InvalidUsername()
                        }} onChange={checkUsername} onBlur={checkUsername}/>
                        <TextField
                            error={!emailIsValid}
                            fullWidth={true} margin={"normal"} label={"Email"} type="email" value={email} onInput={handleEmailChange} onChange={checkEmail} onBlur={checkPassword}/>
                        <TextField
                            error={!passwordIsValid}
                            fullWidth={true} margin={"normal"} label={"Password"} type="password" value={password} onInput={handlePasswordChange} onChange={checkPassword} onBlur={checkPassword}/>
                    </DialogContent>
                    {showResult()}
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
