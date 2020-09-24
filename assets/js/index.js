$(function () {
  // 获取真正的名字和图片
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
    success: function (info) {
      if (info.status == 0) {
        // 将正确的名字渲染到页面
        $(".welcome").html(`欢迎&nbsp;&nbsp;${info.data.username}`);
        // console.log(info);
        if (info.data.user_pic) {
          // 有头像时，显示头像
          $(".userInfo .layui-nav-img").show().attr("src", info.data.user_pic);
          $(".layui-nav-item .layui-nav-img")
            .show()
            .attr("src", info.data.user_pic);
          // 字母头像隐藏
          $(".header").hide();
        } else {
          $(".userInfo .layui-nav-img").hide();
          $(".layui-nav-item .layui-nav-img").hide();
          // 第一次登录时以用户名首字母作为头像
          $(".header").text(info.data.username.slice(0, 1).toUpperCase());
        }
      }
    },
  });
  // 给退出按钮注册点击事件 退出登录
  $(".logout").on("click", function () {
    layer.confirm("确认退出吗？", { icon: 3, title: "提示" }, function (index) {
      localStorage.removeItem("token");
      // 关闭弹出层
      layer.close(index);
      location.href = "login.html";
      // location.replace(
      //   "file:///D:/Desktop/%E7%99%BE%E5%AE%9D%E7%AE%B1/%E5%89%8D%E7%AB%AF%E5%AD%A6%E4%B9%A0/GIT/BigNews/index.html"
      // );
    });
  });
  // --------------------------------------------------------------
});
