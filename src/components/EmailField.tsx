import React, {useState} from "react";
import {TextField} from "@material-ui/core";
import Box from "@material-ui/core/Box";

interface EmailFieldProps {
    content?: string;
    valid?: boolean;
}

const standardId: string = "standard-basic";
const errorId: string = "outline-error-helper-text";

const EmailField: React.FC<EmailFieldProps> = ({content, valid}) => {

    const [email, setEmail] = useState(content);
    const [isEmailValid, setEmailValid] = useState(valid);

    const handleInput = (event) => {
        setEmail(event.target.value);
    }

    const handleChange = (event) => {
        let isValid: boolean = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
        setEmailValid(isValid);
    }

    return (
            <TextField
                error={!isEmailValid}
                id={isEmailValid === true ? standardId : errorId}
                label="Email"
                helperText={!isEmailValid ? "Invalid email address !" : ""}
                value={email}
                fullWidth={true}
                onChange={handleChange}
                onInput={handleInput}
                onBlur={handleChange}
                variant="outlined"
            />
    )
}

EmailField.defaultProps = {
    content: "",
    valid: false,
}

export default EmailField;
