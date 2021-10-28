import Signup from './components/signup';
import Login from './components/login';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/header';
import Blog from './components/addblog';
import { createTheme, ThemeProvider } from '@mui/material';
import {useState} from "react";




function App() {

  const [lightTheme, setLightTheme] = useState(true)

  const theme = createTheme({
    palette : {
      mode: lightTheme ? 'light' : 'dark'
    }
  })
  const myTheme = createTheme({
    palette: {

      mode : lightTheme ? 'light' : 'dark',
      
      secondary : {
        main : '#FF6700',
       
      },

      primary : {
        main : '#FF6700',
        
      },
      error : {
        main : '#800000',
        
      }
    }
  })

  return (
    <div>
      <ThemeProvider theme={myTheme}> 
   
      <BrowserRouter>
      <Header lightTheme= {lightTheme} setLightTheme={setLightTheme}></Header>
    
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/addblog" component={Blog}/>
         

      </BrowserRouter>
     
      </ThemeProvider>
      

    </div>
    
  );
}



export default App;
