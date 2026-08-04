import { db } from '@config/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  Timestamp,
} from 'firebase/firestore';
import { VIPSubscription, Payment, VIPCode } from '@types/index';

export class PaymentService {
  // Get user's VIP subscription
  static async getUserVIPSubscription(userId: string): Promise<VIPSubscription | null> {
    try {
      const q = query(
        collection(db, 'vipSubscriptions'),
        where('userId', '==', userId),
        where('status', '==', 'active')
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) return null;
      return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as VIPSubscription;
    } catch (error) {
      throw error;
    }
  }

  // Create payment
  static async createPayment(
    userId: string,
    amount: number,
    paymentMethod: 'mvola' | 'orange-money' | 'airtel-money',
    phoneNumber: string
  ): Promise<string> {
    try {
      const payment: Payment = {
        id: '',
        userId,
        amount,
        currency: 'MGA',
        paymentMethod,
        status: 'pending',
        reference: `PAY-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const docRef = await setDoc(doc(collection(db, 'payments')), payment);
      return payment.reference;
    } catch (error) {
      throw error;
    }
  }

  // Validate VIP code
  static async validateVIPCode(code: string, userId: string): Promise<boolean> {
    try {
      const q = query(
        collection(db, 'vipCodes'),
        where('code', '==', code),
        where('isActive', '==', true)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) return false;

      const vipCode = snapshot.docs[0].data() as VIPCode;
      if (vipCode.expiresAt.getTime() < Date.now()) return false;
      if (vipCode.usedCount >= vipCode.maxUses) return false;

      // Create VIP subscription
      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + vipCode.duration);

      const subscription: VIPSubscription = {
        id: '',
        userId,
        plan: 'yearly',
        price: 0,
        currency: 'MGA',
        startDate: new Date(),
        expiresAt,
        autoRenew: false,
        paymentMethod: 'mvola',
        status: 'active',
      };

      await setDoc(doc(collection(db, 'vipSubscriptions')), subscription);

      // Increment usage count
      await updateDoc(doc(db, 'vipCodes', snapshot.docs[0].id), {
        usedCount: vipCode.usedCount + 1,
      });

      return true;
    } catch (error) {
      throw error;
    }
  }

  // Get payment history
  static async getPaymentHistory(userId: string): Promise<Payment[]> {
    try {
      const q = query(collection(db, 'payments'), where('userId', '==', userId));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Payment));
    } catch (error) {
      throw error;
    }
  }
}
