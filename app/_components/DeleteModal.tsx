import React from 'react';
import { Modal, Button, Text, Group } from '@mantine/core';

type DeleteModalProps = {
  isOpen: boolean;
  onDeleteConfirm: () => void;
  onCancel: () => void;
};

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onDeleteConfirm, onCancel }) => {
  return (
    <Modal opened={isOpen} onClose={onCancel} title="Confirm Deletion">
      <Text>Are you sure you want to delete this resident?</Text>
      <Group>
        <Button color="red" onClick={onDeleteConfirm}>Delete</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </Group>
    </Modal>
  );
};

export default DeleteModal;
