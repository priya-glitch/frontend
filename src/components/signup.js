import { Paper } from "@mui/material";
import { Formik } from "formik";
import Swal from "sweetalert2";
import app_config from "../config";
import "./forms.css";



const SignUp = () => {

   const url = app_config.api_url;

  const signupForm = {
    name: "",
    email: "",
    password: "",
  };

  const signupSubmit = (values) => {
    console.log(values);


    const reqOptions = {
      method : 'POST',
      body : JSON.stringify(values),
      headers : { 'Content-Type' : 'application/json'}
    }
    fetch(url + '/user/add', reqOptions)

    .then((res) =>
    {
      console.log(res.status);

        if (res.status == 200){ 
          Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to change it!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Submit it!",
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire("Submitted!", "Your data has been Submitted.", "success");
                }
              });

        }  else{
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Something went wrong'
        });
        }
 return res.json();
    })

    .then ((data) =>{
console.log(data);
    }
    )
   
   }

  

  return (
    <>
     
      <Paper elevation="MuiPaper-elevation5">
      <Formik initialValues={signupForm} onSubmit={signupSubmit}>
        {({ values, handleSubmit, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group"></div>
            <div className="container2">
              <div className="container1">
                <div className="brand-logo ">
        <img src="https://image.flaticon.com/icons/png/128/3237/3237472.png" className="img-fluid " alt=""/>
                </div>
                <div className="brand-title">Sign Up Here</div>
                <div className="inputs">
                  <label className="label1">Name</label>
                  <input
                  id="name"
                    className="input1"
                    type="text"
                    placeholder="Enter Full Name"
                    value={values.name}
                  onChange={handleChange}
                  />
                  <label className="label1">E-mail</label>
                  <input
                  id="email"
                    className="input1"
                    type="email"
                    placeholder="example@test.com"
                    value={values.email}
                  onChange={handleChange}
                  />
                  <label className="label1">Password</label>
                  <input
                  id="password"
                    className="input1"
                    type="password"
                    placeholder="Min 6 charaters long"
                    value={values.password}
                  onChange={handleChange}
                  />
                  <button className="button1" type="submit">
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
      </Paper>
    </>
  );
};

export default SignUp ;
