import React, { ReactNode, useCallback, } from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import DesctopMenu from "./Menu/DesctopMenu";
import Drawer from './Menu/Drawer';
import MobileMenu from './Menu/MobileMenu';
import { useRouter } from "next/router";
import appRoutes from '../lib/appRoutes';
import Toolbar from '@material-ui/core/Toolbar'
import { Button } from "@material-ui/core";
import { useAppSelector } from "../store";

type Props = {
  children: ReactNode;
};
const useStyle = makeStyles((theme: Theme) => createStyles({
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    }

  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    display: 'flex'
  },
}))

const Layout: React.FC<Props> = (props) => {
  const classes = useStyle()
  const router = useRouter();
  const pageId = appRoutes.public.findIndex(item => item.href === router.pathname)

  const handleChange = useCallback((event: React.ChangeEvent<{}>, newValue: number) => {
    if (newValue === -1) {
      return;
    }
    router.push(appRoutes.public[newValue].href)
  }, [appRoutes]);

  const needDrawer = useAppSelector(state => state.drawer.active)
  const menuProps = {
    currentPage: pageId,
    handleChange: handleChange,
    activeDrawer: needDrawer,
  }

  return (
    < React.Fragment >
      <DesctopMenu
        className={classes.sectionDesktop}
        {...menuProps}
      />
      <div className={classes.content}>
        {needDrawer && <Drawer />}
        {props.children}
      </div>
      <MobileMenu
        className={classes.sectionMobile}
        {...menuProps}
      />
    </React.Fragment >
  )
}

export default Layout;
