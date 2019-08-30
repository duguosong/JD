'use strict';

$(function () {
	$.get('http://47.104.244.134:8080/cartlist.do', {
		token: getCookie('user')
	}, function (data) {
		//	console.log(data)
		//console.log(data)
		var str = "";
		data.map(function (item) {

			console.log(item);
			var good = item.goods;

			str += '\n\t\t<li style="float:left;">\n\t\t\t\t\t\t<div class="nei">\n\t\t\t\t\t\t\t<a href="#">\n\t\t\t\t\t\t\t\t<img src="' + good.picurl + '" />\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t<a href="#">\n\t\t\t\t\t\t\t\t\t<h1>' + good.name + '</h1>\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t    <div class="jiage">\n\t\t\t\t\t\t\t\t\t<p>' + good.price + '</p>\n\t\t\t\t\t\t     </div>\n\t\t\t\t\t\t     <div class="adder">\n\t\t\t\t\t\t\t    <a class="add">+</a>\n\t\t\t\t\t\t\t\t    <input type="text" class="input" value="' + item.count + '" />\n\t\t\t\t\t\t        <a class="min">-</a>\n\t\t\t\t\t\t     </div>\n\t\t\t\t\t\t     \u603B\u4EF7<span class="ss">' + good.price * item.count + '</span>\n\t\t\t\t\t\t     <span id="delete" class="iconfont icon-icon_delete">\u5220\u9664</span>\n\t\t\t\t\t\t     \n\t\t\t\t\t\t</div>\n\t\t\t\t\t</li>\n\t\t';
		});
		$('.jidian').html(str);

		var _loop = function _loop(i) {
			//-号
			$(".min").eq(i).click(function () {
				$(".input").eq(i).val(parseInt($(".input").eq(i).val()) - 1);
				//console.log()
				var price = $(".input").eq(i).val() * data[i].goods.price;
				//console.log(price);
				$(".ss").eq(i).text(price);
				// $(".ss").html=data[i].goods.price*data[i].count
				if ($(".input").eq(i).val() <= 0) {
					alert("商品不能为负");
					$(".input").eq(i).val(1);
				} else {
					$.ajax({
						type: "get",
						url: "http://47.104.244.134:8080/cartupdate.do",
						async: true,
						data: {
							id: data[i].id,
							gid: data[i].gid,
							num: -1,
							token: getCookie("user")
						},
						success: function success() {}

					});
				}
			});

			//+号
			$(".add").eq(i).click(function () {
				$(".input").eq(i).val(parseInt($(".input").eq(i).val()) + 1);
				var price = $(".input").eq(i).val() * data[i].goods.price;
				//console.log(price)
				$(".ss").eq(i).text(price);
				$.ajax({
					type: "get",
					url: "http://47.104.244.134:8080/cartupdate.do",
					async: true,
					data: {
						id: data[i].id,
						gid: data[i].gid,
						num: 1,
						token: getCookie("user")
					},
					success: function success() {}

				});
			});

			$(".input").eq(i).change(function () {
				var price = $(".input").eq(i).val() * good.price;
				$(".ss").eq(i).text(price);
			});

			//删除
			$("#delete").eq(i).click(function () {
				$("#delete").eq(i).parent().remove();
				$.ajax({
					type: "get",
					url: "http://47.104.244.134:8080/cartupdate.do",
					async: true,
					data: {
						id: data[i].id,
						gid: data[i].gid,
						num: 0,
						token: getCookie("user")
					},
					success: function success() {}

				});
			});
		};

		for (var i = 0; i < data.length; i++) {
			_loop(i);
		}
	});
});