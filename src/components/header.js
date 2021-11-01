import { Switch } from "@mui/material";
import { useContext, useEffect  } from "react";
import { NavLink} from "react-router-dom";



const Header = (props) =>{

  

 

 

    return(
      <div className="container-fluid">
      <header className="d-flex justify-content-center py-3" style={{border: '1px solid rgba(0, 0, 0, 0.03)'}} >
        <ul className="nav nav-pills">

        <a class="navbar-brand"  ><b>MiniProject</b></a>

          <li className="nav-item">
            <NavLink
              to="/login"
              activeClassName="active"
              className="nav-link"
              aria-current="page"
            >
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/signup" activeClassName="active" className="nav-link">
              Signup
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/addblog" activeClassName="active" className="nav-link">
              Add Blog
            </NavLink>
          </li>  <li className="nav-item">
            <NavLink to="/browseblog" activeClassName="active" className="nav-link">
              Browse Blog
            </NavLink>
          </li>
         
          

  <li className="nav-item">
            <Switch
              checked={props.lightTheme}
              onChange={(e) => props.setLightTheme(e.target.checked)}
            ></Switch>
          </li>
        </ul>
      </header>
    </div>
    )
}
export default Header;
