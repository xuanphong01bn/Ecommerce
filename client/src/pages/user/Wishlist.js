import { Row, Col } from "antd";
import React from "react";
import UserNav from "../../components/nav/UserNav";
import ContainerPage from "../../core/ContainerPage";

const Wishlist = () => {
  return (
    <ContainerPage>
      <Row>
        <Col>
          <UserNav />
        </Col>
        <Col>user password update page</Col>
      </Row>
    </ContainerPage>
  );
};

export default Wishlist;
