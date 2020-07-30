import React from 'react';
import {
  ListItem,
  Typography,
  makeStyles
} from '@material-ui/core';
import format from '../../services/formatService.js';

const useStyles = makeStyles(theme => ({
  root: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  author: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  date: {
    marginLeft: 'auto'
  }
}));

const Comment = ({ data : { content, user, date }}) => {
  const classes = useStyles();

  const commentAuthor = () => (
    `${format.setShortName(user.name)}  
    (${format.capitalizeFirstLetter(format.getRole(user.role))})`);
  
    const commentDate = () => format.setDate(date);

  return (
    <ListItem className={classes.root}>
      <Typography className={classes.author} variant='subtitle1'>
        {commentAuthor()}
      </Typography>
      <Typography>
        {content}
      </Typography>
      <Typography className={classes.date} variant='subtitle1'>
        {commentDate()}
      </Typography>
    </ListItem>
  );
};

export default Comment;