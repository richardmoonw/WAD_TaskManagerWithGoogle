import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import Navbar from '../NavbarComponent/Navbar';
import { IoAddOutline } from "react-icons/io5";
import { Grid, IconButton } from '@material-ui/core';
import './Projects.css';
import ProjectCard from './ProjectCard';
import AddProject from './AddProject';
import Logo from '../../assets/index_image.webp';
import axios from 'axios';

const Projects = ({userId}) => {

  // Variable declarations to handle the state within the component
  const[open, setOpen] = useState(false);
  const[flag, setFlag] = useState(false);
  const[projects, setProjects] = useState([]);
  
  // Functions used to determine whether the app is run on a device with a large or
  // small screen
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1366px)'
  });
  
  const isTabletOrSmartphone = useMediaQuery({
    query: '(max-width: 1355px)'
  });
  
  // Function used to handle the projects retrieving request for a given user
  useEffect(() => {
    axios.get("http://localhost:3001/projects", 
    {
      params: {
        userId: userId
      }
    })
    .then(response => setProjects(response.data))
    .catch(resp => console.log(resp))
  }, [flag]);
  
  return(
    <>
      {/* The app is being run on a device with a large screen */}
      { isDesktopOrLaptop && 
        <div className="desktopContainer">
          <Navbar module="projects" />
          <div className="columnsContainer">
            <Grid container>
              <Grid item md={1}></Grid>
              <Grid item md={10}>
                <Grid container>
                  <Grid item md={11}>
                    <p className="title">Projects</p>
                  </Grid>
                  <Grid className="centeredContainer" item md={1}>
                    <IconButton className="addButton" onClick={() => setOpen(true)}>
                      <IoAddOutline />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  {
                    // For each existing project for a given user, display a card with its 
                    // corresponding information
                    projects.map(project => {
                      return (
                        <ProjectCard 
                          key={project.id} 
                          id={project._id} 
                          title={project.name} 
                          description={project.description} 
                          date={project.start_at.slice(0,10)} 
                          image={Logo} 
                          flag={flag} 
                          setFlag={setFlag}
                        />
                      );
                    })
                  }
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      }

      {/* The app is being run on a device with a small screen */}
      { isTabletOrSmartphone && 
        <>
          <Navbar module="projects" />
            <div className="mobileBackgroundComponent">
              <div className="mobileProjectsComponent">
                <Grid container>
                  <Grid item xs={11}>
                    <p className="title">Projects</p>
                  </Grid>
                  <Grid className="centeredContainer" item xs={1}>
                    <IconButton className="addButton" onClick={() => setOpen(true)}>
                      <IoAddOutline />
                    </IconButton>
                  </Grid>
                  <Grid spacing={2} container>
                    {
                      // For each existing project for a given user, display a card with its 
                      // corresponding information
                      projects.map(project => {
                        return (
                          <ProjectCard 
                            key={project.id} 
                            id={project.id} 
                            title={project.name} 
                            description={project.description} 
                            date={project.start_at.slice(0,10)} 
                            image={Logo} 
                            flag={flag} 
                            setFlag={setFlag}
                          />
                        )
                      })
                    }
                  </Grid>
                </Grid>
              </div>
            </div>
        </>
      }
          
      {/* Add project component reference. It is hidden by default, but if a user
      wants to add a project and clicks the respective button, the change of the state 
      can make it visible */}
      <AddProject
        open={open}
        setOpen={setOpen}
        flag={flag}
        setFlag={setFlag}
        userId={userId}>
      </AddProject>
    </>
  )
}

export default Projects;