import axios from 'axios';
import { Alert } from 'react-native';
import { getToken } from './auth';

// 需要从存储中获取token

// 创建axios实例
const service = axios.create({
  baseURL: 'http://13.210.204.61/', 
  timeout: 10000, 
});

// 请求拦截器
service.interceptors.request.use(
  async (config) => {
    console.log('~~~~~ service.interceptors.request exe',config)
    const token = await getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 处理请求错误
    console.error('请求错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    console.log('axios response is',response)
    const res = response.data;
    // 根据业务需求处理响应
    if (res.code !== 200) {
      Alert.alert('提示', res.message || '请求失败');
      return Promise.reject(new Error(res.message || '请求失败'));
    } else {
      return res;
    }
  },
  (error) => {
    console.log('axios error is',error)
    Alert.alert('网络错误', '请求失败，请稍后重试');
    return Promise.reject(error);
  }
);

export const get = (url, params = {}) => service.get(url, { params });

export const post = (url, data, options = {}) =>
  service.post(url, data, {
    headers: {
      'Content-type': options.isFormData
        ? 'application/x-www-form-urlencoded'
        : 'application/json',
    },
  });
