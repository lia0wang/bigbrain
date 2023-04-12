import React from 'react';
import Navbar from '../../component/dashboard/Navbar';
import LoadingPage from '../LoadingPage';

const EditQuestionPage: React.FC<{ qNo: string }> = ({ qNo }) => {
  if (Number(qNo) < 1 || Number(qNo) > 6) {
    return (
      <>
        <Navbar isDashboard={false}/>
        <LoadingPage />
      </>
    );
  }

  return (
    <>
      <Navbar isDashboard={false}/>
      <p>Editing question number: {qNo}</p>
    </>
  );
}

export default EditQuestionPage;
