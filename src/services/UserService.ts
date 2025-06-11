import store from '@/store';

const login = async (username: string, password: string): Promise <any> => {
  return 
}

const checkPermission = async (payload: any): Promise <any>  => {
  let baseURL = store.getters['user/getInstanceUrl'];
  baseURL = baseURL && baseURL.startsWith('http') ? baseURL : `https://${baseURL}.hotwax.io/api/`;
  return 
}

const getProfile = async (): Promise <any>  => {
    return 
}

export const UserService = {
    login,
    getProfile,
    checkPermission
}