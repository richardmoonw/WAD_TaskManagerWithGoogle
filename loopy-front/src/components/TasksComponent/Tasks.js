import React, { useState, useEffect } from 'react';
import Column from './Column';
import Navbar from '../NavbarComponent/Navbar';
import { FormControl, Grid, IconButton, MenuItem, InputLabel, Select } from '@material-ui/core';
import { IoAddOutline } from "react-icons/io5";
import './Tasks.css';
import { useMediaQuery } from 'react-responsive';
import CreateTicket from './CreateTicket';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Tasks = () => {

  // Get the id param of the URL. That property represents the id of the project which the
  // tickets belong to
  const { id } = useParams();

  // Variable declarations to handle the state within the component
  const[status, setStatus] = useState("backlog")
  const[tickets, setTickets] = useState([])
  const[open, setOpen] = useState(false);
  const[flag, setFlag] = useState(false);
  const[project, setProject] = useState("");

  // Functions used to determine whether the app is run on a device with a large or
  // small screen
  const isDesktopOrLaptop = useMediaQuery({
    minDeviceWidth: 1366
  });

  const isTabletOrSmartphone = useMediaQuery({
    maxDeviceWidth: 1365
  });

  // Function used to change the status of a given ticket. This allows to change the
  // ticket to the new status category without needing to wait the response from the 
  // backend
  const handleStatus = (event) => {
    setStatus(event.target.value);
  };

  // Function used to handle a specific project retrieving request
  useEffect(() => {
    axios.get(`http://localhost:3001/projects/${id}`)
    .then(response => setProject(response.data))
    .catch(response => console.log(response))
  }, []);

  // Function used to handle the tickets retrieving request for a specific project
  useEffect(() => {
    axios.get(`http://localhost:3001/projects/${id}/tickets`)
    .then(response => setTickets(response.data))
    .catch(response => console.log(response))
  }, [flag]);

  return (
    <>
      
      {/* The app is being run on a device with a large screen */}
      { isDesktopOrLaptop &&
        <div className="desktopContainer">
          <Navbar module="tasks" userId={project.userId} />
          <Grid className="columnsContainer" container>
            <Grid item md={1}></Grid>
            <Grid item md={10}>
              <Grid container>
                <Grid item md={11}>
                  <p className="title">{project.name}</p>
                </Grid>
                <Grid className="centeredContainer" item md={1}>
                  <IconButton className="addButton" onClick={() => setOpen(true)}>
                    <IoAddOutline />
                  </IconButton>
                </Grid>
              </Grid>

              {/* Columns section */}
              <Grid container spacing={3}>

                {/* Backlog column */}
                <Column
                  col_title='Backlog'
                  color="#969696"
                  tickets={tickets.filter(ticket => ticket.status === "Backlog")}
                  project_id={id}
                  flag={flag}
                  setFlag={setFlag}
                ></Column>

                {/* Dev column */}
                <Column
                  col_title='Selected for development'
                  color="#8c8eff"
                  tickets={tickets.filter(ticket => ticket.status === "Selected for development")}
                  project_id={id}
                  flag={flag}
                  setFlag={setFlag}
                ></Column>

                {/* In progress column */}
                <Column
                  col_title='In progress'
                  color="#ff8c90"
                  tickets={tickets.filter(ticket => ticket.status === "In progress")}
                  project_id={id}
                  flag={flag}
                  setFlag={setFlag}
                ></Column>

                {/* Done column */}
                <Column
                  col_title='Done'
                  color="#63db81"
                  tickets={tickets.filter(ticket => ticket.status === "Done")}
                  project_id={id}
                  flag={flag}
                  setFlag={setFlag}
                ></Column>
              </Grid>
            </Grid>
          </Grid>
        </div>
      }

      {/* The app is being run on a device with a small screen */}
      { isTabletOrSmartphone && 
        <>
          <Navbar module="tasks" id={id} />
          <div className="mobileBackgroundComponent">
            <div className="mobileTasksComponent">
              <Grid container>
                <Grid item xs={11}>
                  <p className="title">{project.name}</p>
                </Grid>
                <Grid style={{textAlign: "right"}} item xs={1}>
                  <IconButton className="addButton" onClick={() => setOpen(true)}>
                    <IoAddOutline />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                  <FormControl className="statusPicker">
                    <InputLabel shrink id="status-label">Status</InputLabel>
                    <Select
                      labelId="status-label"
                      value={status}
                      onChange={handleStatus}
                    >
                      <MenuItem value="backlog">Backlog</MenuItem>
                      <MenuItem value="dev">Selected for dev</MenuItem>
                      <MenuItem value="doing">Doing</MenuItem>
                      <MenuItem value="done">Done</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container>
                { 
                  // The current selected status is backlog
                  status==="backlog" &&
                  <Column
                    col_title='Backlog'
                    color="#969696"
                    tickets={tickets.filter(ticket => ticket.status === "Backlog")}
                    project_id={id}
                    flag={flag}
                    setFlag={setFlag}
                  />
                }
                { 
                  // The current selected status is dev
                  status==="dev" &&
                  <Column
                    col_title='Selected for development'
                    color="#8c8eff"
                    tickets={tickets.filter(ticket => ticket.status === "Selected for development")}
                    project_id={id}
                    flag={flag}
                    setFlag={setFlag}
                  ></Column>
                }
                { 
                  // The current selected status is doing
                  status==="doing" &&
                  <Column
                    col_title='In progress'
                    color="#ff8c90"
                    tickets={tickets.filter(ticket => ticket.status === "In progress")}
                    project_id={id}
                    flag={flag}
                    setFlag={setFlag}
                  ></Column>
                }
                { 
                  // The current selected status is done
                  status==="done" &&
                  <Column
                    col_title='Done'
                    color="#63db81"
                    tickets={tickets.filter(ticket => ticket.status === "Done")}
                    project_id={id}
                    flag={flag}
                    setFlag={setFlag}
                  ></Column>
                }
              </Grid>
            </div>
          </div>   
        </>
      }

      {/* Create ticket component reference. It is hidden by default, but if a user
      wants to add a ticket and clicks the respective button, the change of the state 
      can make it visible */}
      <CreateTicket
        open={open}
        setOpen={setOpen}
        flag={flag}
        setFlag={setFlag}
        project_id={id}
      >
      </CreateTicket>
    </>
  );
}

export default Tasks;

