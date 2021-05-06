import referralRepository from '../repository/ReferralRepository';
import { Referral } from '@prisma/client';

export default class ReferralService {

    async getAllReferrals(): Promise<Referral[]> {
      return await referralRepository.getAllReferrals();
    }

    async getReferralById(id: number): Promise<Referral> {
      return await referralRepository.getReferralById(id);
    }

    async updateReferralById(id: number, referral: Referral): Promise<Referral> {
      return await referralRepository.updateReferralById(id, referral);
    }

    async deleteReferralById(id: number): Promise<Referral> {
      return await referralRepository.deleteReferralById(id);
    }

    async createReferral(referral: Referral): Promise<Referral> {
      return await referralRepository.createReferral(referral);
    }
}
