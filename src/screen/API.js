import { StripeProvider } from '@stripe/stripe-react-native';
import PaymentScreen from './testPayment';
function API() {
  return (
    <StripeProvider
      publishableKey={'pk_test_51M1pclD3uxL97LN2uOfthG4VuHXYmIgWMRTdS0tzDCiPn1nriltBzghEE7tAV3OcL2ATut1Lrmk4Ruvi0TxiZPrw00lfaKv91m'}
    >
      <PaymentScreen />
    </StripeProvider>
  );
}
export default API;