import React, { useEffect, useState } from 'react';
import { ReferralTable } from '../../components/ReferralTable';
import { Referral } from '../../types/referral';
import style from './ReferralList.module.css';

const ReferralList: React.FC = () => {
  const [referrals, setReferrals] = useState<Referral[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/referrals')
      .then((r) => r.json())
      .then(setReferrals);
  }, []);

  const onDeleteSave = (referralData: Referral) => {
    fetch(`http://localhost:3333/referrals/${referralData?.id}`, {
        method: 'DELETE'
    }).then(r => {
        if(!r.ok){
        throw Error;
        }
        const newReferrals = referrals.filter(function(item) {
            return item.id !== referralData?.id;
        });
        setReferrals(newReferrals);
    }).catch((e) =>
        console.log('something went wrong while deleting')
    );
  }

  const onEditSave = (referralData: Referral) => {
    fetch(`http://localhost:3333/referrals/${referralData?.id}`, {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          method: 'PATCH',
          body: JSON.stringify(referralData)
      }).then(r => {
          if(!r.ok){
          throw Error;
          }
          const newReferrals = referrals.map(obj => (obj.id === referralData?.id)? {...obj, ...referralData}: obj);
          setReferrals(newReferrals);
      }).catch((e) =>
          console.log('something went wrong while editing')
    );
  }

  return (
    <div className={style.frame}>
      <ReferralTable referrals={referrals} onDeleteSave={onDeleteSave} onEditSave={onEditSave}/>
    </div>
  );
};

export { ReferralList };
