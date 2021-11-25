import { Container, Grid, Card, CardMedia, CardContent, Button, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./forms.css";
import app_config from "../config";
import  Bootbox  from  'bootbox-react';
import { styled } from '@mui/material/styles';
import { margin } from "@mui/system";


const BrowseBlogs = () => {



  const url = app_config.api_url;

  

  const [browseList, setBrowseList] = useState([]);
  const [loading, setLoading] = useState(true);





 

  useEffect(() => {
    fetchBlogs();
  }, []);


  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }));


  const fetchBlogs = () => {
    fetch(url + "/blog/getall")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBrowseList(data);
        setLoading(false);
        
      });
      
  };




  
  

  const showBlog = () => {
    if (!loading) {
      return (

        
        <Grid container spacing={4} >
          {browseList.map((blog,index) => {
              console.log(blog);
              var model_id='model_id_'+index;
              var data_target="#"+model_id;
              var tag= blog.tags;
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

                    <h2 > {blog.title}</h2>

                    <p className="limit-text"> <i>{blog.data}</i></p>
                    
                  
                    <p class="card-text">
              <small class="text-muted">Published :  {blog.published}</small>
            </p>



           

                   
                        
                      
                        
                       <Button type="button" class="btn btn-primary" data-toggle="modal" data-target={data_target}>
 Read More
</Button>


<div className="modal fade" id={model_id} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
<Card>
      <div className="modal-header">

        <h2 className="modal-title blog_heading" id="exampleModalLongTitle" >{blog.title}</h2>
        <br/>

        
        

        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div className="modal-body">
        <div className="container">

        <CardMedia
                    component="img"

                    image={url + "/" + blog.thumbnail}
                  />
                  
        </div>
        <br/>      <p className="blog-username">@{blog.username}</p>

        <h4 className="blog_description">{blog.description}</h4>
        <Item style={{fontSize:"16px"}}>{blog.data}</Item>
        <p class="card-text">

              <small class="text-muted">Published :  {blog.published}</small>
            </p>

            <p class="font-weight-normal ">
             
                 Tags :
                {tag.map(some => {
                  return(
                <small className="tags text-uppercase">  {some.title} </small>)

                })}
              
            </p>

      </div>
      

      <div className="modal-footer">
        <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
         
         
      </div>
      </Card>
    </div>
  </div>
</div>
                    
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
      
      <hr /><br/>

      {showBlog()}
    </Container>
    </Paper > 

  );
};

export default BrowseBlogs;