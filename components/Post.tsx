import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

export type PostProps = {
  id: number;
  title: string;
  author: {
    id: number;
    name: string;
    email: string;
  } | null;
  conclusion: string;
  introduction: string;
  mainpart: string;
  published: boolean;
};

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  content: {
    height: 140,
  }
});

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  const classes = useStyles();
  return (
    //<div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
    <Card className={classes.root}>
      <CardActionArea >
        <CardMedia
          className={classes.media}
          image="../public/vercel.svg"
          title={post.title}
          onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
            {authorName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.introduction}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
    // </div>
  );
};

export default Post;
