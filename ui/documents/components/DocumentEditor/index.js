import React, { Fragment, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { Bert } from 'meteor/themeteorchef:bert';
import { ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import delay from '../../../../modules/delay';
import { timeago } from '../../../../modules/dates';
import Icon from '../../../global/components/Icon';
import {
  editDocument as GET_DOCUMENT,
  documents as GET_DOCUMENTS,
} from '../../queries/Documents.gql';
import {
  updateDocument as UPDATE_DOCUMENT,
  removeDocument as REMOVE_DOCUMENT,
} from '../../mutations/Documents.gql';
import Styles from './styles';

const DocumentEditor = ({ doc }) => {
  const history = useHistory();
  const [saving, setSaving] = useState(false);
  const formRef = useRef();

  const [updateDocument] = useMutation(UPDATE_DOCUMENT, {
    awaitRefetchQueries: true,
    ignoreResults: true,
    onCompleted: () => {
      // NOTE: Delay setSaving to false so UI changes aren't jarring.
      setTimeout(() => setSaving(false), 1000);
    },
    onError: (error) => {
      Bert.alert(error.message, 'danger');
    },
  });

  const [removeDocument] = useMutation(REMOVE_DOCUMENT, {
    refetchQueries: [{ query: GET_DOCUMENTS }],
    awaitRefetchQueries: true,
    ignoreResults: true,
    onCompleted: () => {
      history.push('/documents');
      Bert.alert('Document removed!', 'success');
    },
    onError: (error) => {
      Bert.alert(error.message, 'danger');
    },
  });

  const handleUpdateDocument = () => {
    setSaving(true);
    delay(() => {
      updateDocument({
        variables: {
          _id: doc._id,
          title: formRef.current.title.value.trim(),
          body: formRef.current.body.value.trim(),
        },
        refetchQueries: [{ query: GET_DOCUMENT }],
      });
    }, 300);
  };

  const handleSetVisibility = (isPublic) => {
    setSaving(true);
    updateDocument({
      variables: {
        _id: doc._id,
        isPublic: isPublic === 'public',
      },
    });
  };

  const handleRemoveDocument = () => {
    if (confirm('Are you sure? This is permanent!')) {
      removeDocument({
        variables: {
          _id: doc._id,
        },
      });
    }
  };

  return (
    <Fragment>
      <Styles.DocumentEditorHeader className="clearfix">
        <p>{saving ? <em>Saving...</em> : <span>Last edit was {timeago(doc.updatedAt)}</span>}</p>
        <DropdownButton
          bsStyle="default"
          title={
            <span>
              <Icon iconStyle="solid" icon="gear" />
            </span>
          }
          id="set-document-public"
        >
          <MenuItem href={`/documents/${doc._id}`} target="_blank" rel="noopener noreferrer">
            <Icon iconStyle="solid" icon="external-link-alt" /> View Document
          </MenuItem>
          <MenuItem divider />
          <MenuItem header>Visibility</MenuItem>
          <MenuItem
            className={doc.isPublic && 'active'}
            eventKey="1"
            onClick={() => handleSetVisibility('public')}
          >
            <Icon iconStyle="solid" icon="unlock" /> Public
          </MenuItem>
          <MenuItem
            className={!doc.isPublic && 'active'}
            eventKey="2"
            onClick={() => handleSetVisibility('private')}
          >
            <Icon iconStyle="solid" icon="lock" /> Private
          </MenuItem>
          <MenuItem divider />
          <MenuItem onClick={() => handleRemoveDocument()}>
            <span className="text-danger">Delete Document</span>
          </MenuItem>
        </DropdownButton>
      </Styles.DocumentEditorHeader>
      <Styles.StyledDocumentEditor>
        <form ref={formRef} onSubmit={(event) => event.preventDefault()}>
          <Styles.DocumentEditorTitle>
            <ControlLabel>Title</ControlLabel>
            <input
              type="text"
              className="form-control"
              name="title"
              defaultValue={doc && doc.title}
              placeholder="Document Title"
              onChange={() => handleUpdateDocument()}
            />
          </Styles.DocumentEditorTitle>
          <Styles.DocumentEditorBody>
            <ControlLabel>Body</ControlLabel>
            <textarea
              className="form-control"
              name="body"
              defaultValue={doc && doc.body}
              placeholder="This is my document. There are many like it, but this one is mine."
              onChange={() => handleUpdateDocument()}
            />
          </Styles.DocumentEditorBody>
        </form>
      </Styles.StyledDocumentEditor>
      <Styles.DocumentEditorFooter className="clearfix">
        <span>
          <svg width="63" height="39" viewBox="0 0 256 158" preserveAspectRatio="xMinYMin meet">
            <path d="M238.371 157.892H18.395C8.431 157.892 0 149.462 0 139.497V18.395C0 8.431 8.431 0 18.395 0h219.21C247.569 0 256 8.431 256 18.395v121.102c0 9.964-7.665 18.395-17.629 18.395zM18.395 12.263c-3.066 0-6.132 3.066-6.132 6.132v121.102c0 3.832 3.066 6.132 6.132 6.132h219.21c3.832 0 6.132-3.066 6.132-6.132V18.395c0-3.832-3.066-6.132-6.132-6.132H18.395zM36.79 121.102V36.79h24.527l24.527 30.66 24.527-30.66h24.527v84.312h-24.527V72.814l-24.527 30.66-24.527-30.66v48.288H36.79zm154.06 0l-36.79-40.623h24.527V36.79h24.527v42.923h24.527l-36.79 41.389z" />
          </svg>
          <p>
            <a
              href="https://www.markdownguide.org/basic-syntax"
              target="_blank"
              rel="noopener noreferrer"
            >
              Formatting guide
            </a>
          </p>
        </span>
      </Styles.DocumentEditorFooter>
    </Fragment>
  );
};

DocumentEditor.defaultProps = {
  doc: null,
};

DocumentEditor.propTypes = {
  doc: PropTypes.object,
};

export default DocumentEditor;
