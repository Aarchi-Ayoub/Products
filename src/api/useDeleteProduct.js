import Config from 'config/api';
import {useQueryClient, useMutation} from 'react-query';
import {request} from 'utils/interceptor';
const {API} = Config;

export const deleteProduct = id => {
  return request({url: `/products/${id}`, method: 'delete'});
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteProduct, {
    // When mutate is called:
    onMutate: async id => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries('fetch-products', {
        exact: false,
      });

      // Snapshot the previous value
      const prevData = queryClient.getQueryData('fetch-products', {
        exact: false,
      });

      // Optimistically update to the new value
      let list = prevData?.data?.products;
      let newData = list?.filter(p => p?.id !== id);
      console.log({prevData, newData});
      queryClient.setQueryData('fetch-products', {data: newData});

      // Return a context object with the snapshotted value
      return {prevData};
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, context) => {
      console.log('err', err);
      queryClient.setQueryData(
        'fetch-products',
        {
          exact: false,
        },
        context.prevData,
      );
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries('fetch-products', {
        exact: false,
      });
    },
  });
};
