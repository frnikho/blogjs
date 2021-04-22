import {GetServerSideProps, NextPage} from "next";
import {instanceOfUser, User} from "../../types/User";
import {Card, makeStyles} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import React from "react";
import Typography from "@material-ui/core/Typography";

interface ProfilePageProps {
    user: User
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

const ProfilePage: NextPage<ProfilePageProps> = ({user}: ProfilePageProps) => {
    const classes = useStyles();

    console.log("");

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Word of the Day
                </Typography>
                <Typography variant="h5" component="h2">
                    Hello World
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    adjective
                </Typography>
                <Typography variant="body2" component="p">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
        </Card>);
}

export const getServerSideProps: GetServerSideProps = async ({params, res}) => {
    let response;
    const {id} = params;
    response = await fetch("http://localhost:3000/api/users/get/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: id
        })
    });
    response = await response.json();
    console.log(response);
    if (instanceOfUser(response.data)) {
        return {
            props: (response.data as User)
        }
    } else {
        return {
            props: {}
        }
    }
}

export default ProfilePage;
