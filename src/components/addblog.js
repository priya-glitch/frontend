import { Paper, Button, List, ListItem,ListItemText,IconButton } from "@mui/material";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import MDEditor from "@uiw/react-md-editor";
import app_config from '../config';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { styled } from '@mui/material/styles';


import {
    Card,
    CardActions,
    CardContent,
    Container,
    Box,
    Grid
    
  } from "@mui/material";




 
 
  
const Blog = () => {

  const url = app_config.api_url;
  const [thumbnail, setThumbnail] = useState("");
  const [value, setValue] = useState("**Start writing your Blog here......**");
  const [mystate, setMystate] = useState("not initialized");



  const [movies, setMovies] = useState([]);
  const [key, setKey] = useState(0);

  
  const top100Films = [
    { title: 'Disease', year: 1994 },
    { title: 'Food', year: 1972 },
    { title: 'Movies', year: 1974 },
    { title: 'Games', year: 2008 },
    { title: 'Music', year: 1957 },
    { title: "Politics", year: 1993 },
    { title: 'Nature', year: 1994 },
    { title: 'Business', year: 1994 },
    { title: 'Education', year: 1994 },
    { title: 'Photography', year: 1994 },
    { title: 'Health', year: 1994 },
    { title: 'Life', year: 1994 },
    { title: 'News', year: 1994 },
    { title: 'Travel', year: 1994 },
    { title: 'Technology', year: 1994 },
    { title: 'Social Media', year: 1994 },
    { title: 'Sports', year: 1994 },
    { title: 'Fun', year: 1994 },
    { title: 'Environment', year: 1994 },
    { title: 'Marketing', year: 1994 },
  ];


  const blogForm = {
   
    title : "",
    description : "",
    tags : [],
    thumbnail : "",
    data: "",
    published :  new Date(),
    author : JSON.parse(sessionStorage.getItem("users")),
    username : "",

  };
  

  const defaultProps = {
    options: top100Films,
    getOptionLabel: (option) => option.title
 
  };


  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }));


 
 



  const uploadThumbnail = (e) => {

    const selFile = e.target.files[0];
  
    console.log(selFile);
  
    const tempForm = new FormData();
    tempForm.append('file', selFile);
  
    fetch(url +'/util/uploadfiles', { method: 'POST', body: tempForm })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setThumbnail(selFile.name);
            console.log(selFile.name);
        });
  
  }



  const blogSubmit = (values) => {


    values.data = value;
    console.log(values);
    // console.log(value);
    console.log(values.username);

    //  console.log(blogForm);
    values.thumbnail = thumbnail;
    values.tags = movies;
    console.log(movies);

    values.username = blogForm.author.name;

    console.log(values.thumbnail);
    console.log(values.tags);



    const reqOptions = {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' }
    };
    fetch(url + '/blog/add', reqOptions)
    .then(res => res.json())
    .then((data) => {

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Blog Added Successfully'
      })
    })
     
    
 }  


  return (
    <>

    <Paper elevation="MuiPaper-elevation5"> 
   <Container className="container2">
   <Box
   className="container4"
    >
      
 
      
        <div  style={{ margin: "30px" }}>
          
          <h1 className="brand-title">ADD BLOG </h1>
          
          <hr />
          
          <Formik initialValues={blogForm} onSubmit={blogSubmit}>
            {({ values, handleSubmit, handleChange }) => (

              <form onSubmit={handleSubmit}>
                <div className="form-group">

                  <label> Title</label>
                  <input
                    type="text"
                    className="input1"
                    id="title"
                    placeholder="Enter title"
                    value={values.title}
                    onChange={handleChange}
                  />
                 
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <input
                    type="text"
                    className="input1"
                    id="description"
                    placeholder="Enter Description"
                    value={values.description}
                    onChange={handleChange}
                  />
</div>



<Grid container spacing={2}>
  <Grid item xs={12}>
    <Item>
    <Autocomplete
        {...defaultProps}
        multiple
        filterSelectedOptions
        renderTags={() => null} // don't render tag in the TextField
        value={movies}
        onChange={(e, newValue) => setMovies(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="movies" margin="normal" />
        )}
  
      />
      <List>
        {movies.map((movie) => (
          <ListItem key={movie.title}>
            <ListItemText primary={movie.title} />
            <IconButton
              key={key}
              aria-label="delete"
              onClick={() => {
                setMovies(() => movies.filter((m) => m !== movie));
              }}
            >
                            <HighlightOffIcon />

            </IconButton>
          </ListItem>
        ))}
      </List>
    </Item>
  </Grid>
  
 
  </Grid>





  <Grid>
                     <label >Upload Thumbnail</label>
                      <input type="file" onChange={uploadThumbnail} className="form-control"  />
                      </Grid>


   


 <br/>





    <div className="form-group">
            <label> Add Content</label>
            <br/> 
                  

             
      <MDEditor
        value={value}
        onChange={setValue}
      />
     
      <div className="container">
      <MDEditor.Markdown source={value} />
    </div>

    </div>

                <br />
                <button className="button1" type="submit">
                    Submit Blog
                  </button>
              </form>
            )}
          </Formik>
        </div>
     </Box>
    </Container>
    </Paper>
       </>
  );
};
export default Blog;
