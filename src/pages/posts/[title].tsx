import {GetServerSideProps, NextPage} from "next";
import {Post} from "../../types/Post";
import ReactMarkdown from "react-markdown";
import Hero from "../../components/Hero";
import {Button, Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CommentArea from "../../components/CommentArea";
import {Comment} from "../../types/Comment";
import PostComment from "../../components/PostComment";
import React, {useState} from "react";
import {User} from "../../types/User";
import Moment from "react-moment";
import HOST_URL from "../../data";
import {useRouter} from "next/router";
import {Alert} from "@material-ui/lab";

interface PostPageProps {
    login_session?: any,
    post?: Post
    logged: boolean,
    user?: User,
    comments?: Comment[]
}

const PostPage: NextPage<PostPageProps> = ({post, login_session, logged, user, comments}: PostPageProps) => {

    const [commentsState, setCommentsState] = useState(comments);

    const [isValid, setIsValid] = useState(true);
    const [invalidMessage, setInvalidMessage] = useState("");

    const router = useRouter();

    const onPost = async (comment: Comment) => {
        await fetch(HOST_URL + "/api/comments/get/" + post.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(async response => await response.json())
            .then(response => {
                setCommentsState(response.data);
            }).catch((error) => {
               setIsValid(false);
               setInvalidMessage("Can't get comments from server !");
            });
    }

    const deletePost = async () => {
        if (post.user_id != login_session)
            return;
        await fetch(HOST_URL + "/api/posts/delete/" + post.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async response => await response.json())
            .then(async (response) => {
                if (response.code === 200) {
                    await router.push('/')
                } else if (response.code === 400) {
                    setInvalidMessage("Can't delete post !");
                    setIsValid(false);
                }
            })
            .catch(() => {
                setInvalidMessage("Can't delete post !");
                setIsValid(false);
            });

    }

    const showError = () => {
        if (!isValid) {
            return (<Alert severity="error">{invalidMessage}</Alert>);
        }
    }

    const showDeleteButton = () => {
        if (post.user_id != login_session)
            return;
        return (
            <Button variant={"outlined"} color={"default"} onClick={deletePost}>Delete post</Button>
        )
    }

    const showComment = () => {
        if (logged) {
            return <CommentArea post_id={post.id} onPost={onPost}/>
        }
    }

    const onError = () => {
        setIsValid(false);
        setInvalidMessage("Can't delete comment !");
    }

    return (
       <div>
           <Hero title={post.title}/>
           {showError()}
           <Box m={4}>
               <Grid container justify={"center"} alignContent={"center"} alignItems={"baseline"}>
                   <Grid item xs={9}>
                       <ReactMarkdown>
                           {post?.content}
                       </ReactMarkdown>
                   </Grid>
                   <Grid item xs={3}>
                       <Box marginLeft={7}>
                           {showDeleteButton()}
                           <Typography variant={"h6"}>
                               {user?.username}
                           </Typography>
                           <Typography variant={"h6"}>
                               <Moment date={post.created_date} format={"YYYY/MM/DD"}/>
                           </Typography>
                       </Box>

                   </Grid>
               </Grid>
           </Box>
           <hr/>
           <Box py={4} px={2}>
               <h2>Comments</h2>
               {showComment()}
               {commentsState?.map((comment)=> {
                   return (<PostComment key={comment.id} comment={comment} onCommentDeleted={onPost} user_id={login_session} onError={onError}/>)
               })}
           </Box>
       </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({params, res, req}) => {
    const {title} = params;

    let redirect = {
        props: {},
        redirect: {
            permanent: false,
            destination: '/404',
        },
        code: "REDIRECT"
    };

    let response = await fetch(HOST_URL + `/api/posts/findByKey/${title as string}`)
        .then((async response => await response.json()))
        .then((async response => {
            if (response.code != 200) {
                return {
                    redirect: {
                        permanent: false,
                        destination: '/404',
                    },
                    code: "REDIRECT"
                }
            }

            let resp = await fetch(HOST_URL + "/api/comments/get/" + response.data.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(async (response) => await response.json())
                .catch((error) => {
                    return redirect
                });

            if (resp.code != undefined && resp.code === "REDIRECT") {
                return resp;
            }

            let comments = resp.data;

            let logged = false;
            if (req.cookies.login_session !== undefined)
                logged = true;

            return await fetch(HOST_URL + "/api/users/id/" + response.data.user_id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(async (response) => response.json())
                .then(async (response) => {
                    return {
                        props: {
                            logged,
                            login_session: req.cookies.user_id || null,
                            post: (response.data as Post),
                            user: (response.data as User),
                            comments: comments
                        },
                        code: "PROPS"
                    }
            }).catch((error) => {
                return redirect
            });
        })).catch((error) => {
            return redirect
        });

    if (response.code == "REDIRECT") {
        return {
            redirect: response.redirect
        }
    } else if (response.code == "PROPS") {
        return {
            props: response.props,
        }
    }
}

export default PostPage;