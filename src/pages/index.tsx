import React from "react";
import {GetServerSideProps, NextPage} from "next";
import {getPostsFromJsonArray, Post} from "../types/Post";
import PostCover from "../components/PostCover";
import Hero from "../components/Hero";
import Container from "@material-ui/core/Container";
import {Grid} from "@material-ui/core";
import HOST_URL from "../data";

interface HomeProps {
    posts: Post[];
}

const Home: NextPage<HomeProps> = ({posts}: HomeProps) => {
    return (
        <div className={"Home"}>
            <Hero title={"Home"} height={150}/>
            <Grid container
                  justify="center">
                <Grid item xs={10} >
                    <Container>
                        {posts.map((post) => {
                            return <PostCover key={post.id} post={post}/>
                        })}
                    </Container>
                </Grid>
            </Grid>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {

    let posts: Post[] = [];

    let response = await fetch(HOST_URL + `/api/posts/getLatest/`, {
        method: 'GET',
        headers: {
            'Content-type': "application/json",
        }
    }).then(async response => await response.json()).then(async response => {
            posts = getPostsFromJsonArray(response.data);
            return posts;
        }).catch((error) => {
            return [];
    });

    return {
        props: {
            posts: response
        }
    };

}

export default Home;
