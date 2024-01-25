import { BASE_PATH } from '../constants';

export const removeBaseUrl = (pathname: string) => {
  return pathname.replace(BASE_PATH, '');
};
