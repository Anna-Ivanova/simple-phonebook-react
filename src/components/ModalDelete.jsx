import { Modal, Button } from 'react-bootstrap';

function ModalDelete({ show, handleClose, handleDelete, user }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Удалить контакт</Modal.Title>
            </Modal.Header>
            <Modal.Body>Вы действительно хотите удалить {user.name}?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Отмена
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Удалить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalDelete;
