import React, { useState, useEffect } from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert (
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AuthErrorPopup: React.FC<{ error: string | undefined }> = ({ error }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setOpen(true);
      const timer = setTimeout(() => {
        setOpen(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
    return () => {
      // do nothing
    };
  }, [error]);

  return (
    <Stack
      className="fixed top-0 left-0 z-50 w-[80%] ml-[10%] mt-[3%]"
      spacing={2}
    >
      {open && (
        <Alert severity="info" onClose={() => setOpen(false)}>
          {error}
        </Alert>
      )}
    </Stack>
  );
};

export default AuthErrorPopup;
