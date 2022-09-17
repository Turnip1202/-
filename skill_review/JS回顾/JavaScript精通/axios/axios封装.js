export function axiosAPI(config) {
  return new Promise((resolve, reject) => {
    const instance = axios.create();
    instance(config).then(data => resolve(data)).catch(err => reject)
  })
}
// 简写
export function axiosAPI(config) {
  return new Promise((resolve, reject) => {
    const instance = axios.create();
    // 拦截器（可以加一些加载的动画，开始时加，成功时去）
    // 添加请求拦截器
    instance.interceptors.request.use(function (config) {
      // 在发送请求之前做些什么
      console.log(config)
      return config;
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    });
    // 添加响应拦截器（比如拦截广告）
    instance.interceptors.response.use(function (response) {
      // 对响应数据做点什么
      console.log(response)
      return response;
    }, function (error) {
      // 对响应错误做点什么
      return Promise.reject(error);
    });
    return instance(config)
  })
}