import React from "react";
import { formatNumberWithCommas } from "../../shared/util/formatCommas";
const styleItem = {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 0px",
};

const ListItemsSpec = ({ product }) => {
  const { price, category, subs, shipping, color, brand, quantity, sold } =
    product;
  const subList = (spec) => {
    return (
      <div style={styleItem}>
        <span>{spec.charAt(0).toUpperCase() + spec.slice(1)}</span>{" "}
        <span>{product[spec]}</span>
      </div>
    );
  };
  return (
    <div style={{ padding: "24px" }}>
      {price && (
        <div style={{ ...styleItem }} className="display-flex-items">
          <span>Price</span>{" "}
          <span style={{ fontSize: "20px", fontWeight: "600" }}>
            {formatNumberWithCommas(+price)}đ
          </span>
        </div>
      )}
      {category && (
        <div style={styleItem}>
          <span>Categories</span> <span>{category?.name}</span>
        </div>
      )}
      {subs && (
        <div style={styleItem}>
          <span>Subs Categories</span>{" "}
          <span>
            {subs?.map((item) => (
              <span style={{ color: "#1677ff" }}>{item?.name} </span>
            ))}
          </span>
        </div>
      )}
      {shipping && (
        <div style={styleItem}>
          <span>Shipping</span> <span>{shipping}</span>
        </div>
      )}
      {subList("color")}
      {subList("brand")}
      {subList("quantity")}
      {subList("sold")}
    </div>
  );
};

export default ListItemsSpec;
