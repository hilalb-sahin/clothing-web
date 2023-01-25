import { Outlet, Link } from "react-router-dom"
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import "./navigation-styles.scss";

import { useContext } from "react";
import { UserContext } from "../../context/user.context";

import { signOutUser } from "../../utils/firebase/firebase-utils";

const Navigation = () => {
//whenever the value inside useContext updates, it rerenders it.
  const {currentUser } = useContext(UserContext);
  console.log(currentUser);

    return(
      <>
  
        <div className="navigation">
          <Link to='/' className="logo-container"><CrwnLogo /></Link>
          
          <div className="nav-links-container">
            
              {currentUser ?(
                <span onClick={signOutUser} className="nav-link">
                   SIGN OUT </span>
                ): (
                  <Link 
                  className="nav-link" to='/auth'>SIGN IN
                  </Link> 
                
              )}
            <Link className="nav-link" to='/shop'>SHOP</Link>

            
          </div>
        </div>
      <Outlet />
      </>
    
    )
  }

  export default Navigation;