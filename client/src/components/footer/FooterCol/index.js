import React from "react";

const FooterCol = ({ title, content }) => {
  return (
    <div>
      <div
        style={{
          fontSize: "16px",
          fontWeight: "500",
        }}
      >
        {title}
      </div>
      <div
        style={{ fontSize: "12px", padding: "12px", lineHeight: "24px" }}
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
};

export default FooterCol;
