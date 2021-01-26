import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal, ModalBody, ModalFooter, Button,
} from 'reactstrap';

const ModalComponent = ({ toggle, modal, confirmDelete }) => (
  <Modal
    isOpen={modal}
    toggle={toggle}
  >
    <ModalBody>
      Tem certeza que deseja excluir este produto?
    </ModalBody>
    <ModalFooter>
      <Button color="danger" onClick={confirmDelete}>Confirmar</Button>
      {' '}
      <Button color="primary" onClick={toggle}>Cancelar</Button>
    </ModalFooter>
  </Modal>
);

ModalComponent.propTypes = {
  toggle: PropTypes.func.isRequired,
  modal: PropTypes.bool.isRequired,
  confirmDelete: PropTypes.func.isRequired,
};

export default ModalComponent;
