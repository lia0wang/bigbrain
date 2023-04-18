import React from 'react';

const ResponseTimeChart: React.FC<{
    adminResult: object,
    questionList: object,
}> = ({
  adminResult,
  questionList,
}) => {
  return (
    <>
        <h1>ResponseTimeChart</h1>
        <pre> adminResult: {JSON.stringify(adminResult, null, 2)} </pre>
        <pre> questionList: {JSON.stringify(questionList, null, 2)} </pre>
    </>
  );
}

export default ResponseTimeChart;
