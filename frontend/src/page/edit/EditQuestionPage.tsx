import React from 'react';
import Navbar from '../../component/dashboard/Navbar';
import NotFoundPage from '../NotFoundPage';

const EditQuestionPage: React.FC<{ qNo: string }> = ({ qNo }) => {
  if (Number(qNo) < 1 || Number(qNo) > 6) {
    return (
      <>
        <NotFoundPage />
      </>
    );
  }

  return (
    <>
      <Navbar isDashboard={false} isEditQuestionPage={true} />
      <div className="bg-sky-100 w-screen h-screen flex flex-row content-center justify-center py-20">
      </div>
      <></>
    </>
  );
}

export default EditQuestionPage;
