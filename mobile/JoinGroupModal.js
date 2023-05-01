import React, { useState } from 'react';
import { Modal, Button, Text } from 'native-base';

const JoinGroupModal = ({ groupName, isVisible, onJoin, onLeave, onClose }) => {
  const [isJoining, setIsJoining] = useState(false);

  const handleJoin = () => {
    setIsJoining(true);
    onJoin();
    onClose();
  };

  const handleLeave = () => {
    setIsJoining(false);
    onLeave();
    onClose();
  };

  return (
    <Modal isOpen={isVisible} onClose={onClose}>
      <Modal.Content>
        <Modal.Header>
          <Text>Would you like to join group: {groupName}?</Text>
        </Modal.Header>
        <Modal.Footer>
          <Button onPress={handleJoin} isLoading={isJoining} disabled={isJoining}>
            Join
          </Button>
          <Button onPress={handleLeave} disabled={isJoining}>
            Leave
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default JoinGroupModal;