import "./PopUp.css";

export function PopUp({ message, closeMessage }) {
  return (
    <div className="main-popup-container">
      <div className="popup-container">
        <p className="close-button" onClick={closeMessage}>X</p>
        <p>{message}</p>
      </div>
    </div>
  );
}
