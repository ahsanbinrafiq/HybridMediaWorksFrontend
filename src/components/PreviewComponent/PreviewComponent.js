import React from 'react';
import './PreviewComponent.css';

const PreviewComponent = ({ data, deleteOption, deleteQuestion }) => {
  return (
    <div className="preview-main-div">
      {data?.length > 0 ? (
        <>
          {data.map((dataItem, i) => {
            return (
              <>
                <div className="preview-question-div">
                  <h5>{`Question no. ${i + 1}:`}</h5>
                  <h5 className="preview-question-field">
                    {dataItem?.question}
                  </h5>
                  <button
                    className="preview-delete-option-button"
                    onClick={() => {
                      deleteQuestion(i);
                    }}
                  >
                    X
                  </button>
                </div>

                {dataItem?.options?.length > 0 ? (
                  <div>
                    {dataItem?.options?.map((item, j) => {
                      return (
                        <div className="preview-option-div">
                          <input
                            className="preview-option-field"
                            placeholder="Add options"
                            type="checkbox"
                            value={item?.name}
                            isChecked={item?.isChecked}
                          />
                          <label className="preview-option-label">
                            {item?.name}
                          </label>
                          <button
                            className="preview-delete-option-button"
                            onClick={() => {
                              deleteOption(i, j);
                            }}
                          >
                            X
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <></>
                )}
              </>
            );
          })}
        </>
      ) : (
        <>No preview available</>
      )}
    </div>
  );
};

export default PreviewComponent;
