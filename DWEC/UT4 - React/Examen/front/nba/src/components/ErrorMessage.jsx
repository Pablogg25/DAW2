import React from "react";

function ErrorMessage({ error }) {
  return (
    <>
      {error && (
        <div
          style={{
            background: "#ffdddd",
            padding: "10px",
            border: "1px solid #ff8888",
            marginBottom: "10px",
            borderRadius: "4px",
          }}
        >
          {error}
        </div>
      )}
    </>
  );
}

export default ErrorMessage;
