import React, { useState } from 'react';
import 'date-fns';
import './Projects.css';
import { Dialog, DialogContent, Button, Grid, IconButton, TextField, DialogTitle } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { GrClose } from "react-icons/gr";
import { IoCloudUploadOutline } from "react-icons/io5";
import axios from 'axios';

const EditProject = ({ open, setOpen, flag, setFlag, project }) => {

  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [date, setDate] = useState(project.date);

  const close = () => {
    setOpen(false);
  }

  const handleUpdate = () => {
    axios.put(`http://localhost:3001/projects/${project.id}`, {
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
                <IoCloudUploadOutline className="title titleVariant2"/>
            </Grid>
            <Grid item xs={12} md={12}>
                <p className="title titleVariant2">Update Project</p>
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
              inputProps={{ maxLength: 120 }}
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
                id="degin_date"
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
            <Button className="optionButton" onClick={() => handleUpdate()} variant="contained" color="primary">Update</Button>
          </Grid>
          <Grid className="centeredContainer" item xs={5} md={4}>
            <Button className="optionButton" onClick={close} variant="contained">Cancel</Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default EditProject;