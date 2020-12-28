import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

import Validation from '../../../global/components/Validation';
import { document as GET_DOCUMENT } from '../../../documents/queries/Documents.gql';
import addCommentMutation from '../../mutations/Comments.gql';
import StyledCommentComposer from './styles';

const CommentComposer = ({ documentId }) => {
  const [addComment] = useMutation(addCommentMutation);
  const handleSubmit = (form) => {
    if (Meteor.userId()) {
      addComment({
        variables: {
          documentId,
          comment: form.comment.value.trim(),
        },
        refetchQueries: [
          { query: GET_DOCUMENT, variables: { _id: documentId, sortBy: 'newestFirst' } },
        ],
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
