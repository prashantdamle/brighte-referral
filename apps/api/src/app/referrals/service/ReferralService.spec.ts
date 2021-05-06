import referralRepository from '../repository/ReferralRepository';
import { Referral } from '@prisma/client';
import ReferralService from '../service/ReferralService';

jest.mock('../repository/ReferralRepository');


describe('Referrals Service', () => {
    const mockReferrals = [
          {
              "id": 1,
              "createdAt": "Tue May 04 2021 02:17:56 GMT+1000 (Australian Eastern Standard Time)",
              "updatedAt": "Tue May 04 2021 02:17:56 GMT+1000 (Australian Eastern Standard Time)",
              "givenName": "John",
              "surName": "Doe",
              "email": "testing@brighte.com.au",
              "phone": "0456123123",
              "addressLine": null,
              "suburb": null,
              "state": null,
              "postCode": null,
              "country": null
          },
          {
              "id": 2,
              "createdAt": "Tue May 04 2021 02:17:56 GMT+1000 (Australian Eastern Standard Time)",
              "updatedAt": "Tue May 04 2021 02:17:56 GMT+1000 (Australian Eastern Standard Time)",
              "givenName": "Awesome",
              "surName": "Dev",
              "email": "your.name@gmail.com",
              "phone": "0456234345",
              "addressLine": null,
              "suburb": null,
              "state": null,
              "postCode": null,
              "country": null
          }
    ];

    let referralService: ReferralService;

    beforeEach(function() {
        referralService = new ReferralService();
    });

    it('should return all referrals as array', async (done) => {
        (referralRepository.getAllReferrals as jest.Mock).mockResolvedValue(mockReferrals);

        const referrals = await referralService.getAllReferrals();

        expect(referrals.length).toEqual(2);
        done();
    });

    it('should return referral based on id', async (done) => {
        (referralRepository.getReferralById as jest.Mock).mockReturnValue(Promise.resolve(mockReferrals[1]));

        const referral = await referralService.getReferralById(2);

        expect(referral.givenName).toBe('Awesome');
        expect(referral.surName).toBe('Dev');
        expect(referral).toBeDefined();
        done();
    });

});
