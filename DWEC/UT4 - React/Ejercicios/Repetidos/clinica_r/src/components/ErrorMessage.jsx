function ErrorMessage({ mensaje }) {
  return (
    <div
      style={{
        padding: "12px",
        background: "#ffdddd",
        border: "1px solid #ff8888",
        borderRadius: "6px",
        marginTop: "10px",
      }}
    >
      <strong>Error:</strong> {mensaje}
    </div>
  );
}

export default ErrorMessage;
