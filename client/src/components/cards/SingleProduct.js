import React, { useState } from "react";
import { Card, Row, Col, Tabs, Image } from "antd";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import ListItemsSpec from "./ListItemsSpec";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import ButtonCore from "../../core/ButtonCore";
import SimilarProduct from "./SimilarProduct";
const { Meta } = Card;
const { TabPane } = Tabs;
const SingleProduct = ({ product }) => {
  console.log("product props:", product);
  const { title, description, images, slug } = product;
  const specDes = description?.split("/");
  const { user, cart } = useSelector((state) => state);
  const [seeMore, setSeeMore] = useState(false);
  const dispatch = useDispatch();
  const spec = [
    "Chip",
    "Ram",
    "Ổ Cứng",
    "Màn hình",
    "Hệ điều hành",
    "Card màn hình",
  ];
  const handleAddToCart = () => {
    alert("add");
    // create cart array
    let cartRedux = [];
    if (localStorage.getItem("cartRedux")) {
      cartRedux = JSON.parse(localStorage.getItem("cartRedux"));
    }
    // push new product
    cartRedux.push({
      ...product,
      count: 1,
    });

    //remove duplicates
    let unique = _.uniqWith(cartRedux, _.isEqual); // take object unique

    // save to local storage
    localStorage.setItem("cartRedux", JSON.stringify(unique));
    // add to redux
    dispatch({
      type: "ADD_TO_CART",
      payload: cartRedux,
    });
  };
  return (
    <div>
      <div>
        <div
          style={{
            // background: "#538af2",
            padding: "8px",
            fontSize: "24px",
            color: "black",
          }}
        >
          {title}
        </div>

        <div style={{ color: "#939191", marginLeft: "8px" }}>{description}</div>
      </div>

      <div style={{ borderTop: "1px solid rgba(0,0,0,0.2)" }}>
        <Row>
          <Col span={14}>
            <div style={{ marginTop: "24px" }}>
              <Carousel showArrows={true} infiniteLoop autoPlay>
                {images?.map((item) => (
                  <div>
                    <img src={item?.url} key={item.public_id} />
                    {/* <p className="legend">Legend 1</p> */}
                  </div>
                ))}
              </Carousel>
            </div>
            {/* <Tabs type="card">
              <Tabs.TabPane tab="Descriptions" key="item-1">
                {description && description}
              </Tabs.TabPane>
              <Tabs.TabPane tab="More" key="item-2">
                {description && description}
              </Tabs.TabPane>
            </Tabs> */}
          </Col>
          <Col span={10}>
            <Card
              actions={[
                <div
                  style={{
                    padding: "8px 0px 12px 0px",
                    marginLeft: "24px",
                    background: "#538af2",
                    color: "white",
                    fontSize: "16px",
                  }}
                  onClick={() => handleAddToCart()}
                >
                  <ShoppingCartOutlined style={{ fontSize: "32px" }} />{" "}
                  <div>Add To Cart</div>
                </div>,
                <div
                  style={{
                    padding: "8px 0px 12px 0px",
                    marginRight: "24px",
                    background: "#eb2f96",
                    color: "white",
                    fontSize: "16px",
                  }}
                >
                  <HeartOutlined style={{ fontSize: "32px" }} />{" "}
                  <div>Wishlist</div>
                </div>,
              ]}
            >
              {product && <ListItemsSpec product={product} />}
            </Card>
          </Col>
        </Row>
      </div>
      <div>{<SimilarProduct product={product} />}</div>
      <div>
        <Row>
          <Col span={16}>
            <div
              style={{
                backgroundColor: "white",
                padding: "12px",
                borderRadius: "12px",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                height: seeMore ? "" : "270px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#3366cc",
                  textTransform: "uppercase",
                  paddingBottom: "12px",
                  background: "white",
                }}
              >
                Đặc điểm nổi bật
              </div>
              <div
                style={{
                  textAlign: "justify",
                  padding: "12px",
                  color: "rgba(0,0,0,0.8)",
                  background: "white",
                }}
              >
                <div style={{ fontSize: "21px", fontWeight: "700" }}>
                  {title} - Hình ảnh sắc nét, chân thật
                </div>
                <div>
                  {title} với thiết kế mỏng nhẹ vô cùng đẹp mắt và sang trọng.
                  Laptop với màn hình lớn cùng hiệu năng mạnh mẽ, giúp cho người
                  dùng có được trải nghiệm sử dụng tối ưu. Chiếc
                  {title}này đáp ứng tốt nhu cầu sử dụng của người dùng nhờ CPU
                  mạnh mẽ.
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    padding: "12px 0",
                  }}
                >
                  Hiệu năng mạnh mẽ
                </div>
                <div>
                  {title} được sở hữu hiệu năng mạnh mẽ nhờ sở hữu CPU{" "}
                  {specDes?.[0]}. Laptop sẽ có thể vận hành tốt các tác vụ văn
                  phòng, ngoài ra laptop còn có RAM {specDes?.[1]} cho đa nhiệm
                  mượt mà.
                </div>
                <div>
                  <Image src={images?.[0]?.url} preview={false} />
                </div>
                <div>
                  Các hoạt động học tập, giải trí và làm việc của bạn sẽ được
                  nâng cao hiệu suất hơn nhờ hiệu năng của {title}. Với ổ cứng{" "}
                  {specDes?.[2]} SSD giúp hỗ trợ một không gian lưu trữ lớn hơn.
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    padding: "12px 0",
                  }}
                >
                  Thiết kế sang trọng
                </div>
                <div>
                  {title} sở hữu cho mình màn hình kích thước lên đến{" "}
                  {specDes?.[3]} cho hiển thị nhiều hơn. Màn hình lớn cùng tỉ lệ
                  màn hình giúp cho bạn có góc nhìn rộng hơn, thoải mái sử dụng
                  cho học tập, công việc và giải trí.
                </div>
                <div>
                  <Image src={images?.[1]?.url} preview={false} />
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    padding: "12px 0",
                  }}
                >
                  Mua ngay {title} tại Shopping Fun
                </div>
                <div>
                  Chỉ với những thao tác đơn giản, bạn có thể dễ dàng sở hữu một
                  chiếc {title}. Hãy đặt hàng ngay thôi !
                </div>
              </div>
              <div
                style={{
                  textAlign: "center",
                  position: "absolute",
                  bottom: "0",
                  marginLeft: "45%",
                }}
              >
                <ButtonCore
                  isGhost={true}
                  text={seeMore ? "Thu gọn" : "Xem thêm"}
                  onClick={() => setSeeMore(!seeMore)}
                />
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div
              style={{
                backgroundColor: "white",
                padding: "12px",
                borderRadius: "12px",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                width: "95%",
                marginLeft: "12px",
              }}
            >
              <div
                style={{
                  color: "#363636",
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "1.125",
                }}
              >
                Thông số kĩ thuật
              </div>
              <div
                style={{
                  borderRadius: "12px",
                  marginTop: "8px",
                  border: "1px solid #F2F2F2",
                  overflow: "hidden",
                }}
              >
                {spec?.map((item, index) => (
                  <div
                    className="display-flex-center"
                    style={{
                      padding: "8px",
                      background: index % 2 == 0 ? "#F2F2F2" : "white",
                    }}
                  >
                    <div style={{ width: "50%" }}>{item}</div>
                    <div>{specDes?.[index]}</div>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SingleProduct;
