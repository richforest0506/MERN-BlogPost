import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card, CardActions, CardContent,
    CardMedia, Grid, Typography, Button
} from '@material-ui/core';
import axios from 'axios';
import waves from '../images/waves.jpg'
import ThreeDotMenu from '../Blogs/ThreeDotMenu';
require('dotenv').config();


const useStyles = makeStyles({
    container: {
        marginTop: '50px',
        width: '80%',
        margin: 'auto'
    },
    media: {
        height: '20%'
    },
    link: {
        textDecoration: 'none'
    }
});


export default function HomePage(props) {

    const classes = useStyles();
    const url = process.env.REACT_APP_SERVER_API;
    const { history } = props;

    const [allBlogs, setAllBlogs] = useState([]);
    console.log(allBlogs)

    useEffect(() => {
        fetchAllBlogs();
    }, [])

    // fetch data from API
    const fetchAllBlogs = async () => {
        const response = await axios.get(url)
        const data = response.data;
        setAllBlogs(data.blogs)
    }
    const displaySingleBlog = async (blogs) => {
        history.push( `details/${blogs._id}`);
    }
    const deleteBlog= async (id) => {
        const response= await axios.delete(`${url}${id}`);
         const deletedBlog= allBlogs.filter(el=>el._id !== id);
      setAllBlogs(deletedBlog)
     }
    return (
        <>
            <Grid container spacing={2} className={classes.container} >
                {allBlogs.map(el =>
                    <Grid key={el._id} item xs={12} sm={6} md={4}  >
                        <Card >
                        <ThreeDotMenu  blogs= {el} allBlogs={allBlogs} deleteBlog={deleteBlog}></ThreeDotMenu>
                            <CardMedia className={classes.media}
                                component='img'
                                src={waves}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" color='primary'>
                                    {el.title}
                                </Typography>
                                <Typography variant='caption' color='textSecondary'>
                                    {el.content.slice(0, 160)}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" variant='outlined' onClick={() => displaySingleBlog(el)}>
                                    Learn More
                            </Button>
                            </CardActions>
                        </Card>
                    </Grid >
                )}
            </Grid>
        </>
    )
}



