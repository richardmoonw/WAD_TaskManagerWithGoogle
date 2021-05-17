import React, { useState } from 'react';
import 'date-fns';
import './Tasks.css';
import { Dialog, DialogContent, Button, Grid, IconButton, TextField, DialogTitle } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { GrClose } from "react-icons/gr";
import { IoCreateOutline } from "react-icons/io5";
import DropMenu from './DropMenu';
import axios from 'axios';

const priorityItems = ['High', 'Medium', 'Low']
const statusItems = ['Backlog', 'Selected for development', 'In progress', 'Done']

const CreateTicket = ({ open, setOpen, flag, setFlag, project_id }) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('High');
  const [status, setStatus] = useState('Backlog');
  const [date, setDate] = useState(new Date());

  const close = () => {
    setOpen(false);
  }

  const handleCreate = () => {
    axios.post(`http://localhost:3001/projects/${project_id}/tasks`, {
      task: {
        name: title,
        description: description,
        status: status,
        priority: priority,
        end_at: date,
        project_id: project_id
      }
    })
    .then(response => {
      setFlag(!flag)
      setOpen(!open)
    })
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
            <IoCreateOutline className="title titleVariant1"/>
          </Grid>
          <Grid item xs={12} md={12}>
            <p className="title titleVariant1">Create Ticket</p>
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
            <Button onClick={() => handleCreate()} className="optionButton" variant="contained" color="secondary">Create</Button>
          </Grid>
          <Grid className="centeredContainer" item xs={5} md={4}>
            <Button className="optionButton" onClick={close} variant="contained">Cancel</Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTicket;