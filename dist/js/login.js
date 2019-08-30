'use strict';

$(function () {
	$('.erweima>img').bind({
		mouseover: function mouseover() {

			$('.erweima>img').animate({
				"margin-left": "0"
			}, 'slow').stop();
		},
		mouseout: function mouseout() {
			$('.erweima>img').animate({
				"margin-left": "80px"
			}, 'slow');
		}
	});

	$('.tab-r').on('click', function () {
		$('.tab-r>a').addClass("dianji");
		$('.tab-l>a').removeClass("dianji");
		$('.zhanghu').css({ "display": "block" });

		$(".erweima").css({ "display": "none" });
	});
	$('.tab-l').on('click', function () {
		$('.tab-l>a').addClass("dianji");
		$('.tab-r>a').removeClass("dianji");
		$('.zhanghu').css({ "display": "none" });
		$(".erweima").css({ "display": "block" });
	});

	$('.aa').click(function () {
		var zh = $('.h>input').val();
		var pas = $('.u>input').val();
		$.post("http://47.104.244.134:8080/userlogin.do", {
			name: zh,
			password: pas
		}, function (data) {

			var obj = data;
			console.log(obj);
			if (obj.code == 0) {
				alert("登陆成功");
				setCookie("user", data.data.token, 7);
				$(".signin").css("display", "none");
				$(window).attr('location', 'http://localhost:8080/index.html');
			} else {
				alert("账号或密码错误");
				$(".tishi").html("账号或密码错误");
			}
			//把获取的用户信息保存到本地
			localStorage.setItem("user", JSON.stringify(data));
			$(".username").html(zh);
		});
	});
});