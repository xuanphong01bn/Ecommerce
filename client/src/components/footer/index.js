import React from "react";
import ContainerPage from "../../core/ContainerPage";
import { Row, Col } from "antd";
import FooterCol from "./FooterCol";
const Footer = () => {
  return (
    <ContainerPage>
      <Row style={{ padding: "24px" }}>
        <Col span={6}>
          <FooterCol
            title={"Tổng đài hỗ trợ miễn phí"}
            content={`Gọi mua hàng <span style="font-weight:500">0978305201</span> (7h30
            - 22h00) 
            Gọi khiếu nại <span style="font-weight:500">0978305201</span> (7h30 - 22h00) 
            Gọi bảo hành <span style="font-weight:500">0978305201</span> (7h30 -
            22h00)`}
          />
        </Col>
        <Col span={6}>
          <FooterCol
            title={"Thông tin và chính sách"}
            content={`Mua hàng và thanh toán Online
            Mua hàng trả góp Online
            Tra thông tin đơn hàng
            Tra điểm Smember
            Xem ưu đãi Smember
            Tra thông tin bảo hành
            Tra cứu hoá đơn điện tử
            Thông tin hoá đơn mua hàng
            Trung tâm bảo hành chính hãng
            Quy định về việc sao lưu dữ liệu
            `}
          />
        </Col>
        <Col span={6}>
          <FooterCol
            title={"Dịch vụ và thông tin khác"}
            content={`Khách hàng doanh nghiệp (B2B)
            Ưu đãi thanh toán
            Quy chế hoạt động
            Chính sách Bảo hành
            Liên hệ hợp tác kinh doanh
            Tuyển dụng
            Dịch vụ bảo hành điện thoại
            Dịch vụ bảo hành mở rộng`}
          />
        </Col>
        <Col span={6}>
          <FooterCol
            title={"Mạng xã hội"}
            content={`Facebook
            Youtube
            Tiktok
            `}
          />
        </Col>
      </Row>
    </ContainerPage>
  );
};

export default Footer;
