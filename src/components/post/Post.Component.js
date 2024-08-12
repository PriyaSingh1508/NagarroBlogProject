
import Grid from '@mui/material/Grid'; // Grid version 1
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import { Link, useNavigate,Navigate } from "react-router-dom";
import '../../assets/css/post.css';
import SideBar from "../common/sidebar/SideBar.Component"
import { useSelector,useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useContext, useEffect } from "react";
import { UserContext } from "../../data/context/userContext";
import ThumbsUpSharpIcon from '@mui/icons-material/ThumbUpSharp';
import { like_post,delete_post } from "../../data/redux/postSlice/postSlice";
import { Button } from '@mui/material';

function Post() {

  const {iUser} = useContext(UserContext);
  const navigate = useNavigate();

  const { id } = useParams();
  const post = (useSelector((state) => state.posts.value)).find(item => item.id == id);
  const dispatch = useDispatch();

  const check = (item) =>{
    console.log(item);
    if(item == undefined){
      console.log("ASdfas");
      navigate("/post");

    }
  }

  const callLike = () => {
    if(!iUser){
      navigate("/auth/login")
    }
    dispatch(like_post({id: post.id, iUser: iUser}));
  }

  const deletePost = () => {
    dispatch(delete_post(post.id));
  }


  return (
    <>
    { !post ? <Navigate to="/post" /> : "" }
    
    <Grid  container spacing={2}>
        <Grid item={true} xs={9}>
        
            <div >
              <h1>{ post?.title } | #{post?.category} </h1>
              <div>
                <Button startIcon={<ThumbsUpSharpIcon />}>  {post?.likes.length}</Button>
                  { iUser == post?.user ?  <Button onClick={deletePost}>Delete</Button> : " "}


              </div>
              <img className='post-img' src={post?.img} alt="post image" />
              <div className='post-content'>
                  {post?.content}
              </div>
            </div>
        </Grid>
        <Grid item={true} xs={3}>
        <SideBar />
        </Grid>
    </Grid>

    { iUser && iUser == post?.user &&
        <Link to={"/post/" + post?.id + "/edit"}>
          <Fab color="secondary" className="create-post-fab" aria-label="add">
              <EditIcon />
          </Fab>
        </Link> 
    }   
     { iUser != post?.user && 
        <Fab color={ post?.likes.find(item => item == iUser) ? "error" : "secondary"  } size="large" onClick={callLike} className="create-post-fab" aria-label="Like">
            <ThumbsUpSharpIcon />
        </Fab>
      }   
    </>
   
  
  );
}

export default Post;
