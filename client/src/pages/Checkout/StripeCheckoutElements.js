import React, { useState, useEffect, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createPayment } from "../../functions/stripe";
import { useNavigate } from "react-router-dom";
import { createOrder, emptyUserCart } from "../../functions/user";
import { message } from "antd";
import { ReceiverContext } from "./StepsCheckout";
const StripeCheckout = ({ history }) => {
  const receiverInfo = useContext(ReceiverContext);
  console.log("Check receiver :", receiverInfo);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    createPayment().then((res) => {
      console.log("create payment intent", res.data);
      setClientSecret(res.data.clientSecret);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });
    if (payload.error) {
      setError("Payment failed");
      setProcessing(false);
    } else {
      console.log("Check payload :", payload);
      createOrder({
        paymentIntent: payload.paymentIntent,
        receiverInfo: receiverInfo,
      }).then((res) => {
        if (res?.data?.ok) {
          // empty card from local and database, redux
          localStorage.removeItem("cartRedux");

          // redux
          dispatch({
            type: "ADD_TO_CART",
            payload: [],
          });

          // database
          emptyUserCart()
            .then()
            .catch((err) => message.error(err));
        }
      });
      console.log(JSON.stringify(payload, null, 4));
      console.log("sucess");
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const handleChange = async (e) => {
    //
    setDisabled(e.empty); //
  };

  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <>
      {succeeded && (
        <div onClick={() => navigate("/user/history")}>
          Suceceesfull payment. Check purchase history
        </div>
      )}
      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
          type="submit"
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
      </form>
    </>
  );
};

export default StripeCheckout;
