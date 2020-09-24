$(function () {
  var form = layui.form;
  form.verify({
    repass: function (value, item) {
      // value: 是获取到的确认密码框中的值
      // item： 就是确认密码框这个标签对象
      // 获取旧密码 判断是否与新密码相同
      var pwd = $(".myForm input[name=oldPwd]").val();
      if (pwd == value) {
        // 清空新密码输入框
        $(".myForm .pass,.myForm .repass").val("");
        return "新密码不能与旧密码相同";
      }
      //  2.1 获取第一次输入的密码
      var passVal = $(".myForm input[name=newPwd]").val();
      // 2.2 判断两次密码是否一样
      if (passVal !== value) {
        // 清空两次输入框
        $(".myForm .pass,.myForm .repass").val("");
        return "两次输入的密码不一样";
      }
    },
    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
  });
  // 发送ajax请求 修改密码
  $(".myForm").on("submit", function (e) {
    // 阻止默认行为
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/updatepwd",
      data: $(this).serialize(),
      success: function (res) {
        layer.open({
          title: "温馨提示",
          content: res.message,
          time: 2000,
        });
        // 清空三个密码框
        $(".myForm .pass,.myForm .repass,.myForm .pwd").val("");
      },
    });
  });
});
