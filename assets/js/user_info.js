$(function () {
  // 获取表单元素 填入表单中
  function renderForm() {
    $.ajax({
      type: "GET",
      url: "/my/userinfo",
      success: function (res) {
        if (res.status == 0) {
          var form = layui.form;
          form.val("myForm", res.data);
        }
      },
    });
  }
  renderForm();
  // 发送修改请求
  $(".myForm").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (res) {
        layer.open({
          title: "温馨提示",
          content: res.message,
          time: 2000,
        });
      },
    });
  });
  // 点击重置按钮 清空表单内容
  $(".myForm .reset").on("click", function (e) {
    e.preventDefault();
    renderForm();
  });
});
