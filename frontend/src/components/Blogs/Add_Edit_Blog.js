import React, { useState, useEffect } from 'react';
import './Add_Edit_Blog.css';
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
    Button,
    IconButton,
    Tooltip
} from '@material-ui/core'
import { PhotoCamera } from "@material-ui/icons";
import axios from 'axios';
require('dotenv').config();

const useStyles = makeStyles((theme) => ({

    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(3),
            width: '50vw',
            minWidth: 'max-content'
        },
    },
    imageUpload: {
        paddingLeft: '26px'
    },
    input: {
        display: 'none'
    }
}));

export default function Add_Edit_Blog(props) {
    const classes = useStyles();
    const { history } = props;

    const [blogs, setBlogs] = useState({
        title: '',
        content: '',
    });
    const [titleError, setTitleError] = useState({});
    const [contentError, setContentError] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const url = process.env.REACT_APP_SERVER_API;

    const handleChange = (event) => {
        setBlogs({ ...blogs, [event.target.name]: event.target.value });

    };
    const handleCapture = (event) => {
        setSelectedImage(event.target.files[0]);
    };


    useEffect(() => {
        setBlogs({ ...blogs, image: selectedImage });
    }, [selectedImage])

    const backToHomePage = () => {
        history.push('/home');
    }
    const validateInputs = () => {
        const titleError = {};
        const contentError = {};
        let isValid = true;
        if (blogs.title.trim().length === 0) {
            titleError.input = 'Please enter title';
            titleError.notValid = true;
            isValid = false;
        }
        if (blogs.content.trim().length === 0) {
            contentError.input = 'Please enter content';
            contentError.notValid = true;
            isValid = false;
        }
        setTitleError(titleError);
        setContentError(contentError);
        return isValid;
    };
    const fetchSingleBlog = async (id) => {
        const response = await axios.get(`${url}${id}`);
        const data = response.data;
        setBlogs(data);
    }
    useEffect(() => {
        if (props.location.state) {
            fetchSingleBlog(props.location.state.targetedBlog._id)
        }
    }, [])
    const add_Blog = async () => {
        await axios.post(`${url}addBlog`, blogs);
        backToHomePage();
    }
    const edit_Blog = async () => {
        await axios.put(`${url}${blogs._id}`, blogs)
        backToHomePage();
    }

    const submitBlog = (e) => {
        e.preventDefault();
        const validate = validateInputs();
        if (validate) {
            if (blogs._id) return edit_Blog()
            add_Blog();
        }

    }
    const cancelBlog = () => {
        backToHomePage();
    }
    return (
        <div className='addNews-body' >
            <form className={classes.root} onSubmit={submitBlog}  >
                <div className='addNews-inputs'>
                    <TextField id="filled-basic"
                        name='title'
                        label="Title"
                        value={blogs.title}
                        onChange={handleChange}
                        helperText={titleError.input}
                        error={titleError.notValid}
                        variant="filled" />

                    <TextField
                        name="content"
                        label="Content"
                        value={blogs.content}
                        onChange={handleChange}
                        helperText={contentError.input}
                        error={contentError.notValid}
                        multiline
                        rows={4}
                        variant="filled"
                    />
                    <  input
                        accept="image/jpeg"
                        id="newsImage"
                        type="file"
                        name='image'
                        onChange={handleCapture}
                        className={classes.input}
                    />
                    <Tooltip title="Select Image">
                        <label htmlFor="newsImage">
                            <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                                className={classes.imageUpload}
                            >
                                <PhotoCamera fontSize="large" />
                            </IconButton>
                        </label>
                    </Tooltip>
                    <label>{blogs.image ? blogs.image.name : "Select Image"}</label>
                    <div className='addNews-btns'>
                        <Button type='submit' variant="contained" color="primary" >
                            Add Blog
                  </Button>
                        <Button variant="contained" color="secondary" onClick={cancelBlog}>
                            Cancel
                  </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

