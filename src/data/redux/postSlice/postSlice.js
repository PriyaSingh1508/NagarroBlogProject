import { createSlice } from '@reduxjs/toolkit'

 

const initialState = {

  value: [],

  key: 1,

}

 

export const postsSlice = createSlice({

  name: 'posts',

  initialState,

  reducers: {

    insert_post: (state,action) => {

      let id  = state.value.map(item => item.id).reduce((a,b) =>  Math.max(a, b), 1) + 1;

      state.value.push({id: id, ...action.payload,likes: []})

        localStorage.setItem("posts",JSON.stringify(state.value))

    },

   

    delete_post: (state,action) => {

      console.log(action.payload);

      state.value = state.value.filter(x => x.id != action.payload)

        // --state.key;

        localStorage.setItem("posts",JSON.stringify(state.value))

 

    },

    update_post: (state,action) => {

      console.log(action.payload);

 

        let post = state.value.find(item => item.id == action.payload.id);

        post.title = action.payload.title;

        post.author = action.payload.author;

        post.content = action.payload.content;

        post.img = action.payload.img;

        post.category = action.payload.category;

        console.log(post);

        localStorage.setItem("posts",JSON.stringify(state.value))

 

    },

    like_post: (state,action) => {

      let post = state.value.find(item => item.id == action.payload.id);

      if(post && action.payload.iUser){

        var ind = post.likes.indexOf(action.payload.iUser)

        if( ind != -1 ){

          post.likes.splice(ind,1);

 

        }else{

          post.likes.push(action.payload.iUser);

        }

 

       

        localStorage.setItem("posts",JSON.stringify(state.value))

      }

    },

    set_posts: (state,action) => {

      state.value = action.payload},

    set_key: (state,action) => state.value.forEach(x => { if(x.id == action.payload.id) x = action.payload.id })

  },

})

 

// Action creators are generated for each case reducer function

export const { insert_post, delete_post,update_post, set_key,set_posts,like_post,unlike_post } = postsSlice.actions

 

export default postsSlice.reducer;