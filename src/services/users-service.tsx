import {
  useMutation,
  UseMutationOptions,
  useQueries,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { createUser, deleteUser, getAllUsers, getUser } from '../api/users';
import User from '../models/User';

export const CK_USERS = 'users';

export const useUsers = (page = 1) => {
  return useQuery([CK_USERS, { page }], () => getAllUsers(page), {
    // keepPreviousData: true,
    // staleTime: 5000,
  });
};

export const useUsersByIds = (
  ids: string[],
  isActive: boolean,
): UseQueryResult<any, any>[] => {
  return useQueries(
    ids.map((id) => {
      return {
        queryKey: [CK_USERS, id],
        queryFn: () => getUser(id),
        enabled: isActive,
      };
    }),
  );
};

export const useCreateUser = (
  options: UseMutationOptions<
    User,
    Error,
    string,
    { previousUsers?: User[] }
  > = {},
) => {
  const queryClient = useQueryClient();
  return useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(CK_USERS);
    },
    ...options,
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(CK_USERS);
    },
  });
};
