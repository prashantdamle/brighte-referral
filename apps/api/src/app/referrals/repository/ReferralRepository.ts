import { _ } from 'lodash';
import prisma from '../config/DbClient';
import { Referral } from '@prisma/client';

export class ReferralRepository {

    private static instance: ReferralRepository;

    private constructor(){
    }

    public static getInstance(): ReferralRepository {
        if (!ReferralRepository.instance) {
            ReferralRepository.instance = new ReferralRepository();
        }
        return ReferralRepository.instance;
    }

    async getAllReferrals(): Promise<Referral[]> {
      return await prisma.referral.findMany();
    }

    async getReferralById(id: number): Promise<Referral> {
      return await prisma.referral.findUnique({
        where: { id: Number(id) },
      });
    }

    async getReferralByEmail(email: string): Promise<Referral> {
      return await prisma.referral.findUnique({
        where: { email: email },
      });
    }

    async updateReferralById(id: number, referral: Referral): Promise<Referral> {
      return await prisma.referral.update({
        where: { id: Number(id) },
        data: _.pickBy(referral, _.identity),
      })
    }

    async deleteReferralById(id: number): Promise<Referral> {
      return await prisma.referral.delete({
        where: { id: Number(id) }
      })
    }

    async createReferral(referral: Referral): Promise<Referral> {
      return await prisma.referral.create({
        data: _.pickBy(referral, _.identity),
      })
    }
}

const referralRepository = ReferralRepository.getInstance();

export default referralRepository;

