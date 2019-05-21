import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import SwipeableViews from "react-swipeable-views";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

import UpIcon from "@material-ui/icons/KeyboardArrowUp";
import green from "@material-ui/core/colors/green";
import { Button, Paper, Toolbar, StepIcon } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import DoneIcon from "@material-ui/icons/Done";

function TabContainer(props) {
  const { children, dir } = props;

  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    position: "relative",
    minHeight: 200
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[600]
    }
  }
});

class FloatingActionButtonZoom extends React.Component {
  state = {
    value: 0,
    maxSwipe: 2
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  incrementSwipe = (event, value) => {
    //this.setState((value = this.state.value + 1));
    if (this.state.value < this.state.maxSwipe) {
      this.setState({ value: this.state.value + 1 });
    }

    console.log(this.state.value);
  };

  decrementSwipe = (event, value) => {
    //this.setState((value = this.state.value + 1));
    if (this.state.value > 0) {
      this.setState({ value: this.state.value - 1 });
    }

    console.log(this.state.value);
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;
    const transitionDuration = {
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen
    };

    const fabs = [
      {
        color: "primary",
        className: classes.fab,
        icon: <AddIcon />
      },
      {
        color: "secondary",
        className: classes.fab,
        icon: <EditIcon />
      },
      {
        color: "inherit",
        className: classNames(classes.fab, classes.fabGreen),
        icon: <DoneIcon />
      }
    ];

    return (
      <div className={classes.root}>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <Button onClick={this.decrementSwipe}>indietro</Button>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Button onClick={this.decrementSwipe}>indietro</Button>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Button onClick={this.decrementSwipe}>indietro</Button>
          </TabContainer>
        </SwipeableViews>

        {fabs.map((fab, index) => (
          <Zoom
            key={fab.color}
            in={this.state.value === index}
            timeout={transitionDuration}
            style={{
              transitionDelay: `${
                this.state.value === index ? transitionDuration.exit : 0
              }ms`
            }}
            unmountOnExit
          >
            <Fab
              className={fab.className}
              color={fab.color}
              onClick={this.incrementSwipe}
            >
              {fab.icon}
            </Fab>
          </Zoom>
        ))}
      </div>
    );
  }
}

FloatingActionButtonZoom.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(
  FloatingActionButtonZoom
);
