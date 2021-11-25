import { Paper } from "@mui/material";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import app_config from "../config";


const Login = () => {

   const url = app_config.api_url;
  const [mystate, setMystate] = useState("not intiliazed");



  const signupForm = {
   
    email: "",
    password: "",
  };


  const signupSubmit = (values) => {
    console.log(values);

    fetch(url+'/user/getbyemail/'+values.email)
    // fetch(url + '/user/add', reqOptions)
    .then((res)=>{
      console.log(res.status);
      return res.json();
    }).then((data) =>{
      if(data){

         if(data.password == values.password){
          Swal.fire({
            title: "Logged In Successfully!!!",
            text: "Go ahead and Browse Products.",
            icon: "success",
            confirmButtonText: "OK",
          })
          console.log('login success');
          sessionStorage.setItem("users", JSON.stringify(data));
         
         return ;
        }
        else{
          console.log('password incorrect')
        }


      }else{
          console.log('user not found ')
      }
      Swal.fire({
        title : 'Login Failed',
        text: "Incorrect Password or Email",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Try again",
    
       
      })
    

    })
    
     
    
 }

  return (
    <Paper elevation="MuiPaper-elevation5">
    <div>
      
 
      <div className="container2">
        <div className="container3" style={{ margin: "30px" }}>
        <div className="brand-logo ">
        <img src="https://image.flaticon.com/icons/png/128/3237/3237472.png" className="img-fluid " alt=""/>
                </div>
          <h1 className="brand-title">Login Form</h1>
          <hr />
          <br/>
          <Formik initialValues={signupForm} onSubmit={signupSubmit}>
            {({ values, handleSubmit, handleChange }) => (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label> Email</label>
                  <input
                    type="text"
                    className="input1"
                    id="email"
                    placeholder="Enter Username"
                    value={values.email}
                    onChange={handleChange}
                  />
                </div>
          
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="input1"
                    id="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                  />
                </div>

                <br />
                <button className="button1" type="submit">
                    LOGIN
                  </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
    </Paper>
  );
};
export default Login;
