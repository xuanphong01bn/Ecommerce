import React from "react";
import "./style.css";
import { formatDateTime } from "../../../shared/util/formatTime";
import {
  PhoneOutlined,
  ContactsOutlined,
  HomeOutlined,
} from "@ant-design/icons";
const TestInvoice = ({ record }) => {
  const total = record?.products
    ?.map((item) => item?.count * item?.product?.price)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  return (
    <div>
      <div class="invoice-2 invoice-content">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="invoice-inner clearfix">
                <div class="invoice-info clearfix" id="invoice_wrapper">
                  <div class="invoice-headar">
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="invoice-logo">
                          <div class="logo">
                            {/* <img src="assets/img/logos/logo.png" alt="logo" /> */}
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="invoice-id">
                          <div class="info">
                            <h1 class="inv-header-1">Invoice</h1>
                            <p class="mb-1">
                              Invoice Number: <span>{record?.code}</span>
                            </p>
                            <p class="mb-0">
                              Invoice Date:{" "}
                              <span>{formatDateTime(new Date())}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="invoice-top">
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="invoice-number mb-30">
                          <h4 class="inv-title-1">Invoice To</h4>
                          <h2 class="name">{record?.orderedBy.name}</h2>
                          <p class="invo-addr-1">
                            {record?.orderedBy.name} <br />
                            {record?.orderedBy.email} <br />
                            {record?.receiverInfo?.receiverInfo.address} <br />
                          </p>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="invoice-number mb-30">
                          <div class="invoice-number-inner">
                            <h4 class="inv-title-1">Invoice From</h4>
                            <h2 class="name">SHOPPING</h2>
                            <p class="invo-addr-1">
                              Shoping Inc <br />
                              shopping@gmail.com <br />
                              Hanoi, Vietnam <br />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="invoice-center">
                    <div class="table-responsive">
                      <table class="table mb-0 table-striped invoice-table">
                        <thead class="bg-active">
                          <tr class="tr">
                            <th>No.</th>
                            <th class="pl0 text-start">Item Description</th>
                            <th class="text-center">Price</th>
                            <th class="text-center">Quantity</th>
                            <th class="text-end">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {record?.products?.map((item, index) => (
                            <tr class="bg-grea">
                              <td>
                                <div class="item-desc-1">
                                  <span>{index + 1}</span>
                                </div>
                              </td>
                              <td class="pl0">{item?.product?.title}</td>
                              <td class="text-center">
                                ${item?.product?.price}
                              </td>
                              <td class="text-center">{item?.count}</td>
                              <td class="text-end">
                                ${item?.count * item?.product?.price}
                              </td>
                            </tr>
                          ))}

                          <tr class="tr2">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td class="text-center">SubTotal</td>
                            <td class="text-end">${total}</td>
                          </tr>
                          <tr class="tr2">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td class="text-center">Tax</td>
                            <td class="text-end">${total * 0.1}</td>
                          </tr>
                          <tr class="tr2">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td class="text-center f-w-600 active-color">
                              Grand Total
                            </td>
                            <td class="f-w-600 text-end active-color">
                              ${total * 1.1}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="invoice-bottom">
                    <div class="row">
                      <div class="col-lg-6 col-md-7 col-sm-7">
                        <div class="payment-method mb-30">
                          {/* <h3 class="inv-title-1">Payment Method</h3>
                          <ul class="payment-method-list-1 text-14"> */}
                          {/* <li>
                              <strong>Account No:</strong> 00 123 647 840
                            </li> */}
                          {/* <li>
                              <strong>Account Name:</strong>{" "}
                              {record?.orderedBy?.name}
                            </li> */}
                          {/* <li>
                              <strong>Branch Name:</strong> xyz
                            </li> */}
                          {/* </ul> */}
                        </div>
                      </div>
                      <div
                        class="col-lg-6 col-md-7 col-sm-7"
                        style={{ textAlign: "right" }}
                      >
                        {/* <div class="terms-conditions mb-30">
                          <h3 class="inv-title-1">Terms & Conditions</h3>
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy has
                          </p>
                        </div> */}
                        <div class="payment-method mb-30">
                          <h3 class="inv-title-1">Payment Method</h3>
                          <ul class="payment-method-list-1 text-14">
                            {/* <li>
                              <strong>Account No:</strong> 00 123 647 840
                            </li> */}
                            <li>
                              <strong>Account Name:</strong>{" "}
                              {record?.orderedBy?.name}
                            </li>
                            {/* <li>
                              <strong>Branch Name:</strong> xyz
                            </li> */}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="invoice-contact clearfix"
                    style={{
                      backgroundImage:
                        "linear-gradient(to bottom, #0095ff, #4a50f3)",
                    }}
                  >
                    <div class="row g-0">
                      <div class="col-sm-12">
                        <div
                          class="contact-info clearfix"
                          style={{
                            display: "flex",
                            justifyContent: "right",
                            color: "white",
                          }}
                        >
                          <a href="tel:+55-4XX-634-7071" class="d-flex">
                            {/* <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="1em"
                              viewBox="0 0 512 512"
                            >
                              <path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z" />
                            </svg>{" "} */}
                            <PhoneOutlined
                              style={{
                                fontSize: "30px",
                                backgroundColor: "white",
                                color: "rgb(14,136,253)",
                                height: "50px",
                                width: "50px",
                                paddingLeft: "8px",
                                borderRadius: "50px",
                                marginRight: "8px",
                              }}
                            />
                            <div style={{ color: "white" }}>+84 978305201</div>
                          </a>
                          <a href="tel:info@themevessel.com" class="d-flex">
                            <ContactsOutlined
                              style={{
                                fontSize: "30px",
                                backgroundColor: "white",
                                color: "rgb(14,136,253)",
                                height: "50px",
                                width: "50px",
                                paddingLeft: "8px",
                                borderRadius: "50px",
                                marginRight: "8px",
                              }}
                            />{" "}
                            <div style={{ color: "white" }}>
                              phongguyenphulam@gmail.com
                            </div>
                          </a>
                          <a
                            href="tel:info@themevessel.com"
                            class="mr-0 d-flex d-none-580"
                          >
                            <HomeOutlined
                              style={{
                                fontSize: "30px",
                                backgroundColor: "white",
                                color: "rgb(14,136,253)",
                                height: "50px",
                                width: "50px",
                                paddingLeft: "8px",
                                borderRadius: "50px",
                                marginRight: "8px",
                              }}
                            />{" "}
                            <div style={{ color: "white" }}>Hanoi, Vietnam</div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div class="invoice-btn-section clearfix d-print-none">
                  <a
                    href="javascript:window.print()"
                    class="btn btn-lg btn-print"
                  >
                    <i class="fa fa-print"></i> Print Invoice
                  </a>
                  <a
                    id="invoice_download_btn"
                    class="btn btn-lg btn-download btn-theme"
                  >
                    <i class="fa fa-download"></i> Download Invoice
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestInvoice;
