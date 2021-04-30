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
import {useState} from "react";

interface PostPageProps {
    post?: Post
    logged: boolean,
    comments?: Comment[]
}

const PostPage: NextPage<PostPageProps> = ({post, logged, comments}: PostPageProps) => {

    const [commentsState, setCommentsState] = useState(comments);

    const onPost = async (comment: Comment) => {
        console.log('ON POST', comment);

        let resp = await fetch("/api/comments/all", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        let response = await resp.json();
        setCommentsState(response.data);
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
               <Grid container justify={"center"}>
                   <Grid item xs={8}>
                       <ReactMarkdown>
                           {post?.content}
                       </ReactMarkdown>
                   </Grid>
                   <Grid container item xs={2} justify={"center"}>
                       <Box margin={14}>
                           <Typography>
                               User
                           </Typography>
                       </Box>
                       <Box>
                           <Typography>
                               date
                           </Typography>
                       </Box>
                   </Grid>
               </Grid>
           </Box>
           <hr/>
           <Box py={4} px={2}>
               <h2>Comments</h2>
               {showComment()}
               {commentsState?.map((comment) => {
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
    return {
        props: {
            logged,
            post: (response.data as Post),
            comments: comments
        }
    }

}

export default PostPage;
