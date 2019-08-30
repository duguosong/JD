'use strict';

(function () {

	function Init(options) {
		this.parent = options.parent;
		//图片的地址
		this.images = options.images;
		//方向
		this.fangxiang = options.fangxiang || 'next';
		//宽度
		this.width = options.width || $(this.parent).width();
		//高度
		this.height = options.height || $(this.parent).height();
		//索引
		this.index = options.index || 0;
		//锁
		this.lock = options.lock || false;
		//定时器
		this.timer = null;
		//来记录多少个图片 
		this.imgLength = options.images.length;
		this.optionsTimer = 2000;
		this.createDom();
		this.createCss();
		this.bindEvent();
		this.autoMove();
		this.changindex();
	}
	Init.prototype.createDom = function () {
		var parent = $(this.parent);
		var images = $('<ul class="images"></ul>');
		var bd = $('<div class= "bd"></div>');
		for (var i = 0; i < this.imgLength; i++) {
			$('<li><img src ="' + this.images[i] + '"/></li>').appendTo(images);
			$('<div></div>').appendTo(bd);
		}
		$('<li><img src ="' + this.images[0] + '"/></li>').appendTo(images);
		images.append();
		parent.append(images).append($('<div class="btn left-btn"></div>')).append($(' <div class="btn right-btn"></div>')).append(bd);
	};

	Init.prototype.createCss = function () {

		$('.images', this.parent).css({
			width: this.width * this.imgLength + this.width,
			position: "absolute",
			top: "0px",
			left: "0px"
		});
		$('.images > li', this.parent).css({
			width: " 500px",
			height: "500px",
			display: "inline-block"
		});
		$('.images > li > img', this.parent).css({
			width: "100%",
			height: "100%"
		});
		$('.btn', this.parent).css({

			width: "100px",
			height: "100px",
			position: "absolute",
			top: "140px",
			backgroundColor: "#abcdef",
			borderRadius: "50%",
			cursor: "pointer"
			// display: "none",

		});

		$('.left-btn').css({
			left: 0
		});
		$('.right-btn').css({
			right: 0
		});

		$('.bd').css({
			position: "absolute",
			bottom: "-473px",
			width: "100%",
			textAlign: "center"
		});

		$('.bd div', this.parent).css({
			width: "10px",
			height: "10px",
			display: "inline-block",
			backgroundColor: "#fff",
			borderRadius: "50%",
			marginLeft: "15px"
		});
	};
	Init.prototype.bindEvent = function () {
		var parent = this.parent;
		var self = this;
		$(parent).hover(function () {
			$('.btn', self.parent).show();
			clearInterval(this.timer);
		}, function () {
			$('.btn', self.parent).hide();
			self.autoMove();
		});
		$(parent).on('click', '.btn', function (e) {
			console.log(e.target);
			if ($(this).hasClass('left-btn')) {
				self.move('prev');
			} else if ($(this).hasClass('right-btn')) {
				self.move('next');
			}
		});
		$('.bd', self.parent).on('click', 'div', function () {
			self.move($(this).index());
		});
	};
	Init.prototype.move = function (res) {
		var self = this;
		// if (self.lock) {
		//     console.log('---')
		//     return;
		// }

		console.log(res);
		console.log(this.index);
		if (res == 'prev') {
			if (self.index == 0) {
				this.index = this.imgLength;
				console.log(this.index, this.width);
				console.log(this.index);
				$('ul', this.parent).css({
					left: -this.index * this.width + 'px'
				});
			}
			this.index--;
			$('ul', this.parent).animate({
				left: -this.index * this.width
			}, 1000, function () {
				console.log("=---");
				self.changindex();
			});
		} else if (res == 'next') {

			if (this.index == this.imgLength) {
				console.log(this.index);
				self.index = 0;
				console.log(this.index);
				$('ul', self.parent).css({
					left: -this.index * this.width
				});
			}
			this.index++;
			$('.wrapper  > ul').animate({
				left: -this.index * this.width
			}, 1000, function () {
				this.lock = false;
				console.log("=---");
				this.hangindex();
			});
		} else if (typeof res == 'number') {
			index = res;
			console.log(index);
			$('ul', self.parent).animate({
				left: -this.index * this.width
			}, 1000, function () {
				this.lock = false;
				console.log("=---");
				self.changindex();
			});
		}
	};
	Init.prototype.changindex = function () {
		console.log(this.index);
		var self = this;
		$(' .bd div', self.parent).css({
			backgroundColor: '#fff'
		});
		if (this.index == this.imgLength) {
			$('.bd div', self.parent).eq(0).css({
				backgroundColor: 'red'
			});
		} else {
			$(' .bd div', self.parent).eq(this.index).css({
				backgroundColor: 'red'
			});
		}
	};
	Init.prototype.autoMove = function () {
		var self = this;
		this.timer = setInterval(function () {
			self.move('next');
		}, 1000);
	};
	$.fn.extend({
		swiped: function swiped(options) {
			options.parent = this;
			new Init(options);
		}

	});
})();

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
			limit: 13
		},
		success: function success(res) {
			var res = res.data;
			var str = "";
			for (var i = 1; i < res.length; i++) {
				str += '<li style="float: left;width:290px;height:340px; ">\n\t\t\t\t\t\t<a href="list.html?id=' + res[i].id + '">\n\t\t\t\t\t\t<img src="' + res[i].picurl + '" style="width:280px;float:left;"/>\n\t\t\t\t\t\t<p style="color: black;">' + res[i].name + '</p>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</li>\n\t\t\t\t\t';
				$(".jidian").html(str);
			}
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
				str += '<li class=' + data[i].id + '>' + data[i].name + '</li>';
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
									str += '<a style="float:left">' + item.name + '</a>';
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