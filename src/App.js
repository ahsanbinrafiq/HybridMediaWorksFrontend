import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Test from './pages/test/test';
import TestSheet from './pages/testSheet/testSheet';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Test />} />
        <Route exact path="/testSheet/:id" element={<TestSheet />} />
      </Routes>
    </div>
  );
}

export default App;
