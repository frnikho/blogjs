import React, {useState} from "react";
import {User} from "../../types/User";
import { Button } from "@material-ui/core";
import {LoginDialog} from "../dialog/LoginDialog";
import {RegisterDialog} from "../dialog/RegisterDialog";


interface LayoutLoginAppBarProps {
    data?: User
}

function LayoutLoginAppBar({data}: LayoutLoginAppBarProps): JSX.Element {

    const [loginDialogIsOpen, setLoginDialog] = useState(false);
    const [registerDialogIsOpen, setRegisterDialog] = useState(false);

    const closeLoginDialog = () => setLoginDialog(false);
    const closeRegisterDialog= () => setRegisterDialog(false);

    const onLogin = (user: User) => {
        console.log("Hello", user.username);
    }

    const onRegister = (user: User) => {

    }

    return (
        <div>
            <Button variant="outlined" color={"primary"} onClick={() => setLoginDialog(true)}>
                Login
            </Button>
            <Button variant="outlined" color={"primary"} onClick={() => setRegisterDialog(true)}>
                Register
            </Button>
            <LoginDialog isOpen={loginDialogIsOpen} handleClose={closeLoginDialog} onLogin={onLogin}/>
            <RegisterDialog isOpen={registerDialogIsOpen} handleClose={closeRegisterDialog}/>
        </div>

    )
}

export default LayoutLoginAppBar;
