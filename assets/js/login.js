$(function () {
  $(".register .layui-input-block a").on("click", function () {
    $(".login").show().next().hide();
  });
  $(".login .layui-input-block a").on("click", function () {
    $(".register").show().prev().hide();
  });
});
