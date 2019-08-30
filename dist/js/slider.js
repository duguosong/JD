"use strict";

function Slider(id) {
	this.sliderBox = document.getElementById(id);
	this.sliderList = this.sliderBox.children[0].children;
	this.count = 0; //控制图片显示隐藏的索引
	this.timer = null;
	this.clearInterval();
}
Slider.prototype.autoPlay = function () {
	var _this = this;

	this.timer = setInterval(function () {
		_this.move();
	}, 3000);
};
Slider.prototype.move = function () {
	this.count++;
	if (this.count == this.sliderList.length) {
		this.count = 0;
	}
	if (this.count == -1) {
		this.count = this.sliderList.length - 1;
	}

	//this.aLi指的是焦点
	if (this.aLi) {
		for (var i = 0; i < this.aLi.length; i++) {
			this.aLi[i].className = "";
		}
		this.aLi[this.count].className = "hover";
	}
	for (var _i = 0; _i < this.sliderList.length; _i++) {
		startMove(this.sliderList[_i], { opacity: 0 });
	}
	startMove(this.sliderList[this.count], { opacity: 100 });
};
Slider.prototype.createBtn = function () {
	var _this2 = this;

	var oDiv = document.createElement("div");
	oDiv.innerHTML = "<span>&lt;</span><span>&gt;</span>";
	this.sliderBox.appendChild(oDiv);
	var aBtns = oDiv.children;
	aBtns[0].onclick = function () {
		_this2.count -= 2;
		_this2.move();
	};
	aBtns[1].onclick = function () {
		_this2.move();
	};
};

Slider.prototype.createFocus = function () {
	var _this3 = this;

	var oUl = document.createElement("ul");
	oUl.className = "last";
	for (var i = 0; i < this.sliderList.length; i++) {
		var oLi = document.createElement("li");
		oLi.innerText = i + 1;
		oUl.appendChild(oLi);
	}
	this.sliderBox.appendChild(oUl);
	this.aLi = oUl.children; //所有的焦点
	this.aLi[0].className = "hover";

	var _loop = function _loop(_i2) {
		_this3.aLi[_i2].onmouseover = function () {
			_this3.count = _i2 - 1;
			_this3.move();
		};
	};

	for (var _i2 = 0; _i2 < this.aLi.length; _i2++) {
		_loop(_i2);
	}
};

Slider.prototype.clearInterval = function () {
	var _this4 = this;

	this.sliderBox.onmouseover = function () {
		clearInterval(_this4.timer);
	};
	this.sliderBox.onmouseout = function () {
		_this4.timer = setInterval(function () {
			_this4.move();
		}, 3000);
	};
};