import Grid from "@mui/material/Grid"; // Grid version 1
import Item from "@mui/material/MenuItem"; // Grid version 1
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material-next/Button";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { insert_post } from "../../data/redux/postSlice/postSlice";
import { useContext } from "react";
import { UserContext } from "../../data/context/userContext";

function PostCreate() {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [img, setImg] = useState("");
	const [category, setCategory] = useState("");
	const [content, setContent] = useState("");
	const dispatch = useDispatch();
	const [showErrors,setShowErrors] = useState(false);
  const validRegex = /^(^(http|https):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g;
  const {iUser} = useContext(UserContext);


	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowErrors(true);

		// 👇 Store the input value to local state
		switch (e.target.id) {
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

	const insertPost = () => {
		if (
			title.length < 5 ||
			author.length < 3 ||
			!img.match(validRegex) ||
			category.length < 3 ||
			content.length < 100
		) {
      setShowErrors(true);
			return;
		}

		dispatch(
			insert_post({
				title: title,
				author: author,
				img: img,
        category: category,
				content: content,
        user: iUser
			})
		);
    alert("Created")

		setTitle("");
		setAuthor("");
		setImg("");
		setCategory("");
		setContent("");
    setShowErrors(false);

    
	};

	return (
		<>
			

			<h1>Create Post</h1>
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
				<Grid item={true} xs={8}>
					<Item>
						<TextField
							label="Title"
							id="title"
							onChange={handleChange}
							value={title}
							fullWidth
						/>
					</Item>
				</Grid>
				<Grid item={true} xs={4}>
					<Item>
						<TextField
							label="Category"
							id="category"
							onChange={handleChange}
							value={category}
							fullWidth
						/>
					</Item>
				</Grid>

				<Grid item={true} xs={6}>
					<Item>
						<TextField
							fullWidth
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<AccountCircle />
									</InputAdornment>
								),
							}}
							label="Author"
							id="author"
							onChange={handleChange}
							value={author}
						/>
					</Item>
				</Grid>

				<Grid item={true} xs={6}>
					<Item>
						<TextField
							label="Img URL"
							id="img"
							onChange={handleChange}
							value={img}
							fullWidth
						/>
					</Item>
				</Grid>
				<Grid item={true} xs={12}>
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
          &emsp;&emsp;<Button variant="filled" onClick={insertPost}>Create</Button>

        </Grid>
			</Grid>
		</>
	);
}

export default PostCreate;
