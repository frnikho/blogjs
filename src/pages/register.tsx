import Container from "@material-ui/core/Container";
import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";

import {Button} from "@material-ui/core";
import {Star} from "@material-ui/icons";

const Register: React.FC = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState({});

    async function submit() {
        let response = await fetch("/api/users/create", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password, email}),
        });
        let data = await response.json();
        setResponse(data);
    }

    return (
        <Container maxWidth="md">
            <form className={"register-forms"} noValidate autoComplete="off">
            <TextField
                label={"Email"}
                fullWidth={true}
                variant={"outlined"}
                onInput={(e: any) => {
                    setEmail(e.target.value);
                }}
            />
            <TextField
                label={"Username"}
                fullWidth={true}
                variant={"outlined"}
                onInput={(e: any) => {
                    setUsername(e.target.value);
                }}
                value={username}
            />
            <TextField
                label={"Password"}
                type={"password"}
                fullWidth={true}
                variant={"outlined"}
                onInput={(e: any) => {
                    setPassword(e.target.value);
                }}
                onKeyDown={async (key)=> {
                    if (key.code === 'Enter') {
                        await submit();
                    }
                }}
                value={password}
            />
            <Button
                variant={"contained"}
                color={"primary"}
                startIcon={<Star/>}
                disableElevation={true}
                onClick={async () => await submit()}>Register</Button>

            </form>
        </Container>
    );
}

export default Register;
