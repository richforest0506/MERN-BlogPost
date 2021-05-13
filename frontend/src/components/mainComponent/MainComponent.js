import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from '../navBar/Navbar';
import HomePage from '../homePage/HomePage';
import Add_Edit_Blog from '../Blogs/Add_Edit_Blog';
import BlogDetails from '../Blogs/BlogDetails';


export default function MainComponent(props) {

    return (
        <>
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path='/' component={HomePage}>
                    </Route>
                    <Route exact path='/home' component={HomePage}>
                    </Route>
                    < Route path='/details/:blogId' component={BlogDetails}>
                    </Route>
                    <Route path='/addBlog' component={Add_Edit_Blog}>
                    </Route>
                     <Route  path='/:id' component={Add_Edit_Blog}>
                    </Route>

                </Switch>
            </Router>
        </>
    )
}