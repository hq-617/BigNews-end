$(function () {
  // 渲染数据
  renderTable();
  function renderTable() {
    $.ajax({
      type: "get",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status == 0) {
          var htmlStr = template("tpl", res);
          $("tbody").html(htmlStr);
        }
      },
    });
  }
  // 增加分类
  $(".btn-add").on("click", function () {
    window.addIndex = layer.open({
      type: 1,
      title: "添加文章分类",
      content: $("#addCteTmp").html(),
      area: "520px", // 弹出框的宽度
    });
  });
  // 校验
  var form = layui.form;
  form.verify({
    username: function (value, item) {
      //value：表单的值、item：表单的DOM对象
      if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
        return "表单不能有特殊字符";
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return "表单不能出现下划线'_'";
      }
      if (/^\d+\d+\d$/.test(value)) {
        return "表单不能全为数字";
      }
    },
  });
  // 添加分类 发送请求
  $("body").on("submit", ".myForm", function (e) {
    e.preventDefault();
    // 发送请求
    $.ajax({
      type: "POST",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status == 0) {
          // 关闭弹出层
          layer.close(window.addIndex);
          // 重新渲染表格
          renderTable();
        }
      },
    });
  });
  // 删除请求
  $("tbody").on("click", ".btn-del", function () {
    var id = $(this).data("id");
    layer.confirm("确认删除吗？", { icon: 3, title: "提示" }, function (index) {
      // 发送请求
      $.ajax({
        type: "GET",
        url: "/my/article/deletecate/" + id,
        success: function (res) {
          if (res.status == 0) {
            // 关闭弹出层
            layer.close(index);
            // 重新渲染
            renderTable();
          }
        },
      });
    });
  });

  // 修改
  $("tbody").on("click", ".btn-edit", function () {
    var id = $(this).data("id");
    $.ajax({
      type: "GET",
      url: "/my/article/cates/" + id,
      success: function (res) {
        // console.log(res);
        if (res.status == 0) {
          window.editIndex = layer.open({
            type: 1,
            title: "修改文章分类",
            content: $("#editCteTmp").html(),
            area: "520px", // 弹出框的宽度
          });
          // 渲染数据
          layui.form.val("editForm", res.data);
        }
      },
    });
  });
  // 确认修改
  $("body").on("submit", ".editForm", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status == 0) {
          // 关闭弹出框
          layer.close(window.editIndex);
          // 重新渲染数据
          renderTable();
        }
      },
    });
  });
  // -----------------------------------------------------------
});
