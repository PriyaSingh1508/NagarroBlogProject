import { Route,Routes } from "react-router-dom";
import NavBar from "../components/common/navbar/Navbar.Component";
import Home from "../components/blog/Home.Component";
import PostCreate from "../components/post/Create.Component";
import Posts from "../components/post/Posts.Component";
import Post from "../components/post/Post.Component";
import EditPost from "../components/post/Edit.Component";
import NotFound from "../components/common/error/NotFound.Component";
import Login from "../components/auth/login";
import Logout from "../components/auth/logout";

import { Storage } from '../data/storage';
import {  useDispatch } from 'react-redux';
import { set_posts,set_key } from "../data/redux/postSlice/postSlice";
import { set_value } from "../data/redux/counter/counter";
import { useContext } from "react";
import { UserContext } from "../data/context/userContext";
import Protected from "../components/common/protected/Protected";
import Register from "../components/auth/register";

function App() {

    let posts;
    const dispatch = useDispatch();
    const {iUser} = useContext(UserContext);


    if(!localStorage.getItem("posts")){
        posts = Storage.posts;
        console.log(posts);
        localStorage.setItem("posts",JSON.stringify(posts))
    }
    else{
        posts = JSON.parse(localStorage.getItem("posts"));
    }


    dispatch(set_posts(posts));
    dispatch(set_value(posts.length));
    dispatch(set_key(posts.reduce((a, b) => Math.max(a.id, b.id),1)));

    return (
        <>
        <Routes>
            <Route path="/" element={ <Home /> } />
            <Route  element={ <NavBar /> }>

                <Route path="/post">
                    <Route index element={ <Posts /> } />
                    <Route path=":id" element={ <Post /> } />
                    <Route path="create" element={<Protected isLoggedIn={iUser}> <PostCreate /> </Protected>} />
                    <Route path=":id/edit" element={ <Protected isLoggedIn={iUser}> <EditPost /> </Protected> } />
                </Route>
                <Route path="/auth">
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route index element={<Login />} />
                    <Route path="logout" element={<Logout />} />
                </Route>

            </Route>
            <Route path="*" element={<NotFound />} />
                
        </Routes>
        </>
    );
}
export default App;