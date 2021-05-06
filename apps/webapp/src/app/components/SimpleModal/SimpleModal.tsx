import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { Referral } from '../../types/referral';
import { FormControl } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import style from './SimpleModal.module.css';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

interface SimpleModalProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  onDelete: () => void;
  referralData: Referral;
}

const SimpleModal: React.FC <SimpleModalProps> = ({ open, handleOpen, handleClose, onDelete, referralData }) => {

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);


    const handleDelete = () => {
        onDelete();
    };

  const body = (
    <div style={modalStyle} className={`${classes.paper} ${style.deleteModal}`}>
      <h2 id="simple-modal-title">Are you sure you want to delete {referralData?.givenName}</h2>
      <div id="simple-modal-description">

      </div>
      <Button variant="contained" color="primary" onClick={handleDelete} className={style.deleteBtn}>
         Delete
       </Button>
        <Button variant="contained" color="secondary" onClick={handleClose}>
          Cancel
        </Button>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>

    </div>
  );
}


export { SimpleModal };