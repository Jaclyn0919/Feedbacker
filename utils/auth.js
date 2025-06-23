import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_token';

// 存储 token 到 SecureStore
export const saveToken = async (token) => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

// 从 SecureStore 获取 token
export const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

// 删除 token
export const deleteToken = async () => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error('Error deleting token:', error);
  }
};

// 检查用户是否已登录
export const isLoggedIn = async () => {
  const token = await getToken();
  return !!token;
};  