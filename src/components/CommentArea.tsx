import React, {useState} from "react";
import Box from "@material-ui/core/Box";
import {Button, CircularProgress, Grid, TextField} from "@material-ui/core";
import {Comment} from "../types/Comment";
import HOST_URL from "../data";
import {Alert} from "@material-ui/lab";

export interface CommentAreaProps {
    post_id: string,
    onPost: any,
}

const CommentArea: React.FC<CommentAreaProps> = ({post_id, onPost}: CommentAreaProps) => {

    const [content, setContent] = useState("");
    const [response, setResponse] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [invalidMessage, setInvalidMessage] = useState("");

    const onAreaChanged = async () => {

    }

    const submit = async () => {
        if (content.length > 200) {
            setIsValid(false);
            setInvalidMessage("Too long comment ! (> 255)");
            return;
        } else if (content.length < 5) {
            setIsValid(false);
            setInvalidMessage("Too short comment ! (< 5)");
            return;
        }

        setLoading(true);
        let resp = await fetch(HOST_URL + "/api/comments/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({
                content: content,
                post_id: post_id,
            }),
        })
            .then(async response => await response.json())
            .then(async response => {
                setIsValid(true);
                if (response.code === 200) {
                    setResponse(response.data as Comment);
                    setContent("");
                    onPost(response.data as Comment);
                } else {
                    setResponse(response);
                }
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                setInvalidMessage("Can't create comment !");
                setIsValid(false);
                return error;
            });
    }

    const onContentChange = (event) => {
        if (event.target.value.length > 255) {
            setIsValid(false);
            setInvalidMessage("Too long comment (> 255)");
            return;
        }
        setContent(event.target.value);
        setIsValid(true);
    }

    const showSubmit = () => {
        if (isLoading) {
            return (<CircularProgress color="secondary" />);
        } else {
            return (<Button size={"large"} fullWidth color={"primary"} variant={"contained"} onClick={submit}>Submit</Button>)
        }
    }

    const showError = () => {
        if (!isValid) {
            return (<Alert severity="error">{invalidMessage}</Alert>);
        }
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={10}>
                    <Box m={4}>
                        <TextField fullWidth variant={"outlined"} multiline rows={4} rowsMax={4} aria-valuemax={210} value={content} onChange={onContentChange}/>
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <Box m={4}>
                        <Grid container spacing={2}>
                            <Grid item>
                                {showSubmit()}
                            </Grid>
                            <Grid item>
                                <Button size={"large"} fullWidth color={"default"} variant={"outlined"} onClick={() => setContent("")}>Clear</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            {showError()}
        </div>
    )
}

export default CommentArea;
