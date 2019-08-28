$(function(){
	$(".username>input").blur(function() {
		
		var valu = $(".username>input").val();//取到账号
		if(valu == "") {
			alert("账号不能为空")
		} else {
			$.get("http://47.104.244.134:8080/username.do", {
				username: valu
			}, function(data) {
				console.log(data)
				var obj = data;
				if(obj.code == 0) {
					$(".username>input").val("该用户已存在");
				} else {
					alert("账号可用");
				}
			})
		}

	});
	$(".password>input").blur(function() {
		var vall = /^\w{6,13}$/g;
		$(".password>input").val() == vall;
		if(!vall.test($(".password>input").val())) {
			$(".password>input").val("密码格式不正确");
		} else {
			
		}
	});
	//验证邮箱是否重复
	$(".dianhua>input").blur(function() {
		var vall = /^\w+@\w+(\.\w+)+$/g;
		$(".dianhua>input").val() == vall;
		var valu1 = $(".dianhua>input").val();//取到邮箱
		
		if(!vall.test($(".dianhua>input").val())) {
			$(".dianhua>input").val("邮箱格式不正确");
		} else {
			$.get("http://47.104.244.134:8080/useremail.do", {
				useremail: valu1
			}, function(data) {
				console.log(data)
				
				var obj = data;
				if(obj.code == 0) {
					$(".dianhua>input").val("该邮箱已存在");
				} else {
					alert("邮箱可用");
				}
			});
		}
	});
	
	//存入数据库
	$(".sanhang").click(function(){
		var valu = $(".username>input").val();//取到账号
		var valu1 = $(".dianhua>input").val();//取到邮箱
		var valu2 = $(".password>input").val();//取到密码
		
		if(valu&&valu1&&valu2!=""){
			$.post("http://47.104.244.134:8080/usersave.do",{
				username:valu,
				password:valu2,
				email:valu1,
				
			},function(data){
				console.log("aa")
				console.log(data)
				var obj = data;
				if(obj.code == 0) {
					alert("注册成功");
				$(window).attr('location','http://localhost:8080/login.html');
					
					/*valu = "";
					valu1 = "";
					valu2 = "";*/
				} else {
					alert("注册失败")
				}
			})
		}else{
			alert("请填写完整")
			
		}
		
	})
})
