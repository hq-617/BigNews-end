$.ajaxPrefilter(function (options) {
  // 这个函数是在所有的ajax请求之前执行的
  // options是一个对象，里面存储了所有的ajax函数中的参数内容
  // 就可以将所有的请求要路径进行统一的设置
  options.url = "http://ajax.frontend.itheima.net" + options.url;
  // 判断请求地址中是否包含my 如果包含 则头部需要携带token
  if (options.url.includes("/my")) {
    options.headers = {
      Authorization: window.localStorage.getItem("token"),
    };
  }
  // 开启权限设置 防翻墙
  options.complete = function (res) {
    console.log(res);
    // 如果身份验证失败 则需要清空token 跳转到登录页面
    if (
      res.responseJSON.status == 1 &&
      res.responseJSON.message == "身份认证失败！"
    ) {
      // 清空token
      localStorage.removeItem("token");
      // 跳转到登录页面
      location.href = "login.html";
    }
  };
});
