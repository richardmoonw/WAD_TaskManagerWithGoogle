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

  const { id } = useParams();

  const[status, setStatus] = useState("backlog")
  const[tickets, setTickets] = useState([])
  const[open, setOpen] = useState(false);
  const[flag, setFlag] = useState(false);
  const[project, setProject] = useState("");

  const isDesktopOrLaptop = useMediaQuery({
    minDeviceWidth: 1366
  });

  const isTabletOrSmartphone = useMediaQuery({
    maxDeviceWidth: 1365
  });

  const handleStatus = (event) => {
    setStatus(event.target.value);
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/projects/${id}`)
    .then(response => setProject(response.data))
    .catch(response => console.log(response))
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3001/projects/${id}/tickets`)
    .then(response => {
      console.log(response.data)
      setTickets(response.data)
    })
    .catch(response => console.log(response))
  }, [flag]);

  return (
    <>
      { isDesktopOrLaptop &&
        <div className="desktopContainer">
          <Navbar module="tasks" />
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

              {/* Columns */}
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

      {/* Mobile design */}
      { isTabletOrSmartphone && 
        <>
          <Navbar module="tasks" />
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
                { status==="backlog" &&
                  <Column
                    col_title='Backlog'
                    color="#969696"
                    tickets={tickets.filter(ticket => ticket.status === "Backlog")}
                    project_id={id}
                    flag={flag}
                    setFlag={setFlag}
                  />
                }
                { status==="dev" &&
                  <Column
                    col_title='Selected for development'
                    color="#8c8eff"
                    tickets={tickets.filter(ticket => ticket.status === "Selected for development")}
                    project_id={id}
                    flag={flag}
                    setFlag={setFlag}
                  ></Column>
                }
                { status==="doing" &&
                  <Column
                    col_title='In progress'
                    color="#ff8c90"
                    tickets={tickets.filter(ticket => ticket.status === "In progress")}
                    project_id={id}
                    flag={flag}
                    setFlag={setFlag}
                  ></Column>
                }
                { status==="done" &&
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

