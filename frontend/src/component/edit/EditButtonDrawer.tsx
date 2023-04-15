import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import EditFormControl from './EditFormControl';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const EditButtonDrawer: React.FC = () => {
  const [state, setState] = useState({
    right: false,
  });
  const [type, setType] = useState('');
  const [time, setTime] = useState('');
  const [point, setPoint] = useState('');

  const types = new Map([
    ['Multi-Select', 'multi'],
    ['Single-Select', 'single'],
  ]);

  const times = new Map([
    ['5 seconds', '5'],
    ['10 seconds', '10'],
    ['20 seconds', '20'],
    ['30 seconds', '30'],
    ['1 minute', '60'],
  ]);

  const points = new Map([
    ['100 points', '100'],
    ['200 points', '200'],
    ['500 points', '300'],
  ]);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setState({ ...state, right: open });
    };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      onKeyDown={toggleDrawer(false)}
    >
      <form className="flex flex-col justify-center items-center h-screen">
        <span className="my-[4%]" />
        <h6 className="text-center">Question Type</h6>
        <EditFormControl select={type} setSelect={setType} options={types} />
        <span className="my-[4%]" />
        <h6 className="text-center">Time Limit</h6>
        <EditFormControl select={time} setSelect={setTime} options={times} />
        <span className="my-[4%]" />
        <h6 className="text-center">Points</h6>
        <EditFormControl select={point} setSelect={setPoint} options={points} />
        <span className="my-[4%]" />
      </form>
    </Box>
  );

  return (
    <>
      <div>
        <Fab
        onClick={toggleDrawer(true)}
        size="small" color="primary" aria-label="add">
          <AddIcon />
        </Fab>
        <Drawer
          anchor={'right'}
          open={state.right}
          onClose={toggleDrawer(false)}
        >
          {list()}
        </Drawer>
      </div>
    </>
  );
};

export default EditButtonDrawer;
