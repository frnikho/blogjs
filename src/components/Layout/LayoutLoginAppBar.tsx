import React, {useEffect, useState} from "react";
import {User} from "../../types/User";
import {Button, Menu, MenuItem} from "@material-ui/core";
import {LoginDialog} from "../dialog/LoginDialog";
import {RegisterDialog} from "../dialog/RegisterDialog";
import {Session} from "../../types/Session";
import {useCookies} from "react-cookie";
import Hide from "../Hide";
import {useRouter} from "next/router";
import HOST_URL from "../../data";

const LayoutLoginAppBar: React.FC = ({}) => {

    const router = useRouter();

    const [cookies, setCookie, removeCookie] = useCookies(['login_session']);

    const [loginDialogIsOpen, setLoginDialog] = useState(false);
    const [registerDialogIsOpen, setRegisterDialog] = useState(false);
    const [session, setSession] = useState(cookies.login_session);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const closeLoginDialog = () => setLoginDialog(false);
    const closeRegisterDialog= () => setRegisterDialog(false);

    let cookieOptions = {
        path: '/',
        sameSite: true,
        maxAge: 3600
    };

    const logout = async () => {
        await fetch(HOST_URL + "/api/auth/session", {
            method: 'DELETE',
            credentials: "include"
        })
            .then(async (response) => response.json())
            .then(response => {
                if (response.code === 200) {
                    removeCookie('login_session', cookieOptions);
                    removeCookie('user_id', cookieOptions);
                }
                setSession("");
            }).catch((error) => {
                console.log("can't remove user session !")
            });
    }

    const setLoginCookie = (s: Session, user: User) => {
        setCookie("user_id", s.user_id, cookieOptions);
        setCookie('login_session', s.id, cookieOptions);
        setCookie("username", user.username, cookieOptions);
        setSession(s.id);
    }

    const onLogin = async (user: User) => {
        await fetch(HOST_URL + "/api/auth/session", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user_id: user.id}),
            credentials: "include"
        })
            .then(async (response) => await response.json())
            .then(response => {
                if (response.code === 200) {
                    let s: Session = (response.data as Session);
                    setLoginCookie(s, user);
                } else {
                    console.log("error while creating user session", response);
                }
            });
        closeLoginDialog();
    }

    useEffect(() => {
       setSession(cookies.login_session || "")
    });

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (event != null)
            setAnchorEl(event.currentTarget);
    };


    return (
        <div>
            <Hide hide={session === ""}>
                <div className={"logged"}>
                    <Button aria-controls="simple-menu" aria-haspopup="true" variant={"outlined"} color={"primary"} onClick={handleClick}>
                        Profile
                    </Button>
                    <Menu
                        onClose={() => setAnchorEl(null)}
                        open={Boolean(anchorEl)}
                        keepMounted={true}
                        anchorEl={anchorEl}
                    >
                        {/*<MenuItem onClick={routeToProfile}>Profile</MenuItem>*/}
                        <MenuItem onClick={async () => {
                            await router.push('/posts/create');
                        }}>Create posts</MenuItem>
                        <MenuItem onClick={logout}>Logout</MenuItem>
                    </Menu>
                </div>
            </Hide>
            <Hide hide={session !== ""}>
                <div className={"login"}>
                    <Button variant="outlined" color={"primary"} onClick={() => setLoginDialog(true)}>
                        Login
                    </Button>
                    <Button variant="outlined" color={"primary"} onClick={() => setRegisterDialog(true)}>
                        Register
                    </Button>
                    <LoginDialog isOpen={loginDialogIsOpen} handleClose={closeLoginDialog} onLogin={onLogin}/>
                    <RegisterDialog isOpen={registerDialogIsOpen} handleClose={closeRegisterDialog}/>
                </div>
            </Hide>
        </div>
    )
}

export default LayoutLoginAppBar;
