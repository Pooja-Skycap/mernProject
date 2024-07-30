import "./ErrorStyle.css";

const Error = ({ error }: { error: string }) => {
  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <div className="message">{error}</div>
    </div>
  );
};

export default Error;
