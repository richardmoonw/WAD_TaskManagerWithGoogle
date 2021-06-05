import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EditProject from './EditProject';
import { useMediaQuery } from 'react-responsive';
import { Card, Grid , Typography, CardContent, CardMedia} from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Definition of some important styles for the component
const useStyles = makeStyles(() => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  }
}));

const ProjectCard = (props) => {

  // Variable declarations to handle the state within the component
  const {id, title, date, description, image, flag, setFlag} = props;
  const[open, setOpen] = useState(false);
  const classes = useStyles();

  // Functions used to determine whether the app is run on a device with a large or
  // small screen
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1366px)'
  });

  const isTabletOrSmartphone = useMediaQuery({
      query: '(max-width: 1355px)'
  });

  // Function used to handle an existing project removal request
  const handleDelete = () => {
    axios.delete(`http://localhost:3001/projects/${id}`)
    .then(() => setFlag(!flag))
  }

  return (
    <>
      {/* The app is being run on a device with a large screen */}
      {isDesktopOrLaptop &&
        <Grid item md={4}>
          <Card className="card">
            <CardMedia
              className={classes.media}
              image={image}
            />
            <CardContent>
              <Link className="projectLink" to={`/projects/${id}/tasks`}>
                <Typography gutterBottom variant="h5" component="h2">
                  {title}
                </Typography>
              </Link>
              <Typography variant="h6" color="textSecondary">
                Start date: {date}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {description}
              </Typography>
            </CardContent>
            <button className="ticketButton" onClick={() => setOpen(true)}>EDIT</button>
            <button className="ticketButton" onClick={() => handleDelete()}>DELETE</button>
        </Card>
      </Grid>
      }

      {/* The app is being run on a device with a small screen */}
      {isTabletOrSmartphone &&
        <Grid item md={6} xs={12}>
          <Card className="card">
            <CardMedia
              className={classes.media}
              image={image}
            />
            <CardContent>
              <Link className="projectLink" to={`/projects/${id}/tasks`}>
                <Typography gutterBottom variant="h5" component="h2">
                  {title}
                </Typography>
              </Link>
              <Typography variant="h6" color="textSecondary">
                Start date: {date}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {description}
              </Typography>
            </CardContent>
            <button className="ticketButton" onClick={() => setOpen(true)}>EDIT</button>
            <button className="ticketButton" onClick={() => handleDelete()}>DELETE</button>
        </Card>
        </Grid>
      }

      {/* Edit project component reference. It is hidden by default, but if a user
      wants to edit a project and clicks the respective button, the change of the state 
      can make it visible */}
      <EditProject
        open={open}
        setOpen={setOpen}
        flag={flag}
        setFlag={setFlag}
        project={props}
      />
    </>
  );
}
export default ProjectCard;