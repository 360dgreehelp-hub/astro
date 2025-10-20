export type PaymentPlan = 'monthly' | 'full' | 'combo';

export type PaymentResult = {
  success: boolean;
  reference: string;
};

const PLAN_LABELS: Record<PaymentPlan, string> = {
  monthly: 'Monthly Plan – NPR 399',
  full: 'One-time Full Report – NPR 699',
  combo: 'Combo Plan – NPR 999',
};

export const initiateMockPayment = async (plan: PaymentPlan): Promise<PaymentResult> => {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return {
    success: true,
    reference: `KHALTI-${plan.toUpperCase()}-${Date.now()}`,
  };
};

export const describePlan = (plan: PaymentPlan): string => PLAN_LABELS[plan];
