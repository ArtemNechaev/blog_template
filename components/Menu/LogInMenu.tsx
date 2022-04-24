import React, { Fragment } from 'react';
import { useSession, Session } from 'next-auth/client';
import { signOut } from 'next-auth/client'
import { Button, IconButton, Menu, MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Link from 'next/link';
import { } from '../../lib/appRoutes'

const LoginMenu = () => {
    const [session, loading] = useSession();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    if (session) {
        return (
            <Fragment>
                {session.user.email ?? session.user.name}
                <IconButton
                    onClick={handleClick}
                >
                    <AccountCircle />
                </IconButton>
                <Menu anchorEl={anchorEl}
                    onClose={handleClose}
                    open={Boolean(anchorEl)}
                >
                    <Link href='/mydrafts' passHref>
                        <MenuItem onClick={handleClose}>Мои статьи</MenuItem>
                    </Link>
                    <Link href='/create' passHref>
                        <MenuItem onClick={handleClose}>Написать статью</MenuItem>
                    </Link>
                    <MenuItem onClick={() => signOut()}>LogOut</MenuItem>
                </Menu>
            </Fragment>
        )
    }
    else {
        return (
            <Fragment>
                <Link href='/api/auth/signin'>
                    <Button color="inherit">Login</Button>
                </Link>
            </Fragment>
        )
    }
}

export default LoginMenu;