import React, { useState } from 'react';
import './Tasks.css';
import { Grid, Card, CardContent } from '@material-ui/core';
import EditTicket from './EditTicket';
import axios from 'axios';

const Ticket = (props) => {
  const [open, setOpen] = useState(false)
  
  const HandleDeletion = () => {
    axios.delete(`http://localhost:3001/projects/${props.ticket.project_id}/tasks/${props.ticket.id}`)
    .then(response => {
      props.setFlag(!props.flag);
    })
    .catch(error => console.log(error));
  }

  return(
    <>
      <Card className="ticketContainer">
        <CardContent>

          {/* Header */}
          <Grid container alignItems='center'>
            <Grid item xs={5} md={5}>
              <span className="ticketField">ID-{props.ticket.id}</span>
            </Grid>
            <Grid container item xs={7} md={7} alignItems="center" justify="flex-end">
              <Grid item>
                <button onClick={() => setOpen(true)} className="ticketButton">EDIT</button>
              </Grid>
              <Grid item>
                <button onClick={() => HandleDeletion()} className="ticketButton">DELETE</button>
              </Grid>
            </Grid>

            {/* Ticket title */}
            <p className="ticketTitle">{props.ticket.name}</p>
            

            {/* Priority, description and date */}
            <p className="ticketDescription">{props.ticket.description}</p>

            <Grid container>
              <Grid item xs={3} md={3}>
                { props.ticket.priority === "High" &&
                  <p className="highPriorityLabel">High</p>
                }
                { props.ticket.priority === "Medium" &&
                  <p className="mediumPriorityLabel">Medium</p>
                }
                { props.ticket.priority === "Low" &&
                  <p className="lowPriorityLabel">Low</p>
                }
              </Grid>
              <Grid item xs={9} md={9}>
                <p className="ticketDueDate"><span className="ticketField ticketDate">DUE DATE:</span> {props.ticket.end_at.slice(0,10)}</p>
              </Grid>
            </Grid>
          </Grid>


        </CardContent>
      </Card>

      <EditTicket
        open={open}
        setOpen={setOpen}
        ticket={props.ticket}
        flag={props.flag}
        setFlag={props.setFlag}
      />
    </>
  );
}

export default Ticket;