import {GetServerSideProps, NextPage} from "next";
import {Post} from "../../types/Post";
import ReactMarkdown from "react-markdown";
import Hero from "../../components/Hero";
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

interface PostPageProps {
    post?: Post
}

const PostPage: NextPage<PostPageProps> = ({post}: PostPageProps) => {
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
       </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({params, res}) => {
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
    return {
        props: {
            post: (response.data as Post)
        }
    }

}

export default PostPage;
