import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import SchoolIcon from '@material-ui/icons/School'
import ExtentionIcon from '@material-ui/icons/Extension'
import { AppBar } from '@material-ui/core';

import appRoutes from '../../lib/appRoutes';
import { MenuProps } from './DesctopMenu';
import { useAppDispatch} from '../../store/index'
import { actionCreators } from '../../store/drawer'
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        bottomMenu: {
            top: 'auto',
            bottom: 0,
        },
    })
);

export default function SimpleBottomNavigation({ handleChange, currentPage, activeDrawer, ...rest }: MenuProps) {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const icons = [<HomeIcon />, <SchoolIcon />, <ExtentionIcon />]

    return (
        <div {...rest} >
            <AppBar position="fixed" className={classes.bottomMenu} >
                <BottomNavigation
                    value={currentPage === -1 ? false : currentPage}
                    onChange={handleChange}
                    showLabels
                >
                    {activeDrawer && <BottomNavigationAction icon={<MenuIcon />} value={-1} onClick={()=>dispatch(actionCreators.setMobile()) } />}
                    {appRoutes.public.map((item, index) =>
                        <BottomNavigationAction key={index} label={item.label} icon={icons[index]} value={index} />
                    )}
                </BottomNavigation>
            </AppBar>
        </div>
    );
}
