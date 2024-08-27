import { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { PaymentSheetError, useStripe } from "@stripe/stripe-react-native";
import { Alert } from "react-native";

const Payment: React.FC = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

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

  // const initializePaymentSheet = async () => {
  //   const { paymentIntent, ephemeralKey, customer } =
  //     await fetchPaymentSheetParams();

  //   const { error } = await initPaymentSheet({
  //     merchantDisplayName: "Example, Inc.",
  //     customerId: customer,
  //     returnURL: "myapp://stripe-redirect",
  //     customerEphemeralKeySecret: ephemeralKey,
  //     paymentIntentClientSecret: paymentIntent,
  //     allowsDelayedPaymentMethods: true,
  //     defaultBillingDetails: {
  //       name: "Jane Doe",
  //     },
  //   });
  //   if (!error) {
  //     setLoading(true);
  //   }
  // };

  const confirmHandler = async (paymentMethod, shouldSavePaymentMethod, intentCreationCallback) => {
    // Make a request to your own server.
    const myServerResponse = await fetch(...);
    // Call the `intentCreationCallback` with your server response's client secret or error
    const { clientSecret, error } = await response.json();
    if (clientSecret) {
      intentCreationCallback({clientSecret})
    } else {
      intentCreationCallback({error})
    }
  }

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
