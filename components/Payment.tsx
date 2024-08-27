import { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { useStripe } from "@stripe/stripe-react-native";
import { Alert } from "react-native";
import { fetchAPI } from "@/lib/fetch";
import { PaymentProps } from "@/types/type";

const Payment: React.FC<PaymentProps> = ({
  amount,
  driverId,
  email,
  fullName,
  rideTime,
}) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const [success, setSuccess] = useState<boolean>(false);

  const openPaymentSheet = async () => {
    await initializePaymentSheet();

    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert("Error: ", `${error.code}, ${error.message}`);
    } else {
      setSuccess(true);
    }
  };

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`https://api.stripe.com/payment-sheet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const confirmHandler = async (
    paymentMethod: any,
    _: any,
    intentCreationCallback: any
  ) => {
    // Make a request to your own server.
    const { paymentIntent, customer } = await fetchAPI(
      "/(api)/(stripe)/create",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: fullName || email.split("@")[0],
          email,
          amount,
          paymentMethodId: paymentMethod?.id,
        }),
      }
    );

    if (paymentIntent.client_secret) {
      const { result } = await fetchAPI("/(api)/(stripe)/pay", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          payment_method_id: paymentMethod.id,
          payment_intent_it: paymentIntent.id,
          customer_id: customer,
        }),
      });

      if (result.client_secret) {
      }
    }

    const { clientSecret, error } = await response.json();

    if (clientSecret) {
      intentCreationCallback({ clientSecret });
    } else {
      intentCreationCallback({ error });
    }
  };

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      intentConfiguration: {
        mode: {
          amount: 1099,
          currencyCode: "USD",
        },
        confirmHandler: confirmHandler,
      },
    });
    if (error) {
      // handle error
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <>
      <CustomButton
        title="Confirm Button"
        className="mt-4"
        onPress={openPaymentSheet}
      />
    </>
  );
};

export default Payment;
