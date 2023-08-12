import React, { useState } from "react";
import { Modal } from "antd";
const HeaderSelection = ({
  icon,
  title,
  padding,
  backgroundColor,
  colorText,
  childrenModal,
  isModal,
}) => {
  const Icon = () => ({ icon });
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <div
        className="display-flex-center"
        onClick={() => setIsModalOpen(isModal)}
        style={{
          gap: "4px",
          background: backgroundColor || "rgba(143, 154, 239, 0.67)",
          borderRadius: "8px",
          padding: padding || "9px 9px",
          cursor: "pointer",
        }}
      >
        {icon}
        {/* <ContainerOutlined style={{ fontSize: "20px", color: "#FFFFFF" }} />{" "} */}
        <div
          style={{ fontSize: "12px", color: colorText || "white" }}
          dangerouslySetInnerHTML={{ __html: title }}
        ></div>
      </div>
      <Modal
        open={isModalOpen}
        footer={[]}
        onCancel={() => setIsModalOpen(false)}
      >
        {childrenModal}
      </Modal>
    </div>
  );
};

export default HeaderSelection;
