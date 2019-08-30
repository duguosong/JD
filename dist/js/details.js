"use strict";

$(function () {
	$(".jidian").find("li").mouseover(function () {
		$(this).css({
			"border-bottom": "2px solid red",
			"color": "red",
			"font-weight": "bolder"
		}).siblings().css({
			"border-bottom": "none",
			"color": "#000",
			"font-weight": "none"
		});
	});

	//获取商品数据,展示出来
	$.ajax({
		type: "GET",
		url: "http://47.104.244.134:8080/goodsbytid.do",
		data: {
			tid: 13,
			page: 1,
			limit: 9
		},
		success: function success(res) {

			var res = res.data;

			var str = "";
			for (var i = 1; i < res.length; i++) {
				console.log(res[i].name);

				str += "<li style=\"float: left;width:250px;height:235px;overflow: hidden;\">\n\t\t\t\t\t\t<a href=\"list.html?id=" + res[i].id + "\">\n\t\t\t\t\t\t<img src=\"" + res[i].picurl + "\" style=\"width:200px;float:left;\"/>\n\t\t\t\t\t\t<p style=\"float:left;width:200px;\">" + res[i].name + "</p>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</li>\n\t\t\t\t\t";
			}
			$(".jidian").html(str);
		}

	});

	//商品滑动展示
	var a = 0;

	$(".right-z").click(function () {
		a++;
		//		$(".shangpintu").stop().animate({"left":-192*a},800)
		if (a <= $(".shangpintu").find("li").length - 4) {
			$(".shangpintu").stop().animate({
				"left": -192 * a
			}, 500);
		} else {
			$(".shangpintu").stop();
			a = 5;
		}
	});

	$(".left-z").click(function () {
		if (a == 0) {
			$(".shangpintu").stop();
		} else {
			a--;
			$(".shangpintu").stop().animate({
				"left": -192 * a
			}, 500);
		}
	});

	$(function () {
		$.get('http://47.104.244.134:8080/goodstypelist.do', {
			l: 1
		}, function (data) {
			var str = "";
			for (var i = 0; i < data.length; i++) {
				var _a = data[i].name;
				//console.log(data)
				str += "<li class=" + data[i].id + ">" + data[i].name + "</li>";
				$('.dudu').html(str);
			}

			var sss = $('.dudu').children();
			//console.log(sss)
			for (var g = 0; g < sss.length; g++) {

				//console.log(sss[g])
				$(sss[g]).bind({
					mouseover: function mouseover() {
						var _this = this;

						$.get('http://47.104.244.134:8080/goodstypelist.do', {
							l: 2
						}, function (data) {

							var id = $(_this).attr("class");

							//console.log(id)
							var str = "";
							data.map(function (item) {
								//console.log(item.parentid)

								if (item.parentid == id) {
									str += "<a style=\"float:left\">" + item.name + "</a>";
								}
							});
							$('.liebiao').html(str);
							$('.liebiao').css({
								"display": "block"
							});
						});
					},
					mouseout: function mouseout() {
						$('.liebiao').css({
							"display": "none"
						});
					}
				});
			}
		});
	});
});