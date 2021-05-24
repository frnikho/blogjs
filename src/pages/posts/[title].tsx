import {GetServerSideProps, NextPage} from "next";
import {Post} from "../../types/Post";
import ReactMarkdown from "react-markdown";
import Hero from "../../components/Hero";
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CommentArea from "../../components/CommentArea";
import {Comment} from "../../types/Comment";
import PostComment from "../../components/PostComment";
import React, {useState} from "react";
import {User} from "../../types/User";
import Moment from "react-moment";

interface PostPageProps {
    post?: Post
    logged: boolean,
    user?: User,
    comments?: Comment[]
}

const PostPage: NextPage<PostPageProps> = ({post, logged, user, comments}: PostPageProps) => {

    const [commentsState, setCommentsState] = useState(comments);

    const onPost = async (comment: Comment) => {

        let resp = await fetch(process.env.URL + "/api/comments/all", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        let response = await resp.json();
        setCommentsState(response.data);
    }

    const getUsername = async (user_id: string) => {
        let resp = await fetch(process.env.URL + "/api/users/id/" + user_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        let response = await resp.json();

        if (response.code === 200)
            return response.data;
        return null;
    }

    const showComment = () => {
        if (logged) {
            return <CommentArea post_id={post.id} onPost={onPost}/>
        }
    }

    return (
       <div>
           <Hero title={post?.title}/>
           <Box m={4}>
               <Grid container justify={"center"} alignContent={"center"} alignItems={"baseline"}>
                   <Grid item xs={9}>
                       <ReactMarkdown>
                           {post?.content}
                       </ReactMarkdown>
                   </Grid>
                   <Grid item xs={3}>
                       <Box marginLeft={7}>
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
                   return (<PostComment key={comment.id} comment={comment}/>)
               })}
           </Box>
       </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({params, res, req}) => {
    const {title} = params;
    let response = await (await fetch(`${process.env.URL}/api/posts/findByKey/${title as string}`)).json();
    if (response.code != 200) {
        return {
            redirect: {
                permanent: false,
                destination: '/404',
            },
            props: {}
        }
    }

    let resp = await fetch(process.env.URL + "/api/comments/all", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    let responseComment = await resp.json();
    let comments = responseComment.data;

    let logged = false;
    if (req.cookies.login_session !== undefined)
        logged = true;


    let userResponse = await fetch(process.env.URL + "/api/users/id/" + response.data.user_id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let user;
    if (userResponse !== undefined)
        user = await userResponse.json();
    return {
        props: {
            logged,
            post: (response.data as Post),
            user: (user.data as User),
            comments: comments
        }
    }

}

export default PostPage;
