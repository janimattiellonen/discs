import React from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';

export function DiscSavedDialog({ handleClose, open }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Disc saved</DialogTitle>
      <DialogContent>
        <p>Disc information was successfully saved</p>

        <Button variant="contained" type="button" onClick={handleClose}>
          OK
        </Button>
      </DialogContent>
    </Dialog>
  );
}
