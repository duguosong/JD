"use strict";

function setCookie(key, value, n) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + n);
	//var reg = /[\u4e00-\u9fa5]/g;
	//if(reg.test(value)){
	value = encodeURIComponent(value);
	//}

	document.cookie = key + "=" + value + ";expires=" + oDate;
}
function getCookie(key) {
	var arr = document.cookie.split("; ");
	for (var i = 0; i < arr.length; i++) {
		var arr1 = arr[i].split("=");
		if (arr1[0] === key) {
			return decodeURIComponent(arr1[1]);
		}
	}
}
function removeCookie(name) {
	setCookie(name, 1, -1);
}