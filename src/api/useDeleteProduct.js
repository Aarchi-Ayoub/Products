import Config from 'config/api';
import {useMutation} from 'react-query';
import {request} from 'utils/interceptor';
const {API} = Config;

export const deleteProduct = id => {
  return request({url: `/products/${id}`, method: 'delete'});
};

export const useDeleteProduct = () => {
  return useMutation(deleteProduct);
};
