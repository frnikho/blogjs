import React, {Component, useState} from "react";
import * as type from "../types/Comment";
import {Grid, Paper} from "@material-ui/core";
import Box from "@material-ui/core/Box";

export interface CommentProps {
    comment: type.Comment,
    username?: string
}

class PostComment extends Component<CommentProps> {

    constructor(props) {
        super(props);
        this.state = {
            username: ""
        }
        this.getUsername().then((username) => {
            this.state = {
                username: username
            }
        });
    }

    getUsername = async () => {
        let resp = await fetch("http://localhost:3000/api/users/id/" + this.props.comment.user_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        let response = await resp.json();
        console.log(response);
        return response.data.username;
    }

    render() {
        return (
            <div>
                <Box m={4}>
                    <Paper variant="outlined" square>
                        <Grid container>
                            <Grid item xs={2}>
                                <p>{this.state.username || ""}</p>
                            </Grid>
                            <Grid item xs={10}>
                                <p>{this.props.comment.content}</p>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </div>
        )
    }
}


export default PostComment;