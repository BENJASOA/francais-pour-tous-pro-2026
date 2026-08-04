class PaymentServiceClass {
  async createPayment(
    userId: string,
    amount: number,
    method: string,
    phoneNumber: string
  ) {
    try {
      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          amount,
          method,
          phoneNumber,
        }),
      });

      if (!response.ok) {
        throw new Error('Payment creation failed');
      }

      return await response.json();
    } catch (error) {
      throw new Error('Failed to create payment');
    }
  }

  async validateVIPCode(code: string, userId: string) {
    try {
      const response = await fetch('/api/payments/validate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, userId }),
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      return data.valid;
    } catch (error) {
      return false;
    }
  }

  async verifyPayment(transactionId: string) {
    try {
      const response = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionId }),
      });

      if (!response.ok) {
        throw new Error('Payment verification failed');
      }

      return await response.json();
    } catch (error) {
      throw new Error('Failed to verify payment');
    }
  }
}

export const PaymentService = new PaymentServiceClass();
