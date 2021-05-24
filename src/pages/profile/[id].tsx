import {GetServerSideProps, NextPage} from "next";
import {instanceOfUser, User} from "../../types/User";
import {makeStyles} from "@material-ui/core";
import React from "react";
import Typography from "@material-ui/core/Typography";
import {Post} from "../../types/Post";
import Box from "@material-ui/core/Box";
import PostCover from "../../components/PostCover";
import {response} from "express";
import HOST_URL from "../../data";

interface ProfilePageProps {
    user: User,
    posts?: Post[],
}

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const ProfilePage: NextPage<ProfilePageProps> = ({user, posts}: ProfilePageProps) => {
    const classes = useStyles();

    return (
        <div>
            <p>{user.username}</p>
            <h1>Posts</h1>
            <Box m={40}>
                {posts?.map((post) => {
                    return (<PostCover key={post.id} post={post}/>);
                })}
            </Box>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async ({params, res}) => {
    let userResponse;
    let postsResponse;
    const {id} = params;
    userResponse = await fetch(HOST_URL + "/api/users/get/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: id
        })
    });
    userResponse = await userResponse.json();
    if (instanceOfUser(userResponse.data)) {
        userResponse = userResponse.data as User;
    } else {
        return {
            redirect: {
                destination: '/',
                permanent: true,
            },
            props: {}
        }
    }
    postsResponse = await fetch(HOST_URL + "/api/posts/getAllFromUser/" + userResponse.id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    postsResponse = await postsResponse.json();
    return {
        props: {
            user: (userResponse as User),
            posts: (postsResponse.data)
        }
    }


}

export default ProfilePage;
