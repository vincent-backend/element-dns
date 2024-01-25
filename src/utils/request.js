import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui';

// old API
var request = axios.create({
  // baseURL:'http://127.0.0.1:8088/api'
  // baseURL: 'https://gy4q3fpx3gh77gw.kk5yuzmev2qbgulz.com/api'
  baseURL: '/api',
  // baseURL: 'http://127.0.0.1:8888/',
})
request.interceptors.request.use(function (config) {
  var current = new Date().getTime()
  var old_time = sessionStorage.getItem('login_time');
  var times = sessionStorage.getItem('utime');
  //var reg = sessionStorage.getItem('reg');
  var time = (current - old_time) / 1000
  if (time > times) {
    if (router.history.current.path == '/register') {
      router.push('/register')
    } else if (router.history.current.path == "/findpw") {
      router.push('/findpw')
    } else if (router.history.current.path == '/reset') {
      router.push('/reset')
    } else if (router.history.current.path == '/regck') {
      router.push('/regck')
    } else {
      router.push('/login')
    }
  } else {
    var token = sessionStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
});
request.interceptors.response.use(res => {
  console.log('succ');
  return res;
}, err => {
  // MessageBox.alert(err.response.data);
  Message.error(err.response.data);
  throw err;
});

export default request
