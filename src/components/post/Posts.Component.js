
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Chip from '@mui/material/Chip';
import ThumbUpSharpIcon from "@mui/icons-material/ThumbUpSharp"
import { Link } from "react-router-dom";
import { Button } from '@mui/material';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

function Posts() {
  const navigate = useNavigate();
  const posts = useSelector((state) => state.posts.value);
  console.log((posts));
  let redirectToPost = (id) => {
    console.log("test");
    // navigate("/post/"+item.id)
  }

  return (
    <>

    { posts.map(item => ( 


    <Link to={"/post/"+item.id} style={{ textDecoration: 'none' }}>
      <Paper
        sx={{
          p: 2,
          margin: 'auto',
          width:'100%',
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
      >
        
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 300, height: 200 }}>
              <Img alt="complex" src={item.img} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  { item.title }
                </Typography>
                <Typography variant="body2" gutterBottom>
                  { item.content.substr(1,500) } {  item.content?.length > 500 ? "..." : ""}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <Chip label={"#"+item.category} variant="outlined" />
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div">
                <Button startIcon={<ThumbUpSharpIcon />}>  {item?.likes?.length}</Button>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      </Link>
     )) }
    </>
  );
}

export default Posts;
