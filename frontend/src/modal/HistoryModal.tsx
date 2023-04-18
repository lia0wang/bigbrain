import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, List, ListItem, ListItemText, DialogTitle, DialogContent, DialogActions, Dialog } from '@mui/material';

interface HistorySessionModalProps {
  quizId: number;
  gameTitle: string;
  sessionIds: string[];
  onClose: () => void;
}

const HistorySessionModal: React.FC<HistorySessionModalProps> = ({ quizId, gameTitle, sessionIds, onClose }) => {
  const navigate = useNavigate();
  const onSessionClick = (sessionId: string) => {
    const viewResults = true;
    navigate(`/admin/session/${sessionId}`, { state: { quizId, gameTitle, viewResults } });
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>History Sessions</DialogTitle>
      <DialogContent>
        <List>
          {sessionIds.map((sessionId) => (
            <ListItem
              key={sessionId}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                },
              }}
              onClick={() => onSessionClick(sessionId)}
            >
              <ListItemText primary={sessionId} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
          <Button variant="contained" color="primary" onClick={onClose}>
            Close
          </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HistorySessionModal;
