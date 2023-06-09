import React from 'react';
import './FormComponent.css';
import { Button } from 'react-bootstrap';

const FormComponent = ({
  questionText,
  onChangeQuestion,
  handleQuestionKeyDown,
  optionText,
  onChangeOption,
  handleOptionsKeyDown,
  handleFormDone,
  showOptionsField,
}) => {
  return (
    <div className="form-main-div">
      {!showOptionsField ? (
        <div className="question-div">
          <label>Question:</label>
          <input
            className="Question-input-field mt-1"
            placeholder="Enter question"
            type="text"
            value={questionText}
            onChange={(val) => {
              onChangeQuestion(val);
            }}
            onKeyDown={handleQuestionKeyDown}
          />
        </div>
      ) : null}

      {showOptionsField ? (
        <>
          <div className="question-div">
            <label className="mt-3">Options:</label>
            <input
              autoFocus
              className="Question-input-field mt-1"
              placeholder="Add options"
              type="text"
              value={optionText}
              onChange={(val) => {
                onChangeOption(val);
              }}
              onKeyDown={handleOptionsKeyDown}
            />
          </div>
          <label className="mt-3">If you want to add more questions hit</label>
          <Button
            className="mt-1"
            variant="primary"
            onClick={() => {
              handleFormDone();
            }}
          >
            Done
          </Button>
        </>
      ) : null}
    </div>
  );
};

export default FormComponent;
