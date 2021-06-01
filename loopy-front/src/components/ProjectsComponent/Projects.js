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
  const[open, setOpen] = useState(false);
  const[flag, setFlag] = useState(false);
  const[projects, setProjects] = useState([]);
  
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1366px)'
  });
  
  const isTabletOrSmartphone = useMediaQuery({
    query: '(max-width: 1355px)'
  });
  
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
    {/* Mobile design */}
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