import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { AiFillGoogleCircle } from 'react-icons/ai';
import './Login.css'
import Logo from '../../assets/logo.webp';
import MobileImage from '../../assets/index_image.webp';
import DesktopImage from '../../assets/index_image_desktop.webp';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import { GoogleLogin } from 'react-google-login';


const Login = () => {
  const [ logged, setLogged ] = useState(false);
  const isDesktopOrLaptop = useMediaQuery({
    minDeviceWidth: 1366
  });

  const isTabletOrSmartphone = useMediaQuery({
    maxDeviceWidth: 1365
  });

  const handleLogin = async googleData => {
    console.log(googleData)
    const res = await fetch("/api/v1/auth/google", {
        method: "POST",
        body: JSON.stringify({
        token: googleData.tokenId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    // store returned user somehow
  }

  const handleFailure = (response) => {
    console.log("Error")
  }
  
  return (
    <>
      { isDesktopOrLaptop && 
      <div className="desktopContainerLogin">
      { logged && console.log("Se arma") }
        <Grid container spacing={3}>
          <Grid item md={2} lg={2} xl={2}>
            <img className="desktopLogo" src={Logo} alt="loopy"></img>
          </Grid>
        </Grid>
        <Grid className="desktopContentContainer" container spacing={3}>
          <Grid className="leftColumn" item md={7} lg={7} xl={7}>
            <img className="desktopImage" src={DesktopImage} alt="management"></img>
          </Grid>
          <Grid className="rightColumn" item md={4} lg={4} xl={4}>
            <p className="desktopTitle">Convierte tus proyectos en algo realmente mágico.</p> 
            <p className="desktopSubtitle">¿Por qué elegirnos?</p>
            <p className="desktopText">Somos una solución increíblemente fácil, flexible e intuitiva para administrar tus proyectos. 
              Haz que tu gestión sea una tarea mucho más fácil con loopy.
            </p>
            {/* <button onClick={() => HandleLogin()} className="desktopLoginButton">
              <AiFillGoogleCircle className="mobileLoginButtonIcon" size="2em"/><span className="mobileLoginButtonText">SIGN IN WITH GOOGLE</span>
            </button> */}
            <GoogleLogin
              clientId={"868449691994-qs07uckaki4h1r630hphiliaua6ucuq0.apps.googleusercontent.com"}
              buttonText={"Login with Google"}
              onSuccess={handleLogin}
              onFailure={handleFailure} 
              cookiePolicy={'single_host_origin'}
            />
            
            <p className="mobileContact">Síguenos en <span className="mobileUser">@loopy</span> para más información</p>  
          </Grid> 
        </Grid>
      </div>
      }

      {/* Mobile design */}
      { isTabletOrSmartphone &&
      <div>
        <div className="mobileContainer">
          <Grid container spacing={3}>
            <Grid item xs={6} sm={6}>
              <img className="mobileLogo" src={Logo} alt="loopy"></img>
            </Grid>
          </Grid>
          <p className="mobileTitle">Convierte tus proyectos en algo realmente mágico.</p> 
        </div>
        
        <img className="mobileImage" src={MobileImage} alt="management"></img>
          <div className="mobileContainer">
            <p className="mobileSubtitle">¿Por qué elegirnos?</p>
            <p className="mobileText">Somos una solución increíblemente fácil, flexible e intuitiva para administrar tus proyectos. 
              Haz que tu gestión sea una tarea mucho más fácil con loopy.
            </p>
            {/* <button onClick={() => HandleLogin()} className="mobileLoginButton">
              <AiFillGoogleCircle className="mobileLoginButtonIcon" size="2em"/><span className="mobileLoginButtonText">SIGN IN WITH GOOGLE</span>
            </button> */}
            <p className="mobileContact">Síguenos en <span className="mobileUser">@loopy</span> para más información</p>
        </div>
      </div>
      }
    </>
  );
}

export default Login;
