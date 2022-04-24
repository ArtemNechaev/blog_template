import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import appRoutes from '../../lib/appRoutes';
import LogInMenu from './LogInMenu';
import { useAppDispatch, useAppSelector } from '../../store/index'
import { actionCreators } from '../../store/drawer'



export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  handleChange: (event: React.ChangeEvent<{}>, newValue: number) => void,
  currentPage: number,
  activeDrawer: boolean
}

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    tab: {
      fontWeight: "bolder",
      color: '#fff'
    }
  }))
const DesctopMenu: React.FC<MenuProps> = (props) => {
  const styles = useStyle();

  const { handleChange, currentPage, activeDrawer, ...rest } = props
  const dispatch = useAppDispatch();

  return (
    <div {...rest}>
      <AppBar position="fixed" className={styles.appBar} >
        <Toolbar>
          {activeDrawer && <IconButton edge="start" onClick={() => dispatch(actionCreators.setDesctop())}>
            <MenuIcon />
          </IconButton>}
          <Tabs
            value={currentPage === -1 ? false : currentPage}
            onChange={handleChange}
            aria-label="Меню"
            className={styles.grow}
          >
            {appRoutes.public.map((item, index) =>
              <Tab key={index} label={item.label} className={styles.tab} />
            )}
          </Tabs>
          <LogInMenu />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  )

}

export default DesctopMenu;