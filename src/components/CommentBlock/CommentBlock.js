import React, { useState, useEffect } from 'react';
import { 
  List,
  Paper,
  makeStyles, 
  Typography,
  TextField,
  IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { useExpService } from '../../context/expService.js';
import Comment from './Comment.js';
import Notification, { notify } from '../../reusable/Notification.js';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    
  },
  commentList: {
    overflow: 'auto',
    maxHeight: 270
  },
  commentForm: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  sendBtn: {
    marginLeft: theme.spacing(1)
  }
}));

const CommentBlock = ({ planId }) => {
  const classes = useStyles();
  const [ comments, setComments ] = useState([]);
  const [ text, setText ] = useState('');
  const expService = useExpService();

  useEffect(() => {
    expService
      .getAllCommentsFromPlan(planId)
      .then(comments => setComments(comments));
  }, [expService, planId]);

  const handleCommentChange = (e) => setText(e.target.value);

  const onSendClick = async (e) => {
    e.preventDefault();
    try {
      const newComment = {
        content: text,
        plan: planId
      };
      const createdComment = await expService.create('comment', newComment);
      console.log(createdComment)
      setComments(comments => comments.concat(createdComment));
      setText('');
    } catch (e) {
      notify('error', 'Ошибка при отправке комментария.');
    }
  };

  return (
    <>
    <Typography variant='h5'>
      Комментарии ({comments.length})
    </Typography>
    <Paper className={classes.root} elevation={2}>
      <List className={classes.commentList}>
        {comments.map(comment => <Comment key={comment.id} data={comment} />)}
      </List>
      <form className={classes.commentForm} onSubmit={onSendClick}>
        <TextField
          value={text}
          onChange={handleCommentChange}
          size='small'
          variant='outlined'
          fullWidth
          placeholder='Введите ваш комментарий...' />
        <IconButton type='submit' className={classes.sendBtn}>
          <SendIcon color='primary' />
        </IconButton>
      </form>
      <Notification />
    </Paper>
    </>
    
  );
};

export default CommentBlock;