import React from 'react';
import './Tasks.css'
import { useMediaQuery} from 'react-responsive';
import Ticket from './Ticket';
import { Grid } from "@material-ui/core";
import { VscDebugBreakpointLog } from "react-icons/vsc";

const Column = (props) => {

  const isDesktopOrLaptop = useMediaQuery({
    minDeviceWidth: 1366
  });

  const isTabletOrSmartphone = useMediaQuery({
    maxDeviceWidth: 1365
  });

  return(
    <>
      { isDesktopOrLaptop && 
        <Grid item md={3}>
          <Grid className="columnContainer" container>
            <Grid className="columnHeader" item md={12}>
              <VscDebugBreakpointLog style={{ color: props.color }}></VscDebugBreakpointLog>
              <span className="columnTitle">{props.col_title}: {props.tickets.length}</span>
            </Grid>
          </Grid>

          {/* Tickets */}
          <Grid item md={12}>
            { props.tickets.map(ticket => {
              return(
                <Ticket
                key={ticket.id}
                ticket={ticket}
                flag={props.flag}
                setFlag={props.setFlag}
                />
                )
              })}
          </Grid>
        </Grid>
      }
      { isTabletOrSmartphone &&
        <Grid className="mobileTicketsContainer" item xs={12}>

          {/* Tickets */}
          <Grid item xs={12}>
            { props.tickets.map(ticket => {
              return(
                <Ticket
                  key={ticket.id}
                  ticket={ticket}
                  flag={props.flag}
                  setFlag={props.setFlag}
                />
                )
              })}
          </Grid>
        </Grid>
      }
    </>
  );
}

export default Column;