import {GetServerSideProps, NextPage} from "next";
import Hero from "../../components/Hero";
import Box from "@material-ui/core/Box";
import {Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import React, {useState} from "react";

import MarkdownPreview from '@uiw/react-markdown-preview';

import '@uiw/react-markdown-preview/dist/markdown.css';
import '@uiw/react-markdown-preview/lib/esm/styles/markdown.css';
import {Category} from "../../types/Category";
import {useCookies} from "react-cookie";
import axios from "axios";
import {useRouter} from "next/router";

interface CreatePostProps {
    categories: Category[] | null,
}

const PostPage: NextPage<CreatePostProps> = ({categories}: CreatePostProps) => {

    const [cookies] = useCookies(['login_session']);

    const router = useRouter();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("**Hello world!!!**");
    const [category, setCategory] = useState(categories[0]?.id || "?");

    const [coverImageData, setCoverImageData] = useState("");
    const [imageData, setImageData] = useState("");

    const [submitLoading, setSubmitLoading] = useState(false);

    const changeSelectedCategory = (event) => {
        setCategory(event.target.value)
    }

    const showSubmit = () => {
        if (submitLoading) {
            return (<CircularProgress hidden={!Boolean(submitLoading)}/>)
        } else {
            return (
                <Button hidden={Boolean(submitLoading)} fullWidth size={"large"} variant={"contained"} color={"primary"} onClick={submit}>Post</Button>
            );
        }
    }

    const handleUpload = async (event) => {
        let file = event.target.files[0];

        if (file === undefined)
            return;
        setCoverImageData(URL.createObjectURL(file));
        setImageData(file);
/*        const reader = new FileReader();
        const url = reader.readAsDataURL(file);
        reader.onloadend = (e) => {
            console.log(reader.result);
            setImageData(reader.result.toString());
        };*/
    }

    const showCoverImagePreview = () => {
        if (coverImageData !== "") {
            return (
                <div>
                    <img src={coverImageData} width={200}/>
                </div>
            );
        }
    }

    const submit = async () => {
        if (submitLoading || title === "" || content === "" || category === "")
            return;
        setSubmitLoading(true);

        let resp = await fetch("/api/posts/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                category: category,
                content: content,
            }),
        });
        let response = await resp.json();


        if (imageData !== "") {
            let formData = new FormData();
            formData.append('cover', imageData);

            console.log(imageData);

            let coverResponse = await axios.post("/api/posts/cover/" + response.data.id, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            });
        }

        setSubmitLoading(false);
        await router.push('/posts/' + response.data.url_key);
    }


    return (
        <div>
            <Hero title="New Post" height={200}/>
            <Grid container className={""} >
                <Grid item xs={6}>
                    <Box m={2} mx={2}>
                        <TextField label={"Title"} value={title} onChange={(event) => setTitle(event.target.value)} fullWidth variant={"outlined"}/>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box m={2} mx={2}>
                        {/*<TextField label={"Category"} title={"Title"} fullWidth variant={"outlined"}/>*/}
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                            <Select
                                fullWidth
                                variant={"outlined"}
                                label={"Category"}
                                id="demo-simple-select"
                                value={category}
                                onChange={changeSelectedCategory}
                            >
                                {categories?.map((cat) => {
                                    return (<MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <Box p={2}>
                        {showSubmit()}
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={0}>
                <Grid item xs={6}>
                    <Box m={2}>
                        <TextField
                            id="standard-multiline-static"
                            label="Content"
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                            multiline
                            fullWidth
                            variant={"outlined"}/>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box m={2}>
                        <MarkdownPreview source={content}/>
                    </Box>
                </Grid>
            </Grid>
            <Box m={4}>
                <Grid container>
                    <Grid item xs={1}>
                        <input
                            hidden={true}
                            accept="image/*"
                            id="contained-button-file"
                            type="file"
                            onChange={handleUpload}
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span">
                                Upload
                            </Button>
                        </label>
                    </Grid>
                    <Grid item xs={1}>
                        <Button variant={"contained"} color={"default"} onClick={() => setCoverImageData("")}>Delete Cover</Button>
                    </Grid>
                    <Grid item xs={1}>
                        {showCoverImagePreview()}
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({params, req, res}) => {
    if (req.cookies.user_id === undefined || req.cookies.login_session === undefined) {
        return {
            props: {},
            redirect: {
                destination: '/',
                permanent: true,
            }
        }
    }

    let resp = await fetch(process.env.URL+ '/api/categories/all', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        }
    });

    let response = await resp.json();
    if (response.code === 200) {
        return {
            props: {
                categories: response.data
            }
        }
    }
    return {
        props: {
            categories: null,
        }
    }
}

export default PostPage;
