import Grid from '@mui/material/Grid'; // Grid version 1

import Item from '@mui/material/MenuItem'; // Grid version 1

import TextField from "@mui/material/TextField";

import AccountCircle from '@mui/icons-material/AccountCircle';

import InputAdornment from '@mui/material/InputAdornment';

import Button from "@mui/material-next/Button";

import { useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { ChangeEvent,useState } from 'react';

import { update_post } from "../../data/redux/postSlice/postSlice";

 

function EditPost() {

 

  const { id } = useParams();

  const post = (useSelector((state) => state.posts.value)).find(item => item.id == id);

 

  const [title, setTitle] = useState(post.title);

  const [author, setAuthor] = useState(post.author);

  const [img, setImg] = useState(post.img);

  const [category, setCategory] = useState(post.category);

  const [content, setContent] = useState(post.content);

 

  const dispatch = useDispatch();

 

  const [showErrors,setShowErrors] = useState(false);

  const validRegex = /^(^(http|https):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g;

 

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

    //  Store the input value to local state

    setShowErrors(true);

 

    switch(e.target.id){

     

      case "title":

        setTitle(e.target.value);

        break;

 

      case "author":

        setAuthor(e.target.value);

        break;

      case "img":

        setImg(e.target.value);

        break;

 

      case "category":

        setCategory(e.target.value);

        break;

 

      case "content":

        setContent(e.target.value);

        break;

    }

  };

 

  const updatePost = () => {

    setShowErrors(true);

    if (

      title.length < 5 ||

      author.length < 3 ||

      !img.match(validRegex) ||

      category.length < 3 ||

      content.length < 100

    ) {

      return;

    }

    dispatch(update_post({ id: post.id, title: title, category: category, content: content, author: author, img: img }));

    alert("Updated")

  }

   

  return (

    <>

        <h1>Edit Post</h1>

        <Grid container spacing={2}>

        {

          showErrors ?

       

        <Grid item={true} xs={12}>

           { title.length < 5 ? <div style={{ color: "red" }}>&emsp;&emsp; - Title must have atleat 5 characters </div> : "" }

            { author.length < 3 ?  <div style={{ color: "red" }}>&emsp;&emsp; - Author name must have atleat 3 characters</div> : "" }

            { !img.match(validRegex) ?  <div style={{ color: "red" }}>&emsp;&emsp; - Image url in valid</div> : "" }

            { category.length < 3 ?  <div style={{ color: "red" }}>&emsp;&emsp; - Category must have atleat 3 characters</div> : "" }

            { content.length < 100 ?   <div style={{ color: "red" }}>&emsp;&emsp; - Content must have atleat 100 characters</div> : "" }

        </Grid>

        : "" }

      </Grid>

        <Grid container spacing={2}>

        <Grid  item={true} xs={8}>

        <Item>

        <TextField label="Title" id="title" onChange={handleChange} value={title} variant="outlined" fullWidth />

           

 

        </Item>

        </Grid>

        <Grid  item={true} xs={4}>

        <Item>

        <TextField label="Category" id="category" onChange={handleChange} value={category} variant="outlined" fullWidth />

        </Item>

        </Grid>

 

        <Grid  item={true} xs={6}>

        <Item>

 

        <TextField

            fullWidth

            InputProps={{

          startAdornment: (

            <InputAdornment position="start">

              <AccountCircle />

            </InputAdornment>

          ),

        }} label="Author" variant="outlined" id="author" onChange={handleChange} value={author} />

        </Item>

        </Grid>

 

        <Grid  item={true} xs={6}>

            <Item>

            <TextField label="Img URL" id="img" onChange={handleChange} value={img}  variant="outlined" fullWidth/>

            </Item>

       

        </Grid>

        <Grid  item={true} xs={12}>

            <Item>

            <TextField

            fullWidth

          id="content"

          label="Content"

          multiline

          rows={8}

          value={content}

          onChange={handleChange}

        />

            </Item>

        </Grid>

        <Grid>

          &emsp;&emsp;<Button variant="filled"  onClick={updatePost}>Update</Button>

 

        </Grid>

    </Grid>

    </>

 

  );

}

 

export default EditPost;