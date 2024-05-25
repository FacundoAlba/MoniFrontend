import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#__next");

const NotificationModal = ({
  isOpen,
  onRequestClose,
  status,
  userName,
  amount,
}) => {
  const getMessage = () => {
    switch (status) {
      case "approve":
        return {
          title: `¡Felicidades ${userName}!`,
          message: `Tenés un préstamo preaprobado por el monto de ${amount}!`,
          image: "/moni-exito.svg",
        };
      case "rejected":
        return {
          title: "No puedo otorgarte un prestamo",
          message:
            "No reunis las condiciones necesarias para solicitar un prestamo",
          image: "/moni-rechazo.svg",
        };
      default:
        return {
          title: "Ocurrió un error",
          message: "Estado de préstamo desconocido",
          image: "/moni-error.svg",
        };
    }
  };

  const { message, image, title } = getMessage();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Notification Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <img src={image} alt={status} className="modal-image" />
      <div className="modal-content">
        <h2 className="txt-subtitle">{title}</h2>
        <p>{message}</p>
        <button onClick={onRequestClose} className="btn btn-accent">
          Aceptar
        </button>
      </div>
    </Modal>
  );
};

export default NotificationModal;
