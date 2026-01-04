import React from 'react';
import getUserRole from '../../../utils/getUserRole';

import Spinner from '../../../utils/Spinner';
import UserDashHome from './UserDashHome';
import HostDashHome from './HostDashHome';

const DashboardHome = () => {
  const role = getUserRole();

  if (!role) {
    return (
      <div>
        <Spinner></Spinner>
      </div>
    );
  }

  return (
    <div>
      {role === 'user' && <UserDashHome />}
      {role === 'host' && <HostDashHome />}
    </div>
  );
};

export default DashboardHome;
