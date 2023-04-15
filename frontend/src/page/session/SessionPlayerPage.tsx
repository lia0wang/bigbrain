import { useParams } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';
import apiRequest from '../../util/api';
import React, { useEffect, useState } from 'react';
import EnterNameModal from '../../modal/EnterNameModal';

const SessionPlayerPage: React.FC = () => {
  const { sessionId } = useParams();
  console.log(sessionId);
  // if questionId is defined, return GameQuestionEditPage
  if (!sessionId) {
    return <NotFoundPage />;
  }

  const [playerName, setPlayerName] = useState<string>(null);
  const [playerId, setPlayerId] = useState<string>(null);
  const [showEnterNameModal, setShowEnterNameModal] = useState<boolean>(true);

  const joinSessionWithName = async (name:string): Promise<void> => {
    setPlayerName(name)
    setShowEnterNameModal(false);
    const resp = await apiRequest('POST', `/play/join/${sessionId}`, { name });
    if (resp.error) {
      console.log(resp.error);
      alert(resp.error)
      return;
    }
    setPlayerId(resp.playerId);
    console.log(resp);
  };
  return (
    <>
      {!playerId && (
        <EnterNameModal onConfirm={joinSessionWithName} />
      )}
      {playerId && (
        <div>
          <h1>Lobby</h1>
          <p>Your identification: {playerId}</p>
          <p>Hello, {playerName}. Kindly wait for the administrator to initiate the game :)</p>
          <p>In the meantime, you can enjoy a fun little game.</p>
        </div>
      )}
    </>
  );
};

export default SessionPlayerPage;
