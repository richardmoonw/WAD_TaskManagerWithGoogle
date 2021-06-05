import React, { useState } from 'react';
import 'date-fns';
import './Tasks.css';
import { Dialog, DialogContent, Button, Grid, IconButton, TextField, DialogTitle } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { GrClose } from "react-icons/gr";
import { IoCloudUploadOutline } from "react-icons/io5";
import DropMenu from './DropMenu';
import axios from 'axios';

// Definition of the different elements for the priority and status fields of a ticket
const priorityItems = ['High', 'Medium', 'Low']
const statusItems = ['Backlog', 'Selected for development', 'In progress', 'Done']

const EditTicket = ({ open, setOpen, ticket, flag, setFlag }) => {

  // Variable declarations to handle the state within the component
  const [title, setTitle] = useState(ticket.name);
  const [description, setDescription] = useState(ticket.description);
  const [priority, setPriority] = useState(priorityItems.find(x => x === ticket.priority));
  const [status, setStatus] = useState(statusItems.find(x => x === ticket.status));
  const [date, setDate] = useState(ticket.end_at);

  // Function used to handle a given ticket update request
  const handleUpdate = () => {
    axios.put(`http://localhost:3001/projects/${ticket.project_id}/tickets/${ticket._id}`, {
      ticket: {
        name: title,
        description: description,
        priority: priority,
        status: status,
        end_at: date
      }
    })
    .then(() => {
      setFlag(!flag)
      setOpen(!open)
    })
  }

  // Function used to close the modal containing the elements for the
  // ticket update
  const close = () => {
    setOpen(false);
  }

  return (
    <Dialog open={open} onClose={close} maxWidth='sm'>

      {/* Header section */}
      <DialogTitle className="titleContainer">
        <Grid container>
          <Grid item xs={11} md={11}></Grid>
          <Grid className="centeredContainer" item xs={1} md={1}>
            <IconButton onClick={close}>
              <GrClose />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={12}>
            <IoCloudUploadOutline className="title titleVariant2"/>
          </Grid>
          <Grid item xs={12} md={12}>
            <p className="title titleVariant2">Update Ticket</p>
          </Grid>
        </Grid>
      </DialogTitle>

      {/* Content section */}
      <DialogContent className="formattedDialogContent">
        <Grid container>
          <Grid item xs={12} md={12}>
            <p className="fieldInformation">TICKET INFORMATION</p>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField className="formattedTextField"
              id="title"
              label="Name"
              variant="outlined"
              inputProps={{ maxLength: 120 }}
              value={title}
              onChange={e => setTitle(e.target.value)}  
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField className="formattedTextField"
              id="description"
              label="Description"
              variant="outlined"
              inputProps={{ maxLength: 120 }}
              multiline
              rows={2}
              value={description}
              onChange={e => setDescription(e.target.value)}  
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <DropMenu className="formattedDropdown" title="Priority" items={priorityItems} value={priority} setValue={setPriority}/>
          </Grid>
          <Grid item xs={12} md={4}>
            <DropMenu className="formattedDropdown" title="Status" items={statusItems}  value={status} setValue={setStatus}/>
          </Grid>
          <Grid item xs={11} md={4}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                id="due_date"
                label="Due Date"
                value={date}
                onChange={setDate}
                className="formattedDatePicker"
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={1} md={2}></Grid>
          <Grid className="centeredContainer" item xs={5} md={4}>
            <Button onClick={() => handleUpdate()} className="optionButton" variant="contained" color="primary">Update</Button>
          </Grid>
          <Grid className="centeredContainer" item xs={5} md={4}>
            <Button className="optionButton" variant="contained" onClick={close}>Cancel</Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default EditTicket;