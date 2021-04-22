import {Post} from "../types/Post";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardMedia, Grid} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

interface PostCoverProps {
    post: Post
}

const useStyles = () => makeStyles({
   root: {
        display: 'flex',
        paddingLeft: 0,
        paddingTop: 60,
        minHeight: 350
   },
    details: {
        display: 'flex',
        flexDirection: 'column'
    },
    cover: {
        width: 500
    },
    title: {
        fontSize: 24,
        fontWeight: 500
    },
    content: {

    },
});

const PostCover: React.FC<PostCoverProps> = ({post}: PostCoverProps) => {
    const classes = useStyles()();
    return (
        <Card className={classes.root} elevation={0}>
            <CardMedia className={classes.cover}
                image="/space.jpg"
                title="Image"
            />
            <CardContent>
                <Grid container
                      spacing={3}
                      direction="column"
                      justify="center"
                >
                    <Grid item>
                        <Typography className={classes.title}>
                            {post.title}
                        </Typography>
                    </Grid>
                    <Grid item>{post.created_date}</Grid>
                    <Grid item>
                        <Typography className={classes.content}>
                            {post.content}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default PostCover;
