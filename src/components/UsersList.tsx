import * as React from 'react';
import { useUsers } from '../services/users-service';

const UsersList = () => {
  const [page, setPage] = React.useState(1);

  /* const queryClient = useQueryClient(); */
  const { data: users, isFetching, error, isLoading } = useUsers(page);

  /* React.useEffect(() => {
    async function fetchNextPage(page: number) {
      const nextPage = page + 1;
      await queryClient.prefetchQuery([CK_USERS, { page: nextPage }], () =>
        getAllUsers(nextPage),
      );
    }

    fetchNextPage(page);
  }, [queryClient, page]); */

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Can not load users</div>;
  }

  return (
    <div>
      {users?.map((user) => (
        <div key={user.id}>
          {user.name}
          {user.id === 'temp' && '???'}
          {isFetching && '...'}
        </div>
      ))}
      <button onClick={() => setPage((page) => page - 1)}>Prev</button>
      <button onClick={() => setPage((page) => page + 1)}>Next</button>
    </div>
  );
};

export default UsersList;
