import React from "react";

const Modal = (props) => {
  const [person, setPerson] = useState("");
  const [fake, setFake] = useState(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const Model1 = () => {
    return (
      <Modal opened={opened} onClose={() => setOpened(false)} centered>
        <ModalOpen />
      </Modal>
    );
  };
  return <div>Modal</div>;
};

export default Modal;
