import React from 'react';

const QuestionAccuracyChart: React.FC<{
    adminResult: object,
    questionList: object,
}> = ({
  adminResult,
  questionList,
}) => {
  return (
    <>
        <h1>QuestionAccuracyChart</h1>
        <pre> adminResult: {JSON.stringify(adminResult, null, 2)} </pre>
        <pre> questionList: {JSON.stringify(questionList, null, 2)} </pre>
    </>
  );
}

export default QuestionAccuracyChart;
