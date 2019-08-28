
function Slider(id){
	this.sliderBox = document.getElementById(id);
	this.sliderList = this.sliderBox.children[0].children;
	this.count = 0;//控制图片显示隐藏的索引
	this.timer = null;
	this.clearInterval();
}
Slider.prototype.autoPlay = function(){
	this.timer = setInterval(()=>{
		this.move();
	},3000);
}
Slider.prototype.move = function(){
	this.count++;
	if(this.count==this.sliderList.length){
		this.count = 0;
	}
	if(this.count == -1){
		this.count = this.sliderList.length - 1;
	}
	
	//this.aLi指的是焦点
	if(this.aLi){
		for(let i = 0; i < this.aLi.length; i++){
			this.aLi[i].className = "";
		}
		this.aLi[this.count].className = "hover";
	}
	for(let i = 0; i < this.sliderList.length; i++){
		startMove(this.sliderList[i],{opacity:0});
	}
	startMove(this.sliderList[this.count],{opacity:100});
}
Slider.prototype.createBtn = function(){
	var oDiv = document.createElement("div");
	oDiv.innerHTML = "<span>&lt;</span><span>&gt;</span>";
	this.sliderBox.appendChild(oDiv);
	var aBtns = oDiv.children;
	aBtns[0].onclick = ()=>{
		this.count -= 2;
		this.move();
	}
	aBtns[1].onclick = ()=>{
		this.move();
	}
}

Slider.prototype.createFocus = function(){
	var oUl = document.createElement("ul");
	oUl.className = "last";
	for(let i = 0; i < this.sliderList.length; i++){
		var oLi = document.createElement("li");
		oLi.innerText = i+1;
		oUl.appendChild(oLi);
	}
	this.sliderBox.appendChild(oUl);
	this.aLi = oUl.children;//所有的焦点
	this.aLi[0].className = "hover";
	for(let i = 0; i < this.aLi.length; i++){
		this.aLi[i].onmouseover = ()=>{
			this.count = i - 1;
			this.move();
		}
	}
}


Slider.prototype.clearInterval = function(){
	this.sliderBox.onmouseover = ()=>{
		clearInterval(this.timer);
	}
	this.sliderBox.onmouseout = ()=>{
		this.timer = setInterval(()=>{
			this.move();
		},3000)
	}
}
