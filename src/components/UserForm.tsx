import * as React from 'react';
import { useQueryClient } from 'react-query';
import User from '../models/User';
import { CK_USERS, useCreateUser } from '../services/users-service';

const UserForm = () => {
  const queryClient = useQueryClient();

  const [name, setName] = React.useState('');

  const { mutate, isLoading } = useCreateUser({
    onMutate: (name) => {
      const previousUsers = queryClient.getQueryData<User[]>(CK_USERS);

      queryClient.setQueryData<User[]>(CK_USERS, (old) => [
        ...(old ?? []),
        { name, id: 'temp' },
      ]);

      return { previousUsers };
    },
    onError: (err, varName, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData<User[]>(CK_USERS, context.previousUsers);
      }
    },
    onSuccess: (user, varName, context) => {
      setName('');
      if (context?.previousUsers) {
        queryClient.setQueryData<User[]>(CK_USERS, () => [
          ...(context.previousUsers ?? []),
          user,
        ]);
      }
    },
    onSettled: () => {
      console.log('Mutation finish');
    },
  });

  return (
    <div>
      <input
        disabled={isLoading}
        type="text"
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => mutate(name)}>{isLoading ? '...' : 'Save'}</button>
    </div>
  );
};

export default UserForm;
