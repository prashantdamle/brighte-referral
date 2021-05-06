import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import {SimpleModal} from '../SimpleModal';
import {SimpleModalEditForm} from '../SimpleModalEditForm';
import { ReactComponent as CreateIcon } from '../../../assets/create-24px.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/delete-24px.svg';
import { Referral } from '../../types/referral';
import { IconButton } from '../IconButton';
import style from './ReferralTable.module.css';
import Modal from '@material-ui/core/Modal';

const TableHeadCell: React.FC = ({ children }) => (
  <TableCell classes={{ root: style.tableHeadCell }}>{children}</TableCell>
);

const TableBodyCell: React.FC = ({ children }) => (
  <TableCell classes={{ root: style.tableBodyCell }}>{children}</TableCell>
);

interface ActionBodyCellProps {
  onEditClick: () => void;
  onDeleteClick: () => void;
}

const ActionBodyCell: React.FC<ActionBodyCellProps> = ({
                                                         onEditClick,
                                                         onDeleteClick,
                                                       }) => (
  <TableCell classes={{ root: style.actionBodyCell }}>
    <IconButton onClick={onEditClick}>
      <CreateIcon />
    </IconButton>
    <IconButton onClick={onDeleteClick}>
      <DeleteIcon />
    </IconButton>
  </TableCell>
);

interface ReferralTableProps {
  referrals: Referral[];
  onEditSave: (referralData: Referral) => void;
  onDeleteSave: (referralData: Referral) => void;
}


const ReferralTable: React.FC<ReferralTableProps> = ({ referrals, onEditSave, onDeleteSave }) => {

  const [open, setOpen] = React.useState<boolean>(false);
  const [openEdit, setOpenEdit] = React.useState<boolean>(false);
  const [referralEditData, setReferralEditData] = React.useState<Referral>(null);
  const [referralDeleteData, setReferralDeleteData] = React.useState<Referral>(null);

  /*Delete Modal function*/
  const handleDeleteOpen = () => {
    setOpen(true);
  };
  const handleDeleteClose = () => {
  //do nothing just close
    setOpen(false);
  };
  const onDelete = () => {
    onDeleteSave(referralDeleteData);
    setReferralDeleteData(null);
    setOpen(false);
  }

  /*Edit Modal function*/
  const handleEditOpen = () => {
  console.log(openEdit)
    setOpenEdit(true);
  };
  const handleEditClose = () => {
    //do nothing just close
    setOpenEdit(false);
  };
  const onEdit = (referralData: Referral) => {
    console.log("Edited data is:", referralData);
    onEditSave(referralData);
    setReferralEditData(null);
    setOpenEdit(false);
  }


  return (
  <>
    <TableContainer classes={{ root: style.container }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Given Name</TableHeadCell>
            <TableHeadCell>Surname</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Phone</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {referrals.map((referral) => (
            <TableRow key={referral.id}>
              <TableBodyCell>{referral.givenName}</TableBodyCell>
              <TableBodyCell>{referral.surName}</TableBodyCell>
              <TableBodyCell>{referral.email}</TableBodyCell>
              <TableBodyCell>{referral.phone}</TableBodyCell>
              <ActionBodyCell
                onEditClick={() => {
                  console.log(`Edit referral ${referral.id} clicked`);
                  setReferralEditData(referral)
                  handleEditOpen();
                }
                }
                onDeleteClick={() => {
                  console.log(`Delete referral ${referral.id} clicked`);
                  setReferralDeleteData(referral);
                  handleDeleteOpen();
                }
                }
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <SimpleModal
        open={open}
        handleOpen={handleDeleteOpen}
        handleClose={handleDeleteClose}
        onDelete={onDelete}
        referralData={referralDeleteData}/>
        {openEdit}
    <SimpleModalEditForm
            open={openEdit}
            handleOpen={handleEditOpen}
            handleClose={handleEditClose}
            onEdit={onEdit}
            referralData={referralEditData}/>
    </>
  );
};

export { ReferralTable };
