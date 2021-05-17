import React, { useState } from 'react';
import 'date-fns';
import './Projects.css';
import { Dialog, DialogContent, Button, Grid, IconButton, TextField, DialogTitle } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { GrClose } from "react-icons/gr";
import { IoCreateOutline } from "react-icons/io5";
import axios from 'axios';

const AddProject = ({ open, setOpen, flag, setFlag }) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());

  const close = () => {
    setOpen(false);
  }

  const handleAddition = () => {
    axios.post('http://localhost:3001/projects', {
      project: {
        name: title,
        description: description,
        start_at: date
      }
    })
    .then(() => {
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
            <p className="title titleVariant1">Create Project</p>
          </Grid>
        </Grid>
      </DialogTitle>

      {/* Content section */}
      <DialogContent className="formattedDialogContent">
        <Grid container>
          <Grid item xs={12} md={12}>
            <p className="fieldInformation">PROJECT INFORMATION</p>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField className="formattedTextField"
              id="title"
              label="Project Name"
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
              inputProps={{ maxLength: 600 }}
              multiline
              rows={2}
              value={description}
              onChange={e => setDescription(e.target.value)}  
            />
          </Grid>
          <Grid item xs={11} md={4}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                id="begin_date"
                label="Begin Date"
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
            <Button className="optionButton" onClick={() => handleAddition()} variant="contained" color="secondary">Create</Button>
          </Grid>
          <Grid className="centeredContainer" item xs={5} md={4}>
            <Button className="optionButton" onClick={close} variant="contained">Cancel</Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default AddProject;