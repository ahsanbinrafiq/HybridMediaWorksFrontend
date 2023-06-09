import React, { useState } from 'react';
import { Alert, FormText, Modal, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './createTestWidget.css';
import FormComponent from '../FormComponent/FormComponent';
import PreviewComponent from '../PreviewComponent/PreviewComponent';
import axios from 'axios';

const CreateTestWidget = ({ show, setShow }) => {
  const [questionText, setQuestionText] = useState('');
  const [optionText, setOptionText] = useState('');
  const [data, setData] = useState([]);
  const [showOptionsField, setShowOptionsField] = useState(false);
  const [saveDataLoader, setSaveDataLoader] = useState(false);

  const onChangeQuestion = (val) => {
    setQuestionText(val.target.value);
  };

  const onChangeOption = (val) => {
    setOptionText(val.target.value);
  };

  const handleQuestionKeyDown = (event) => {
    if (event.key === 'Enter') {
      setData([...data, { question: questionText, options: [] }]);
      setQuestionText('');
      setOptionText('');
      setShowOptionsField(true);
    }
  };

  const handleOptionsKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (data.question === '') {
        window.alert(
          'Enter question first!\nOptions are according to the question.'
        );
        return;
      }
      let copyList = data;
      copyList[copyList.length - 1].options = [
        ...copyList[copyList.length - 1].options,
        { name: optionText, isChecked: false },
      ];
      setData(copyList);
      setQuestionText('');
      setOptionText('');
    }
  };

  const hideModal = () => {
    setData([]);
    setShowOptionsField(false);
    setShow(false);
  };

  const handleFormDone = () => {
    setShowOptionsField(false);
  };

  const deleteOption = (dataIndex, optionIndex) => {
    let copyList = data;
    copyList[dataIndex].options.splice(optionIndex, 1);
    setData([...copyList]);
  };

  const deleteQuestion = (dataIndex) => {
    let copyList = data;
    copyList.splice(dataIndex, 1);
    setData([...copyList]);
  };

  const saveChanges = () => {
    if (data.length <= 0) {
      window.alert('Add data first!');
      return;
    }
    setSaveDataLoader(true);
    axios
      .post(
        'http://localhost:8080/api/sheets/',
        {
          sheet: data,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then(function (response) {
        if (response.status === 200) {
          setSaveDataLoader(false);
          setData([]);
          setShowOptionsField(false);
          setShow(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <Modal
        show={show}
        size="xl"
        onHide={() => hideModal()}
        dialogClassName="Create-modal-main"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Test</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="Modal-body-div">
            <div className="Modal-box-one">
              <FormComponent
                questionText={questionText}
                onChangeQuestion={onChangeQuestion}
                handleQuestionKeyDown={handleQuestionKeyDown}
                optionText={optionText}
                onChangeOption={onChangeOption}
                handleOptionsKeyDown={handleOptionsKeyDown}
                handleFormDone={handleFormDone}
                showOptionsField={showOptionsField}
              />
            </div>
            <div className="Modal-body-inner-space"></div>
            <div className="Modal-box-two">
              <PreviewComponent
                data={data}
                deleteOption={deleteOption}
                deleteQuestion={deleteQuestion}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => hideModal()}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => saveChanges()}
            // disabled={saveDataLoader}
          >
            Save Changes
            {saveDataLoader && (
              <Spinner
                style={{ marginLeft: 10, color: '#fff' }}
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default CreateTestWidget;
