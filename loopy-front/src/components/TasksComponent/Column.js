import React from 'react';
import './Tasks.css'
import { useMediaQuery} from 'react-responsive';
import Ticket from './Ticket';
import { Grid } from "@material-ui/core";
import { VscDebugBreakpointLog } from "react-icons/vsc";

const Column = (props) => {

  // Functions used to determine whether the app is run on a device with a large or
  // small screen
  const isDesktopOrLaptop = useMediaQuery({
    minDeviceWidth: 1366
  });

  const isTabletOrSmartphone = useMediaQuery({
    maxDeviceWidth: 1365
  });

  return(
    <>
      {/* The app is being run on a device with a large screen */}
      { isDesktopOrLaptop && 
      <Grid item md={3}>
        <Grid className="columnContainer" container>
          <Grid className="columnHeader" item md={12}>
            <VscDebugBreakpointLog style={{ color: props.color }}></VscDebugBreakpointLog>
            <span className="columnTitle">{props.col_title}: {props.tickets.length}</span>
          </Grid>
        </Grid>
        <Grid item md={12}>
          { 
            // For each existing ticket in a given project, display a Ticket component with its 
            // corresponding information
            props.tickets.map(ticket => {
              return(
                <Ticket
                key={ticket.id}
                ticket={ticket}
                flag={props.flag}
                setFlag={props.setFlag}
                />
              )
            })
          }
        </Grid>
      </Grid>
      }

      {/* The app is being run on a device with a small screen */}
      { isTabletOrSmartphone &&
      <Grid className="mobileTicketsContainer" item xs={12}>
        <Grid item xs={12}>
          { 
            // For each existing ticket in a given project, display a Ticket component with its 
            // corresponding information
            props.tickets.map(ticket => {
              return(
                <Ticket
                  key={ticket.id}
                  ticket={ticket}
                  flag={props.flag}
                  setFlag={props.setFlag}
              />
              )
            })
          }
        </Grid>
      </Grid>
      }
    </>
  );
}

export default Column;