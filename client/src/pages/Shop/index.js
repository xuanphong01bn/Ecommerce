import React, { useState, useEffect } from "react";
import HeaderSelection from "../../components/nav/HeaderSelection";
import ContainerPage from "../../core/ContainerPage";
import { getProductsByCount, getProductFilter } from "../../functions/product";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "react-query";
import ProductCard from "../../components/cards/ProductCard";
import { Card, Row, Col, Slider, Tag } from "antd";
import {
  MoneyCollectOutlined,
  FilterFilled,
  SlackOutlined,
  BookOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
const styleText = {
  fontSize: "18px",
  color: "#4A4A4A",
  fontWeight: "700",
  marginBottom: "8px",
};
const styleIcon = { fontSize: "15px", color: "#4A4A4A" };

const filterSort = [
  {
    icon: <LineChartOutlined style={styleIcon} />,
    title: "Giá Cao- Thấp",
  },
  {
    icon: <LineChartOutlined style={styleIcon} />,
    title: "Giá Thấp- Cao",
  },
];

const Shop = () => {
  const [priceRange, setPriceRange] = useState();
  const [keyPage, setKeyPage] = useState(0);
  const filterListBox = [
    {
      icon: <FilterFilled style={styleIcon} />,
      title: "Bộ lọc",
    },
    {
      icon: <MoneyCollectOutlined style={styleIcon} />,
      title: "Giá",
      childrenModal: (
        <div>
          <div>Chọn khoảng giá</div>
          <Slider
            range
            min={0}
            max={30000000}
            step={500}
            defaultValue={[0, 0]}
            // onChange={(value) => console.log(value)}
            onAfterChange={(value) => {
              console.log(value);
              setPriceRange(value);
            }}
          />
          <div>
            Khoảng giá: {priceRange?.[0] + "$" + " - " + priceRange?.[1] + "$"}
          </div>
        </div>
      ),
    },
    {
      icon: <BookOutlined style={styleIcon} />,
      title: "Category",
    },
    {
      icon: <SlackOutlined style={styleIcon} />,
      title: "Thương hiệu",
    },
  ];
  const [listProducts, setListProducts] = useState();

  useEffect(() => {
    getProductsByCount(12).then((res) => setListProducts(res?.data));
  }, []);
  const { search } = useSelector((state) => state);
  const { text, price } = search;
  const dispatch = useDispatch();
  console.log("price range :", priceRange);
  useEffect(() => {
    if (priceRange)
      dispatch({
        type: "SEARCH_QUERY",
        payload: { price: priceRange },
      });
  }, [priceRange]);
  useEffect(() => {
    const timer = setTimeout(
      () => getProductFilter(search).then((res) => setListProducts(res?.data)),
      10
    );
    return () => clearTimeout(timer);
  }, [search, dispatch]);
  console.log("length key :", search, Object.values(search)?.length);
  return (
    <ContainerPage>
      <div key={keyPage}>
        <Card>
          <div style={{ marginBottom: "16px" }}>
            <div style={styleText}>Chọn theo tiêu chí</div>
            <div
              className="display-flex-center"
              style={{ justifyContent: "flex-start", gap: "8px" }}
            >
              {filterListBox?.map((item) => (
                <HeaderSelection
                  isModal={true}
                  key={item}
                  title={item.title}
                  backgroundColor="rgb(243,244,246)"
                  padding="9px 9px"
                  colorText="#4A4A4A"
                  icon={item.icon}
                  childrenModal={item.childrenModal}
                />
              ))}
            </div>
            {Object.values(search)?.length ? (
              <div style={{ marginTop: "8px" }}>
                <div style={{ fontWeight: "500" }}>Tìm kiếm theo</div>
                <div>
                  {Object.keys(search)?.map((item) => (
                    <Tag
                      color="processing"
                      closable={true}
                      onClose={() => {
                        dispatch({
                          type: "DELETE_QUERY",
                          payload: item,
                        });
                        setKeyPage((prev) => prev + 1);
                      }}
                    >
                      {item}:{" "}
                      {item != "price"
                        ? search?.[item]
                        : `${search?.[item]?.[0]} $ - ${search?.[item]?.[1]} $`}
                    </Tag>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <div style={{ marginBottom: "16px" }}>
            <div style={styleText}>Sắp xếp theo</div>
            <div
              className="display-flex-center"
              style={{ justifyContent: "flex-start", gap: "8px" }}
            >
              {filterSort?.map((item) => (
                <HeaderSelection
                  key={item}
                  title={item.title}
                  backgroundColor="rgb(243,244,246)"
                  padding="9px 9px"
                  colorText="#4A4A4A"
                  icon={item.icon}
                />
              ))}
            </div>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <div style={styleText}>Danh sách sản phẩm</div>
            <div>
              {listProducts?.length < 1 ? (
                <div>Không có sản phẩm nào</div>
              ) : (
                <Row gutter={[16, 24]}>
                  {listProducts?.map((item) => (
                    <Col span={6}>
                      <ProductCard key={item} product={item} />
                    </Col>
                  ))}
                </Row>
              )}
            </div>
          </div>
        </Card>
      </div>
    </ContainerPage>
  );
};

export default Shop;
