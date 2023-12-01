import React from 'react';
import PropTypes from 'prop-types';
import CommentComposer from '../CommentComposer';
import { timeago } from '../../../../modules/dates';

import Styles from './styles';

const Comments = ({ sortBy, onChangeSortBy, documentId, comments }) => (
  <Styles.StyledComments>
    <CommentComposer documentId={documentId} />
    {comments.length > 0 && (
      <Styles.CommentsList>
        <Styles.CommentsListHeader>
          <h3>{comments.length === 1 ? '1 Comment' : `${comments.length} Comments`}</h3>
          <select name="sortBy" className="form-control" value={sortBy} onChange={onChangeSortBy}>
            <option value="newestFirst">Newest First</option>
            <option value="oldestFirst">Oldest First</option>
          </select>
        </Styles.CommentsListHeader>
        {comments.map(({ _id, user, createdAt, comment }) => {
          const name = user && user.name;
          return (
            <Styles.Comment key={_id}>
              <header>
                <p>
                  <strong>{`${name && name.first} ${name && name.last}`}</strong>
                  <span>{timeago(createdAt)}</span>
                </p>
              </header>
              <div>
                {comment.split('\n').map((item, key) => (
                  <p key={`${_id}_${key}` /* eslint-disable-line */}>{item}</p>
                ))}
              </div>
            </Styles.Comment>
          );
        })}
      </Styles.CommentsList>
    )}
  </Styles.StyledComments>
);

Comments.propTypes = {
  documentId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  sortBy: PropTypes.string.isRequired,
  onChangeSortBy: PropTypes.func.isRequired,
};

export default Comments;
