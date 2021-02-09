function Toast({ message, handleClose, bgColor }) {
  return (
    <div
      className={`toast show position-fixed text-light ${bgColor}`}
      style={{ top: "5px", right: "5px", zIndex: 9, minWidth: "280px" }}
      role='alert'
      aria-live='assertive'
      aria-atomic='true'
    >
      <div className={`toast-header text-light ${bgColor}`}>
        <strong className='me-auto'>{message.title}</strong>
        <button
          onClick={handleClose}
          type='button'
          className='btn-close'
          data-bs-dismiss='toast'
          aria-label='Close'
        ></button>
      </div>
      <div className='toast-body'>{message.msg}</div>
    </div>
  );
}

export default Toast;
