import React from 'react';

const SessionAdminResultPage: React.FC = () => {
  // Table of up to top 5 users and their score - mui data grid
  // Line Chart to show each question -> percentage of people who got it right
  // Chart to show the average response time for each question
  // Table of up to last 5 users and their score - mui data grid :')

  return (
    <>
        <div className="bg-sky-100 w-screen flex flex-col mt-24 md:mt-24 lg:mt-24">
          <p className="text-2xl font-bold">Admin Results</p>
        </div>
    </>
  );
}

export default SessionAdminResultPage;
