import { Paper } from "@mui/material";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import MDEditor from "@uiw/react-md-editor";
import mermaid from "mermaid";
import app_config from '../config';
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


  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 }
  ];
  


  const blogForm = {
   
    title : "",
    description : "",
    tags : [],
    thumbnail : "",
    data: "",
    published :  new Date().getDate(),
    author : JSON.parse(sessionStorage.getItem("user")),
    username : "",

  };



 



  const blogSubmit = (values) => {


    values.data = value;
    console.log(values);
    console.log(value);
    console.log(values.username);


    values.thumbnail = thumbnail;
    values.username = blogForm.author.name;
    
    
    const reqOptions = {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' }
    };


    fetch(url + '/blog/add', reqOptions)
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Blog Added Successfully'
        })
    })
     
    
 }

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
      });

}

  return (
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
                    className="form-control input1"
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
                    className="form-control input1"
                    id="description"
                    placeholder="Enter Description"
                    value={values.description}
                    onChange={handleChange}
                  />
</div>
    <div className="form-group  ">
     <label>Tags</label>
                

<Stack spacing={3} >
  
      <Autocomplete
        multiple
        id="tags-filled"
        
        options={top100Films.map((option) => option.title)}
        defaultValue={[top100Films[2].title]}
        
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label=""
            placeholder="Favorites"
           
           
          />
        )}
      />
    </Stack>
 </div>
 <br/>

 <Grid item className="mt-4">
                     <label >Upload Thumbnail</label>
                      <input onChange={uploadThumbnail} className="form-control" type="file" />
  </Grid>


    <div className="form-group">
            <label> Add Content</label>
            <br/> <br/>
                  

             
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
                    POST
                  </button>
              </form>
            )}
          </Formik>
        </div>
     </Box>
    </Container>
    </Paper>
  );
};
export default Blog;
