import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { Referral } from '../../types/referral';
import { FormControl } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import style from './SimpleModalEditForm.module.css';

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

interface SimpleModalEditFormProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  onEdit: (referralData: Referral) => void;
  referralData: Referral;
}

const SimpleModalEditForm: React.FC <SimpleModalEditFormProps> = ({ open, handleOpen, handleClose, onEdit, referralData }) => {

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [name, setName] = React.useState<string>('');
  const [surname, setSurname] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [phone, setPhone] = React.useState<string>('');

    useEffect(() => {
      setName(referralData?.givenName);
      setSurname(referralData?.surName);
      setEmail(referralData?.email);
      setPhone(referralData?.phone);
    }, [referralData]);

    const handleEdit = () => {
      const newReferralData = {
        id: referralData?.id,
        givenName: name,
        surName: surname,
        email: email,
        phone: phone,
      };
      onEdit(newReferralData);
    };

    const onChangeHandler = (e) => {
      console.log(e.target.id);
      switch(e.target.id){
        case("name"): setName(e.target.value); break;
        case("surname"): setSurname(e.target.value); break;
        case("email"): setEmail(e.target.value); break;
        case("phone"): setPhone(e.target.value); break;
      }
    }

  const body = (
    <div style={modalStyle} className={`${classes.paper} ${style.editModal}`}>
      <h2 id="simple-modal-title">Referral for edit, id: {referralData?.id}</h2>
      <div id="simple-modal-description">
        <label className={style.labels}>Given Name:</label> <input type="text" value={name || ''} onChange={onChangeHandler} id="name"/> <br /><br />
        <label className={style.labels}>Surname:</label> <input type="text" value={surname || ''} onChange={onChangeHandler} id="surname"/> <br /><br />
        <label className={style.labels}>Email:</label> <input type="text" value={email || ''} onChange={onChangeHandler} id="email"/> <br /><br />
        <label className={style.labels}>Phone:</label> <input type="text" value={phone || ''} onChange={onChangeHandler} id="phone"/> <br /><br />
      </div>
      <br />
      <Button variant="contained" color="primary" onClick={handleEdit}  className={style.editBtn}>
         Save
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


export { SimpleModalEditForm };