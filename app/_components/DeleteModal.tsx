import React from 'react';
import { Modal, Button, Text, Group } from '@mantine/core';

type DeleteModalProps = {
  isOpen: boolean;
  onDeleteConfirm: () => void;
  onCancel: () => void;
};

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onDeleteConfirm, onCancel }) => {
  return (
    <Modal opened={isOpen} onClose={onCancel} title="Poista asukas">
      <Text mb="lg">Oletko varma että haluat poistaa asukkaan?</Text>
      <Group>
        <Button color="red" onClick={onDeleteConfirm}>Poista</Button>
        <Button onClick={onCancel}>Peruuta</Button>
      </Group>
    </Modal>
  );
};

export default DeleteModal;
