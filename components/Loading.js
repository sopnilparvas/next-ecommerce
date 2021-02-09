const Loading = () => {
  return (
    <div
      className='d-flex justify-content-center align-items-center position-fixed w-100 h-100'
      style={{ background: "rgba(0, 0,0, 0.6)", color: "#fff", top: "0", left: "0", zIndex: 9 }}
    >
      <div className='spinner-border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
