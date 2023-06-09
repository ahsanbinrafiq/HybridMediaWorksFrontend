import axios from 'axios';
import './testSheet.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const TestSheet = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    (() => {
      axios
        .get(
          `http://localhost:8080/api/sheets/${params.id.toString()}`,

          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then(function (response) {
          if (response.status === 200) {
            console.log(response?.data?.sheet);
            setData(response?.data?.sheet);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    })();
  }, []);
  return (
    <div className="testsheet-main-div">
      <div className="testsheet-main-title-div">
        <h4>{`Test sheet Id: ${params.id.toString()}`}</h4>
      </div>
      {data.length > 0 ? (
        <div className="testsheet-items-main-div">
          {data?.map((item, index) => {
            return (
              <div className="sheet-single-item-div">
                <div className="d-flex flex-row align-items-center">
                  <h5>{`Question no. ${index + 1}:`}</h5>
                  <h6 className="ms-2">{item?.question}</h6>
                </div>
                {item?.options?.length > 0 ? (
                  <>
                    {item?.options?.map((option) => {
                      return (
                        <div className="sheet-options-div">
                          <input type="checkbox" />{' '}
                          <label className="ms-2">{option?.name}</label>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="testsheet-loading-div">Loading</div>
      )}
    </div>
  );
};

export default TestSheet;
