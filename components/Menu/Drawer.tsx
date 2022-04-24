import React, { Fragment } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Hidden from '@material-ui/core/Hidden'
import { Button, Collapse, IconButton } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { useAppDispatch, useAppSelector } from '../../store/index'
import { actionCreators, DrawerData } from '../../store/drawer'

interface Data {
  name: string,
  posts: {}
}
const drawerWidth = 230;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('md')]: {
        flexShrink: 0,
        width: drawerWidth
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    level_2: {
      marginLeft: 10
    }
  }),
);

export default function ClippedDrawer() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const drawerState = useAppSelector(state => state.drawer);
  const { desctopOpen, mobileOpen, data } = drawerState;

  const handleDrawerToggle = (openMobile: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    dispatch(actionCreators.setMobile())
  };

  const recurs = <T extends {}>({tree, mapper} : DrawerData<T>) => (
    tree?.map((theme, index) => {
      return (
        <Fragment>
          <ListItem button key={index}>
            <ListItemText>{theme[mapper?.level_0]}</ListItemText>
          </ListItem>
          <Collapse in={true}>
            {theme[mapper?.level_1]?.map((post) => {
              return (
                <List key={post['id']} disablePadding component='div' className={classes.level_2}>
                  <ListItem button key={post['id']} >
                    <ListItemText> {post[mapper.level_2]}</ListItemText>
                  </ListItem>
                </List>
              )
            })}
          </Collapse>
        </Fragment>
      )
    })

  )
  const drawer = (
    <div className={classes.drawerContainer}>
      <List>
        {recurs(data)}
      </List>
    </div>
  );

  return (
    <nav className={clsx({ [classes.drawer]: desctopOpen })}>
      <Hidden smUp implementation="css">
        <SwipeableDrawer
          open={mobileOpen}
          onClose={handleDrawerToggle(false)}
          onOpen={handleDrawerToggle(true)}
          classes={{
            paper: classes.drawerPaper,
          }}
        > <div>
            <IconButton onClick={handleDrawerToggle(false)}>
              <ChevronLeftIcon />
            </IconButton>
            {drawer}
          </div>
        </SwipeableDrawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          variant="persistent"
          classes={{
            paper: classes.drawerPaper,
          }}
          open={desctopOpen}
        >
          <Toolbar />
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}
