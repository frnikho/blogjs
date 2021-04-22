import React from "react";
import {GetServerSideProps, NextPage} from "next";
import {getPostsFromJsonArray, Post} from "../types/Post";
import PostCover from "../components/PostCover";
import Hero from "../components/Hero";
import Container from "@material-ui/core/Container";

interface HomeProps {
    posts: Post[];
}

const Home: NextPage<HomeProps> = ({posts}: HomeProps) => {
    return (
        <div className={"Home"}>
            <Hero title={"Home"} height={150}/>
            <Container>
                {posts.map((post) => {
                    return <PostCover key={post.id} post={post}/>
                })}
            </Container>
        </div>


    );
}

export const getServerSideProps: GetServerSideProps = async ({}) => {

    let posts: Post[] = [];

    let reponse = await fetch(`${process.env.URL}/api/posts/getLatest/`, {
        method: 'GET',
        headers: {
            'Content-type': "application/json",
        }
    });
    let json: any = await reponse.json();

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
