import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

import Validation from '../../../global/components/Validation';
import StyledCommentComposer from './styles';

const CommentComposer = ({ documentId }) => {
  const handleSubmit = (form) => {
    if (Meteor.userId()) {
      Meteor.callAsync('addComment', {
        documentId,
        comment: form.comment.value.trim(),
      });

      document.querySelector('[name="comment"]').value = '';
    } else {
      Bert.alert('Sorry, you need to be logged in to comment!', 'danger');
    }
  };

  return (
    <StyledCommentComposer>
      <header>Add a Comment</header>
      <Validation
        rules={{
          comment: {
            required: true,
          },
        }}
        messages={{
          comment: {
            required: "What's your comment?",
          },
        }}
        submitHandler={(form) => {
          handleSubmit(form);
        }}
      >
        <form onSubmit={(event) => event.preventDefault()}>
          <textarea
            className="form-control"
            name="comment"
            placeholder="Have a comment about this?"
          />
          <Button type="submit" variant="success">
            Post Comment
          </Button>
        </form>
      </Validation>
    </StyledCommentComposer>
  );
};

CommentComposer.propTypes = {
  documentId: PropTypes.string.isRequired,
};

export default CommentComposer;
