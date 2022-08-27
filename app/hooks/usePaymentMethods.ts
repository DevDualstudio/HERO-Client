import React, { useEffect, useState } from 'react';
import PaymentMethodService from '../services/PaymentMethodService';
import { PaymentMethod } from '../types/PaymentMethod';

interface usePaymentMethodsProps {
  onPaymentMethodLoad?: (paymentMethods: PaymentMethod[]) => void;
}

const usePaymentMethods = ({ onPaymentMethodLoad }: usePaymentMethodsProps) => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const paymentMethods = await PaymentMethodService.get();
        setPaymentMethods(paymentMethods);
        onPaymentMethodLoad && onPaymentMethodLoad(paymentMethods);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isLoadingPaymentMethods: isLoading, paymentMethods };
};
export default usePaymentMethods;
