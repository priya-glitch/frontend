import { Container, Grid, Card, CardMedia, CardContent, Button, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import app_config from "../config";

const BrowseBlogs = () => {
  const url = app_config.api_url;

  

  const [browseList, setBrowseList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = () => {
    fetch(url + "/blog/getall")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBrowseList(data);
        setLoading(false);
        
      });
      
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const showBlog = () => {
    if (!loading) {
      return (
        <Grid container spacing={4} >
          {browseList.map((blog) => {
              console.log(blog);
            return (
              <Grid item md={4
              }>
                <Card>
               
                <h6>@{blog.username}</h6>
                  <CardMedia
                    component="img"

                    image={url + "/" + blog.thumbnail}
                  />
                  <CardContent>
                    <h2>{blog.title}</h2>
                    <p>{blog.data}</p>
                    
                  
                    <p class="card-text">
              <small class="text-muted">Published :  {blog.published}</small>
            </p>



                    <Link to={'/addblog' } style={{textDecoration: 'none'}}>
                        <Button variant="contained"  color="secondary">View</Button>
                    </Link>

                    
                  </CardContent>

                </Card>
              </Grid>
            );
          })}
        </Grid>
      );
    }
  };

  return (
    <Paper elevation="MuiPaper-elevation5"> 
<br/>
    <Container className=""> 
    <br/>

     
       <h1 className="brand-title">BROWSE BLOGS </h1>
      
      <hr />

      {showBlog()}
    </Container>
    </Paper > 

  );
};

export default BrowseBlogs;