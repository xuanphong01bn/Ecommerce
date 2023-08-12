import React, { useState } from "react";
import Maps from "./Maps";
import { Row, Col } from "antd";
import SearchBox from "./SearchBox";
const MapSearch = ({ setAddredd, address }) => {
  const [selectPosition, setSelectPosition] = useState(null);

  return (
    <div
      style={{
        display: "flex",
        // flexDirection: "row",
        width: "800px",
        height: "300px",
      }}
    >
      <div style={{ width: "300px" }}>
        <SearchBox
          selectPosition={selectPosition}
          setSelectPosition={setSelectPosition}
          setAddredd={setAddredd}
        />
      </div>
      <div style={{ width: "400px", height: "100%" }}>
        <Maps selectPosition={selectPosition} />
      </div>
      {/* <Row>
        <Col span={12}>
          <div>
            <SearchBox
              selectPosition={selectPosition}
              setSelectPosition={setSelectPosition}
            />
          </div>
        </Col>
        <Col span={12}>
          {" "}
          <div>
            <Maps selectPosition={selectPosition} />
          </div>
        </Col>
      </Row> */}
    </div>
  );
};

export default MapSearch;
