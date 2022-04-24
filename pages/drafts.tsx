import React, { useState } from "react";
import { GetStaticProps } from "next";
import { Grid } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Post, { PostProps } from "../components/Post";
import { getDrafts } from './api/post/index';

import { useAppDispatch, useAppSelector, AppState } from '../store/index'
import { actionCreators, DrawerState } from '../store/drawer'
import { useEffect } from "react";
import prisma from "../lib/prisma";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    container: {
      flexGrow: 1,
      padding: theme.spacing(3),
    }
  }),
);

export const getStaticProps: GetStaticProps = async () => {

  const feed = await getDrafts();

  return {
    props: {
      feed,
      initialReduxState: {
        drawer: {
          active: true,
          desctopOpen: true,
          mobileOpen: false,
          data: {mapper: {level_0: 'name', level_1: 'posts', level_2: 'title'}, tree:feed}
        }
      }
    }
  }
}

type Props = {
  feed: { name: string, posts: PostProps[] }[],
  initialReduxState: AppState
}

const Blog: React.FC<Props> = (props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => { dispatch(actionCreators.clear()) }
  }, [dispatch]);

  return (
    <main>
      <h1>Public Feed</h1>
      <Grid container spacing={3} >
        {props.feed.reduce((acc, item) => {
          acc.push(item.posts.map((post) => (
            <Grid item key={post.id}>
              <Post post={post} />
            </Grid>
          )))
          return acc
        }, [])}
      </Grid>
    </main>
  )
}

export default Blog
