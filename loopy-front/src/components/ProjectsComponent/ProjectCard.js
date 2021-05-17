import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EditProject from './EditProject';
import { useMediaQuery } from 'react-responsive';
import { Card, Grid , Typography, CardContent, CardMedia} from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  }
}));

const ProjectCard = (props) => {
  const {id, title, date, description, image, flag, setFlag} = props;
  const classes = useStyles();
  const[open, setOpen] = useState(false);

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1366px)'
  });

  const isTabletOrSmartphone = useMediaQuery({
      query: '(max-width: 1355px)'
  });

  const handleDelete = () => {
    axios.delete(`http://localhost:3001/projects/${id}`)
    .then(() => setFlag(!flag))
  }

  return (
    <>
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
              Due date: {date}
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
    {isTabletOrSmartphone &&
      <Grid item md={6} xs={12}>
        <Card className="card">
          {/* <Card.Title>{title}</Card.Title> */}
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
              Due date: {date}
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