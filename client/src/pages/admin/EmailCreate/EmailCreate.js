import React, { useRef, useState, useEffect } from "react";
import ButtonCore from "../../../core/ButtonCore";
import PrintPDF from "./PrintPDF";
import "./style.css";
import ReactToPrint from "react-to-print";
import TestInvoice from "./TestInvoice";
import { Button, Modal, message } from "antd";
import { checkFile, sendEmail } from "../../../functions/admin";
const EmailCreate = ({ record }) => {
  console.log("Check record :", record);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [key, setKey] = useState(0);
  const [isDownloadEmail, setIsDownloadEmail] = useState(false);
  const [isSendEmail, setIsSendEmail] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setKey((prev) => prev + 1);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setKey((prev) => prev + 1);
  };
  const refPrint = useRef();
  useEffect(() => {
    checkFile(`D:/Invoice/${record?.code}.pdf`)
      .then((res) => {
        console.log("checkFile :", res);
        setIsDownloadEmail(res?.data?.ok);
      })
      .catch((e) => message.error(e));
    // setIsDownloadEmail(check)
  }, []);
  const handleSendEmail = async () => {
    await sendEmail({
      email: record?.orderedBy?.email,
      subject: "Cảm ơn bạn đã mua hàng tại Phong Shop",
      content:
        "Cảm ơn bạn đã mua hàng ! Chúc bạn một ngày vui vẻ ! Dưới đây là hoá đơn của bạn !!",
      path: `D:/Invoice/${record?.code}.pdf`,
    }).then(() => {
      setIsSendEmail(true);
      message.success("Đã gửi Email đến khách hàng !");
    });
  };
  return (
    <div key={key}>
      {isDownloadEmail ? (
        !isSendEmail ? (
          <ButtonCore text="Gửi" onClick={() => handleSendEmail()}></ButtonCore>
        ) : (
          <ButtonCore text="Đã gửi"></ButtonCore>
        )
      ) : (
        <ButtonCore text="Tạo" type="primary" onClick={showModal}></ButtonCore>
      )}
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        footer={[
          <ReactToPrint
            trigger={() => <button>Print this out!</button>}
            content={() => refPrint.current}
          />,
        ]}
      >
        <div ref={refPrint}>
          <TestInvoice record={record} />
        </div>
      </Modal>
    </div>
  );
};

export default EmailCreate;
