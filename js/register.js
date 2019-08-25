$(function() {
	$('.guojia').click(function() {

		$(".guojia>a").css({
			"background-position": "-18px -151px"
		})
	})
	$('.shuru').on("input", function() {

		$(".cha").css({
			"display": "block"
		}).on("click", function() {
			$(".cha").css({
				"display": "none"
			})
			$('.shuru').val("");
			$('.ww').css({
				"display": "none"
			})
		})

	})

	$('.shuru').focus(function() {
		/*console.log("aa")
		var str = $('.shuru').val();
		var arr = str.split("");*/
		$('.tishi').css({
			"display": 'block'
		})

		$('.shuru').on('input', function() {
			let arr = $('.shuru').val();
			let str = arr.replace(/(^\s*)|(\s*$)/g, ''); //去除空格;

			if(str == '' || str == undefined || str == null) {
				//return true;

				$('.ww').css({
					"display": "none"
				})
				$('.cha').css({
					"display": "none"
				})
			}
			return false;

			//$('.ee').css({"display":"block"}).next().css({"display":"none"})

		})

	})
	$('.shuru').blur(function() {
		/*console.log("aa")
		var str = $('.shuru').val();
		var arr = str.split("");*/

		let arr = $('.shuru').val();

		if(!(/^1[3456789]\d{9}$/.test(arr))) {
			$('.ee').css({
					"display": 'none'
				})
				.next().css({
					"display": "block"
				})
			$('.cha').css({
				"background-position": "-51px -118px"
			})
			let str = arr.replace(/(^\s*)|(\s*$)/g, ''); //去除空格;

			if(str == '' || str == undefined || str == null) {
				//return true;

				$('.ww').css({
					"display": "none"
				})
				$('.cha').css({
					"display": "none"
				})
			}
			return false;
		} else {
			$('.tishi>.ee').css({
				'display': "none"
			});
			$('.cha').css({
				"background-position": "-70px -140px"
			}).on('input', function() {
				let arr = $('.shuru').val();
				let str = arr.replace(/(^\s*)|(\s*$)/g, ''); //去除空格;

				if(str == '' || str == undefined || str == null) {
					//return true;
					$('.shuru').on('input', function() {
						$('.cha').css({
							"background-position": "-51px -118px"
						})

					})
					$('.ww').css({
						"display": "none"
					})
					$('.cha').css({
						"display": "none"
					})
				}
			})

		}

	})

	

})