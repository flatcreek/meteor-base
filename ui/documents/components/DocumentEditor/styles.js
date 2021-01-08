import styled from 'styled-components';

const DocumentEditor = styled.div``;

const DocumentEditorHeader = styled.div`
  font-size: 0.875rem;

  p {
    float: right;
    margin-top: 6px;
    color: var(--gray-light);
  }

  .dropdown {
    float: left;
  }
`;

const StyledDocumentEditor = styled.div`
  height: calc(100vh - 207px);
  border-radius: 3px;
  margin-top: 20px;

  .control-label {
    display: none;
  }

  .form-control {
    padding: 25px;
  }

  form {
    height: 100%;
  }

  @media screen and (min-width: 768px) {
    height: calc(100vh - 258px);
    margin-top: 20px;
  }
`;

const DocumentEditorTitle = styled.div`
  border-bottom: 1px solid var(--gray-lighter);

  .form-control {
    height: 60px;
    font-size: 16px;
    line-height: 22px;
  }
`;

const DocumentEditorBody = styled.div`
  height: calc(100% - 120px);
  overflow: hidden;

  .form-control {
    height: calc(100% - 32px);
    font-size: 16px;
    line-height: 26px;
    resize: none;
    background: transparent; /* Ensures this input doesn't overflow when resizing browser vertically. */
  }
`;

const DocumentEditorFooter = styled.div`
  padding: 15px 25px;
  border: none;
  font-size: 0.8rem;

  svg {
    float: left;
    width: 25px;
    height: auto;
    margin-right: 10px;
    position: relative;
    top: 2px;
  }

  p {
    float: left;
    margin: 0;
  }

  p a {
    text-decoration: underline;
    color: var(--gray-light);
  }
`;

export default {
  DocumentEditor,
  DocumentEditorHeader,
  StyledDocumentEditor,
  DocumentEditorTitle,
  DocumentEditorBody,
  DocumentEditorFooter,
};
