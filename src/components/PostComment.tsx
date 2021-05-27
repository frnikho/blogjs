import React, {Component, useState} from "react";
import * as type from "../types/Comment";
import {Button, Grid, Paper} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import HOST_URL from "../data";
import {useCookies} from "react-cookie";

export interface CommentProps {
    onCommentDeleted: Function,
    comment: type.Comment,
    username?: string,
    user_id: string
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
        let resp = await fetch(HOST_URL + "/api/users/id/" + this.props.comment.user_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        let response = await resp.json();
        console.log(response);
        return response.data.username;
    }

    deleteComment = async () => {
        if (this.props.comment.user_id === this.props.user_id) {
            await fetch(HOST_URL + "/api/comments/delete/" + this.props.comment.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            this.props.onCommentDeleted();
        }
    }

    showDeleteCommentButton = () => {
        if (this.props.comment.user_id === this.props.user_id) {
            return (<Button variant={"outlined"} color={"default"} onClick={this.deleteComment}>X</Button>)
        }
    }

    render() {
        return (
            <div>
                <Box m={4}>
                    <Grid container alignContent={"center"} alignItems={"center"}>
                        <Grid item xs={10}>
                            <Box p={4}>
                                <Paper variant="outlined" square>
                                    <Box m={0} p={2}>
                                        <p>{this.props.comment.content}</p>
                                    </Box>
                                </Paper>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            {this.showDeleteCommentButton()}
                        </Grid>
                    </Grid>
                </Box>
            </div>
        )
    }
}

export default PostComment;