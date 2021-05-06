import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Referral } from '@prisma/client';
import ReferralInDto from '../dto/ReferralInDto';
import ReferralOutDto from '../dto/ReferralOutDto';
import ReferralService from '../service/ReferralService';

export default class ReferralController {

    private referralService: ReferralService;

    constructor() {
        this.referralService = new ReferralService();
    }

    async getAllReferrals(req: Request, res: Response) {
      const referrals: Referral[] = await this.referralService.getAllReferrals();
      const referralOutDtos: ReferralOutDto[] = referrals.map(function(referral) {
        return ReferralOutDto.fromModel(referral);
      });
      res.json(referralOutDtos);
    }
    
    async getReferralById(req: Request, res: Response) {
      const { id }: { id?: number } = req.params;
      const referral: Referral = await this.referralService.getReferralById(id);

      // Return error if referral doesn't exist
      if (referral == null) {
        return res.status(404).json({ errors: [{msg: "Referral not found"}] });
      }

      res.json(ReferralOutDto.fromModel(referral));
    }
    
    async updateReferralById(req: Request, res: Response) {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Check if referral exists
      const { id }: { id?: number } = req.params;
      const referral: Referral = await this.referralService.getReferralById(id);

      if (referral == null) {
        return res.status(404).json({ errors: [{msg: "Referral does not exist"}] });
      }

      // Update referral
      const referralInDto: ReferralInDto = new ReferralInDto(req.body);

      var updatedReferral: Referral;
      try {
        updatedReferral = await this.referralService.updateReferralById(id, referralInDto.toModel());
      } catch(err) {
        return res.status(500).json({ errors: [{msg: "Internal server error"}] });
      }

      res.json(ReferralOutDto.fromModel(updatedReferral));
    }
    
    async deleteReferralById(req: Request, res: Response) {
      // Check if referral exists
      const { id }: { id?: number } = req.params;
      const referral: Referral = await this.referralService.getReferralById(id);

      if (referral == null) {
        return res.status(404).json({ errors: [{msg: "Referral does not exist"}] });
      }

      var deletedReferral: Referral;
      try {
        deletedReferral = await this.referralService.deleteReferralById(id);
      } catch(err) {
        return res.status(500).json({ errors: [{msg: "Internal server error"}] });
      }

      res.json(ReferralOutDto.fromModel(deletedReferral));
    }
    
    async createReferral(req: Request, res: Response) {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    
      const referralInDto: ReferralInDto = new ReferralInDto(req.body);
      const newReferral: Referral = await this.referralService.createReferral(referralInDto.toModel());
      res.json(ReferralOutDto.fromModel(newReferral));
    }
}


