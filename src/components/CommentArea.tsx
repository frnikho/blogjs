import React, {useState} from "react";
import Box from "@material-ui/core/Box";
import {Button, CircularProgress, Grid, TextField} from "@material-ui/core";
import {Comment} from "../types/Comment";
import HOST_URL from "../data";

export interface CommentAreaProps {
    post_id: string,
    onPost: any,
}

const CommentArea: React.FC<CommentAreaProps> = ({post_id, onPost}: CommentAreaProps) => {

    const [content, setContent] = useState("");
    const [response, setResponse] = useState({});
    const [isLoading, setLoading] = useState(false);

    const submit = async () => {
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
        });

        let response = await resp.json();

        console.log(response);

        if (response.code === 200) {
            setResponse(response.data as Comment);
            setContent("");
            onPost(response.data as Comment);
        } else {
            setResponse(response);
        }
        setLoading(false);
    }

    const onContentChange = (event) => {
        setContent(event.target.value);
    }

    const showSubmit = () => {
        if (isLoading) {
            return (<CircularProgress color="secondary" />);
        } else {
            return (<Button size={"large"} fullWidth color={"primary"} variant={"contained"} onClick={submit}>Submit</Button>)
        }
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={10}>
                    <Box m={4}>
                        <TextField fullWidth variant={"outlined"} multiline rows={4} value={content} onChange={onContentChange}/>
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

        </div>
    )
}

export default CommentArea;
