"use strict";

function getStyle(obj, attr) {
	if (window.getComputedStyle) {
		return getComputedStyle(obj, null)[attr];
	}
	return obj.currentStyle[attr];
}
/*
 参数
 * domobj 样式要改变的dom对象
 * 样式属性的目标值  json对象 {attr1:val1,attr2:val2}
 * fn表示一个回调函数，等其他属性全部变完，再去执行另外属性的变化
 * 
 * */
function startMove(domobj, json, fn) {
	clearInterval(domobj.timer);
	domobj.timer = setInterval(function () {

		//假设所有的属性值都达到了目标值
		var flag = true;

		for (var attr in json) {
			//取目标值
			var iTarget = Math.floor(json[attr]);
			//考虑透明度
			if (attr == "opacity") {
				var iCur = parseInt(getStyle(domobj, "opacity") * 100);
			} else {
				//取当前值
				var iCur = parseInt(getStyle(domobj, attr));
			}

			//求每次移动距离
			var iSpeed = (iTarget - iCur) / 8;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

			if (attr == "opacity") {
				domobj.style.opacity = (iCur + iSpeed) / 100;
				domobj.style.filter = "alpha(opaicty=" + (iCur + iSpeed) + ")";
			} else {
				domobj.style[attr] = iCur + iSpeed + "px";
			}

			if (iCur != iTarget) {
				//只要一个没有达到，假设就不成立
				flag = false;
			}
		}

		//if条件如果满足，所有的均达到了目标值
		if (flag) {
			clearInterval(domobj.timer);
			//避免用户不传第三个参数
			if (fn) {
				fn();
			}
		}
	}, 20);
}