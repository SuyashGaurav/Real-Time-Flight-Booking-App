import "./Error.css"
const Error = () => {
  return (
    <>
      <div className="container">
        <div className="error-code">404</div>
        <div className="error-message">Page Not Found</div>
      </div>
      <img
        src="https://cdn.pixabay.com/photo/2014/04/02/10/58/airplane-305087_1280.png"
        alt="plane"
        className="plane"
      ></img>
    </>
  );
};

export default Error;
