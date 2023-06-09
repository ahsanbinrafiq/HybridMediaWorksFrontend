import React, { useEffect, useState } from 'react';
import './test.css';
import { useNavigate } from 'react-router';
import Button from 'react-bootstrap/Button';
import CreateTestWidget from '../../components/createTestWidget/createTestWidget';
import axios from 'axios';

const Test = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    (() => {
      axios
        .get(
          'http://localhost:8080/api/sheets/',

          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then(function (response) {
          if (response.status === 200) {
            console.log(response);
            setData(response?.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    })();
  }, [show]);

  return (
    <>
      <div>
        <div className="Top-div">
          <Button variant="primary" onClick={() => setShow(true)}>
            Create Test
          </Button>
        </div>
        {data.length > 0 ? (
          <div className="test-main-div">
            <table>
              <tr>
                <th>Id</th>
                <th>Created at</th>
                <th>No. of questions</th>
              </tr>
              {data.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>
                      <div
                        style={{ cursor: 'pointer', color: 'blue' }}
                        onClick={() => {
                          navigate(`/testSheet/${val.id}`);
                        }}
                      >
                        {val.id}
                      </div>
                    </td>
                    <td>{val.createdAt}</td>
                    <td>{val.sheet.length}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        ) : (
          <div className="no-test-found-div">No Test found</div>
        )}
      </div>
      <CreateTestWidget show={show} setShow={setShow} />
    </>
  );
};

export default Test;
