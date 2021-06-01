import React, { useState } from 'react';
import './Navbar.css';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { Grid, Button, IconButton, Menu, MenuItem } from '@material-ui/core';
import { AiOutlineAppstore } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import Logo from '../../assets/logo.webp';

const Navbar = ({ userId, module }) => {

  const handleLogout = async googleData => {
    const res = await fetch("/api/v1/auth/google/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    handleClose();
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const isDesktopOrLaptop = useMediaQuery({
    minDeviceWidth: 1366
  });

  const isTabletOrSmartphone = useMediaQuery({
    maxDeviceWidth: 1365
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return(
    <>
      { isDesktopOrLaptop && 
        <Grid className="navbarContainer" container>
          {/* Empty space at the left */}
          <Grid item md={1}></Grid>

          {/* Brand container */}
          <Grid item md={11}>
            <Grid className="topPanel" container>
              <Grid item md={1}>
                <img className="logo" src={Logo} alt="loopy"></img>
              </Grid>
              <Grid item md={5}></Grid>
              <Grid className="buttonContainer" item md={5}>
                { module === "tasks" &&
                    <Link 
                      className="formattedLink" 
                      to={{ pathname: "/projects", state: { userId: userId } }}>
                      <Button
                        className="navbarButton" 
                        variant="contained"
                        color="primary"
                        startIcon={<AiOutlineAppstore className="buttonIcon" />}
                        >Projects</Button>
                    </Link>
                }
                <Link className="formattedLink" to="/">
                  <Button 
                    className="navbarButton" 
                    variant="contained"
                    color="secondary"
                    onClick={() => handleLogout()}
                    startIcon={<FiLogOut className="buttonIcon" />}
                    >Sign Out</Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      }

      { isTabletOrSmartphone &&
        <Grid className="mobileNavbarContainer" container>
          <Grid item xs={3}>
            <img className="logo" src={Logo} alt="loopy"></img>
          </Grid>
          <Grid item xs={8}></Grid>
          <Grid className="routesContainer" item xs={1}>
            <IconButton
              onClick={handleClick}
            >
              <BiMenu />
            </IconButton>
            <Menu
              open={open}
              anchorEl={anchorEl}
              keepMounted
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                { module === "tasks" &&
                <Link className="mobileFormattedLink" to="/projects">
                  <AiOutlineAppstore className="mobileRouteIcon"/>
                  Projects
                </Link>
                }
              </MenuItem>
              <MenuItem onClick={() => handleLogout()}>
                <Link className="mobileFormattedLink" to="/">
                <FiLogOut className="mobileRouteIcon"/>
                 Sign Out
                </Link>
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      }
    </>
  );
}

export default Navbar;