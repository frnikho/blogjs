import {Post} from "../types/Post";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardMedia, Grid} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {useRouter} from "next/router";
import Moment from "react-moment";

interface PostCoverProps {
    post: Post
}

const useStyles = () => makeStyles({
   root: {
        display: 'flex',
        paddingLeft: 0,
        paddingTop: 60,
        minHeight: 350,
        minWidth: 350,
   },
    details: {
        display: 'flex',
        flexDirection: 'column'
    },
    cover: {
        minWidth: 600,
        minHeight: 200,
        maxHeight: 400
    },
    title: {
        fontSize: 28,
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: 500
    },
    content: {

    },
});

const PostCover: React.FC<PostCoverProps> = ({post}: PostCoverProps) => {
    const router = useRouter();
    const classes = useStyles()();

    console.log("public" + post.image_cover_url);

    let imagePath = "public" + post.image_cover_url || "/space.jpg";

    return (
        <Card className={classes.root} elevation={0} onClick={() => router.push('/posts/' + post.url_key)}>
            <CardMedia className={classes.cover}
                image={imagePath}
                title="Image"
            />
            <CardContent>
                <Grid container
                      direction="column"
                      justify="center"
                >
                    <Grid item>
                        <Typography className={classes.title}>
                            {post.title}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Moment date={post.created_date} format={"YYYY/MM/DD"}/>
                    </Grid>
                    <Grid item>
                        {/*<Typography className={classes.content}>
                            {post.content}
                        </Typography>*/}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default PostCover;
