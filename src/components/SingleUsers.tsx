import * as React from 'react';
import { useUsersByIds } from '../services/users-service';

const ids = ['1', '3', '5'];

const SingleUsers = () => {
  const [isActive, setIsActive] = React.useState(true);

  const usersQuery = useUsersByIds(ids, isActive);

  return (
    <div>
      <div>
        <button
          style={{ margin: '20px' }}
          onClick={() => setIsActive((prev) => !prev)}
        >
          {isActive ? 'Disable query' : 'Enable query'}
        </button>
      </div>
      {usersQuery.map((userQuery, index) => {
        if (userQuery.isFetching) {
          return <div key={index}>{'...'}</div>;
        }

        return <div key={index}>{userQuery.data?.name}</div>;
      })}
    </div>
  );
};

export default SingleUsers;
