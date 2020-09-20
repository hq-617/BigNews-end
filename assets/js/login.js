$(function () {
  // 1. 登陆与注册结构的切换
  // 1.1 给'去注册账号'按钮注册事件
  $('.login .myForm a').on('click', function () {
    // 1.2 让登陆结构隐藏 让注册结构显示出来
    $('.login').hide().next().show()
  })

  // 1.3 给'去登陆'按钮注册事件
  $('.register .myForm a').on('click', function () {
    // 1.4 让登陆结构显示 让注册结构隐藏
    $('.register').hide().prev().show()
  })

  // 2. 对表单内容进行校验
  // 就相当于是我们引入了jquery.js文件之后，就可以直接 使用$对象
  // 现在我们引入了layui.all.js之后，就可以直接 使用暴露给我们的layui
  // layui  $
  var form = layui.form
  form.verify({
    username: function (value, item) { //value：表单的值、item：表单的DOM对象
      if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
        return '用户名不能有特殊字符'
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return '用户名首尾不能出现下划线\'_\''
      }
      // if(/^\d+\d+\d$/.test(value)){
      //   return '用户名不能全为数字';
      // }
    },
    // 重新定义一个两次密码是否一样的规则
    repass: function (value, item) {
      // value: 是获取到的确认密码框中的值
      // item： 就是确认密码框这个标签对象
      //  2.1 获取第一次输入的密码
      var passVal = $('.register .myForm input[name=password]').val()
      // 2.2 判断两次密码是否一样
      if (passVal !== value) {
        // 清空两次输入框
        $('.register .myForm .pass,.register .myForm .repass').val('')
        return '两次输入的密码不一样'
      }
    }

    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    // \S 非空字符  \d数字
    , pass: [
      /^[\d]{6,12}$/
      , '密码必须6到12位数字，且不能出现空格'
    ]
  })

  // 3. 实现注册功能
  // 3.1 给form表单注册submit事件
  $('.register .myForm').on('submit', function (e) {
    // 3.2 阻止表单的默认提交行为
    e.preventDefault()
    // 3.3 发送Ajax请求
    $.ajax({
      type: 'post',
      url: 'http://ajax.frontend.itheima.net/api/reguser',
      // serialize()表单序列化会将 form标签中的所有具有name属性的值一并获取到并拼接成'key=value&key=value'形式的字符串
      data: $(this).serialize(),
      success: function (res) {
        // console.log(res);
        if (res.status == 0) {
          // 3.4 如果注册成功，应该要切换到登陆页面
          $('.login').show().next().hide()
        } else {
          // 3.5 如果用户名冲突则要提示
          layer.open({
            title: '温馨提示',
            content: res.message,
            time:2000
          });  
        }
      }
    })
  })





})