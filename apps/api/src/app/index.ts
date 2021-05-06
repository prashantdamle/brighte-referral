import * as cors from 'cors';
import * as express from 'express';
import ReferralController from './referrals/controller/ReferralController';
import { createSchema, patchSchema } from './referrals/validator/ReferralValidator';
import { checkSchema } from 'express-validator';

const app = express();
const referralController = new ReferralController();

app.use(cors());
app.use(express.json());

app.get('/referrals', referralController.getAllReferrals.bind(referralController));
app.get('/referrals/:id', referralController.getReferralById.bind(referralController));
app.patch('/referrals/:id', checkSchema(patchSchema), referralController.updateReferralById.bind(referralController));
app.delete('/referrals/:id', referralController.deleteReferralById.bind(referralController));
app.post('/referrals/', checkSchema(createSchema), referralController.createReferral.bind(referralController));

export default app;
