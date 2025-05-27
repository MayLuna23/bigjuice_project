import "./ConfirmationMessage.css"

export function ConfirmationMessage({children, height, width}) {
  return (
    <div  className="confirmation-message-component">
      <div style={{height: height, width: width}} className="confirmation-message">
        {children}
      </div>
    </div>
  );
}
