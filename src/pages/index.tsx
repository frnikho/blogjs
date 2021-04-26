import React from "react";
import {GetServerSideProps, NextPage} from "next";
import {getPostsFromJsonArray, Post} from "../types/Post";
import PostCover from "../components/PostCover";
import Hero from "../components/Hero";
import Container from "@material-ui/core/Container";
import {Grid} from "@material-ui/core";
import Link from "@material-ui/core/Link";

interface HomeProps {
    posts: Post[];
}

const Home: NextPage<HomeProps> = ({posts}: HomeProps) => {
    return (
        <div className={"Home"}>
            <Hero title={"Home"} height={150}/>
            <Link href="/posts/hello-world">Hello</Link>
            <Grid container spacing={3}
                  justify="center">
                <Grid item xs={8} >
                    <Container>
                        {posts.map((post) => {
                            return <PostCover key={post.id} post={post}/>
                        })}
                    </Container>
                </Grid>
                <Grid item xs={4}>
                    <p>ABC</p>
                </Grid>
            </Grid>
        </div>


    );
}

export const getServerSideProps: GetServerSideProps = async () => {

    let posts: Post[] = [];

    let response = await fetch(`${process.env.URL}/api/posts/getLatest/`, {
        method: 'GET',
        headers: {
            'Content-type': "application/json",
        }
    });
    let json: any = await response.json();

    if (json.code !== 200) {
        return {
            props: { posts }
        }
    }
    posts = getPostsFromJsonArray(json.data);
    return {
      props: {
          posts,
      }
    };
}

export default Home;
