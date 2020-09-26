$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $("#image");

  // 1.2 配置选项
  var options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);

  // 给上传按钮注册点击事件 触发文件上传按钮
  $(".btn-upload").on("click", function () {
    $("#avatar").click();
  });
  // 给文件注册change事件
  $("#avatar").on("change", function () {
    // 获取待上传的图片
    var avatar = this.files[0];
    // 生成一个链接
    var imgUrl = URL.createObjectURL(avatar);
    $("#image")
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", imgUrl) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });
  // 给确定按钮注册事件
  $(".btn-sure").on("click", function (e) {
    // 阻止默认行为
    e.preventDefault();
    var dataURL = $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL("image/png"); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    // 发送ajax请求
    $.ajax({
      type: "post",
      url: "/my/update/avatar",
      data: {
        avatar: dataURL,
      },
      success: function (res) {
        if (res.status == 0) {
          layer.msg("头像更新成功");
          // 主页的头像也要进行更新  重新调用index中的请求
          window.parent.getUserInfo(); // getUserInfo()是父页面index中的函数
        }
      },
    });
  });
});
