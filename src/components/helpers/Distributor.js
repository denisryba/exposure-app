import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../context/auth.js';
import role from '../../utils/role.js';

const Distributor = ({ exposureService }) => {
  const [ planId, setPlanId ] = useState(null);
  const user = useAuth();

  useEffect(() => {
    if (user.role === role.employee) {
      getPlanIdForEmployee(user.id)
        .then(id => setPlanId(id));
    } else {
      setPlanId('all');
    }
  }, []);

  const getPlanIdForEmployee = async (id) => {
    const plan = await exposureService.getPlanForEmployee(id);
    return plan.id;
  };

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