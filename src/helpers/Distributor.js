import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../context/auth.js';
import role from '../utils/role.js';
import { useExpService } from '../context/expService.js';

const Distributor = () => {
  const [ planId, setPlanId ] = useState(null);
  const exposureService = useExpService();
  const user = useAuth();

  useEffect(() => {
    if (user && user.role === role.employee) {
      exposureService.getAll('plans')
        .then(({ plans: [plan] }) => setPlanId(plan.id));
    } else {
      setPlanId('all');
    }
  }, [ exposureService, user]);

  if (!user) {
    return (<Redirect to='/login' />);
  }

  if (user.role === role.employee && planId !== null) {
    return (<Redirect to={`/plans/${planId}`} />);
  }

  if (planId === 'all') {
    return (<Redirect to={`/plans/`} />);
  }

  return (
    <div>
    </div>
  );
};

export default Distributor;