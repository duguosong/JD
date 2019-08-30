"use strict";

$(function () {
	var id = location.search.split("=")[1];
	console.log(id);
	$.ajax({
		type: "get",
		url: "http://47.104.244.134:8080/goodsbyid.do",
		async: true,
		contentType: 'application/x-www-form-urlencoded',
		data: { id: id },
		success: function success(data) {
			console.log(data);
			var str = "";
			str += "<li style=\"float: left;width:1190px;height:480px;\">\n\t\t\t\t\t\t\n\t\t\t\t\t\t<img src=\"" + data.picurl + "\" style=\"width:352px;height:480px;float:left;\"/>\n\t\t\t\t\t\t<lable style=\"float:left;color:red;font-weight:900;font-size:25px;margin:0 auto;\">\u7ACB\u77014.90</lable>\n\t\t\t\t\t\t<p style=\"\">" + data.name + "</p>\n\t\t\t\t\t\t<span style=\"font-size:25px;color:red;\">\uFFE5" + data.price + "<s>\uFFE55000</s><b>\u4EC5\u96505\u4EF6</b></span>\n\t\t\t\t\t\t<input type=\"button\" value=\"\u52A0\u5165\u8D2D\u7269\u8F66\" class=\"jiaru\"/>\n\t\t\t\t\t\t<div style=\"margin-top:196px;font-weight:900;font-size:25px;\">\u5373\u5C06\u5F00\u59CB</div>\n\t\t\t\t\t\t\n\t\t\t\t\t</li>\n\t\t\t\t\t";
			$('.jidian').html(str);
		}
	});
	//加入购物车


	$.ajax({
		type: "get",
		url: "http://47.104.244.134:8080/cartsave.do",
		anync: true,
		contentType: 'application/x-www-form-urlencoded',
		data: { gid: id, token: getCookie("user") },
		success: function success(data) {
			$(".jiaru").click(function () {
				console.log(data);
			});
		}
	});
});