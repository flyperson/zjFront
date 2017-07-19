//区域滚动,需手动初始化scroll控件
		mui('.mui-scroll-wrapper').scroll({
			deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		});
		(function($) {
			$('#scroll').scroll({
				indicators: true //是否显示滚动条
			});

		})(mui);
		mui.init({
			swipeBack: true, //启用右滑关闭功能
			gestureConfig: {
				doubletap: true, //默认为false
				longtap: true, //默认为false

			}
		});
		mui.plusReady(function() {
			//获取url参数值
			function geturl(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if(r != null) return unescape(r[2]);
				return null;
			}
			//获取传参
			var gclb = geturl("gclb");
			var sjc = geturl("sjc");
			var mc  = geturl("gcmc");
			var gcid = geturl("gcid");
			var checkId = geturl("checkId");
			
			//解码
			gcmc   = decodeURI(mc);
			gclb = decodeURI(gclb);
			
			//顶部标题
			var h1 = document.getElementsByTagName('h1');
			h1[0].firstChild.nodeValue = gclb; 
			
			var a1 = document.getElementById('a1');

			var mc = document.getElementById("mc"); //姓名
			var jcbw = document.getElementById("jcbw"); //检查部位
			var jcrq = document.getElementById("jcrq"); //检查日期
			var jcry = document.getElementById("jcry"); //检查人员
			var sgbz = document.getElementById("sgbz"); //施工班组
			var zzxm = document.getElementById("zzxm"); //组长姓名
			var lxdh = document.getElementById("lxdh"); //联系电话
			var sgrq = document.getElementById("sgrq"); //施工日期
			var gzms = document.getElementById("gzms");//工作描述

			var save = document.getElementById('save'); //保存按钮
//			var fjck = document.getElementById('fjck'); //附件查看
			var fjscxg = document.getElementById('fjscxg'); //附件上传/修改

			var myform = document.getElementById('myform'); //基本信息
			var uploader = document.getElementById('uploader'); //上传附件

			var my_popover = document.getElementById('my_popover'); //右上角按钮

			var bhao = document.getElementById('bhao'); //编号
			var cdlx = document.getElementById('cdlx'); //测点类型
			var ggpj = document.getElementById('ggpj'); //观感评价
			var gggbi = document.getElementById('gggbi'); //关闭
			var ggqding = document.getElementById('ggqding'); //确定

			var mydiv = document.getElementById('mydiv'); //测点布置图
			var kbbhao = document.getElementById('kbbhao'); //测点编号
			var kbcdlx = document.getElementById('kbcdlx'); //测点类型
			var kbggpj = document.getElementById('kbggpj'); //观感评价
			var kbgbi = document.getElementById('kbgbi'); //关闭
			var kbqding = document.getElementById('kbqding'); //确定
			
			var xzcd = document.getElementById("xzcd"); //选择测点分层
			var qkbz = document.getElementById('qkbz'); //清空布置
			var bcbz = document.getElementById('bcbz'); //保存布置
			var out = document.getElementById('out'); //操作

			//监听upload_camera,打开原生操作列表
			var upload_camera = document.getElementById('upload_camera');
			
			//基本信息，读数据
			var fgyszp = [];
			var fghxpmt = [];
			var fgysjl = [];
			var fgbcjl = [];
			
			//右上角按钮监听
			my_popover.addEventListener('tap', function() {
				var btnArray = [
					{ title: "新增测点" },
					//{title:"相册"}
				];
				plus.nativeUI.actionSheet({
					title: "操作",
					cancel: "取消",
					buttons: btnArray
				}, function(e) {
					var index = e.index;
					switch(index) {
						case 0: //取消								
							break;
						case 1: //新增测点
							//遮罩效果
							ws = null;
							ws = plus.webview.currentWebview();
							// 显示遮罩层
							ws.setStyle({ mask: "rgba(0,0,0,0.7)" });
							//打开新webview，模仿弹窗
							mui.openWindow({
								url: 'my_project_ggpj_xzcd.html',
								id: 'my_project_ggpj_xzcd',
								styles: {
									width: '90%',
									height: '90%',
									margin: 'auto',
									hardwareAccelerated:false
								},
								extras: {
									name: 'feiji',
									gclb: gclb,
									sjc: sjc,
									gcid: gcid,
									checkId: checkId
									
								},
								show: {
									autoShow: true, //页面loaded事件发生后自动显示
									aniShow: 'slide-in-right', //页面显示动画
									duration: '100' //页面动画持续时间
								},
								waiting: {
									autoShow: false, //自动显示等待框
								},
							});
							break;
					}
				});
			});
			//接收值
			window.addEventListener('json_bj', function(event) {
				//关闭遮罩层
				setTimeout(function() {
					ws.setStyle({ mask: "none" });
					ws = null;
				}, 100);
				var flag = event.detail.flag;
//				alert(flag);
				if(flag == 'ok') {
					var newcdlx = event.detail.cdlx;
					var newqsbh = event.detail.qsbh;
					var newzzbh = event.detail.zzbh;
					var newggpj = event.detail.ggpj;
					var world = event.detail.world;
//					alert(world);
					//截取
					var qsbhzm = newqsbh.substring(1, 0); //起始编号字母部分
					var qsbhsz = newqsbh.substring(1); //起始编号数字部分
					var zzbhsz = newzzbh.substring(1); //终止编号数字部分
					for(var i = qsbhsz; i <= zzbhsz; i++) {
						var newbhao = qsbhzm + i;
						createggpj(newbhao, newcdlx, newggpj);
						createkbcd(newbhao, '', '' ,world);
					}
				}
			});
			
//			//附件查看按钮监听
//			fjck.addEventListener('tap', function() {
//
//				mui.openWindow({
//					url: '',
//					id: '',
//					extras: {
//
//					},
//					show: {
//						aniShow: 'slide-in-right', //页面显示动画
//						duration: '100' //页面动画持续时间
//					},
//					waiting: {
//						autoShow: false, //自动显示等待框
//					}
//				});
//			});

			//附件上传修改监听，显示附件上传的界面
			fjscxg.addEventListener('tap', function() {
				myform.classList.add('my_none');                //添加样式
				uploader.classList.remove('my_none');           //移除样式
			});
			//a1基本信息监听
			a1.addEventListener('tap', function() {
				myform.classList.remove('my_none');
				uploader.classList.add('my_none');
			});
			var camera = upload_camera.getElementsByClassName('upload_camera');
		//				alert(camera.length);
		
			//拍照处理
			for(var i = 0; i < camera.length; i++) {
				camera[i].addEventListener('tap', function() {
					myactionSheet('yszp');
				});
			}
		
			var myactionSheet = function(lx) {
				var btnArray = [
					{ title: "拍照" },
					{ title: "相册" }
				];
				plus.nativeUI.actionSheet({
					title: "操作",
					cancel: "取消",
					buttons: btnArray
				}, function(e) {
					var index = e.index;
					var text = "你刚点击了\"";
					switch(index) {
						case 0:
							text += "取消";
							break;
						case 1:
							getImage(lx);
							text += "拍照";
							break;
						case 2:
							galleryImg(lx);
							text += "相册";
							break;
					}
					//info.innerHTML = text+"\"按钮";
				});
			};
		
			//选择测点分层按钮监听
			xzcd.addEventListener('tap', function() {
//				alert(gcid+''+gclb+''+sjc+''+checkId)
				mui.openWindow({
					url: 'my_ggpj_cdfc.html',
					id: 'my_ggpj_cdfc',
					styles: {
		
					},
					extras: {
						name: 'feiji',
						gclb: gclb,
						sjc: sjc,
						checkId: checkId
					},
					show: {
						autoShow: true, //页面loaded事件发生后自动显示
						aniShow: 'slide-in-right', //页面显示动画
						duration: '100' //页面动画持续时间
					},
					waiting: {
						autoShow: false, //自动显示等待框
					},
				});
			});
			//基本信息读取
			var ajaxformdata = function() {
				mui.ajax(url + 'my_plus/my_project_ggpj_xinx.php', {
					data: {
						sjc: sjc
					},
					dataType: 'json',
					type: 'post',
					timeout: 10000,
					success: function(data) {
//						alert(data);
						var length = data.length;
						for(var i = 0; i < length - 1; i++) {
							mc.value = data[i].名称;
							jcbw.value = data[i].检查部位;
							jcrq.value = data[i].检查日期;
							jcry.value = data[i].检查人员;
							sgbz.value = data[i].施工班组;
							zzxm.value = data[i].组长姓名; 
							lxdh.value = data[i].联系方式;
							sgrq.value = data[i].施工日期;
							gzms.value = data[i].工作描述;
							
						}
					},
					error: function(xhr, type, errorThrown) {
						//异常处理；
						//alert('ajax错误'+type);
						return callback('ajax错误' + type + errorThrown);
					}
				});
			};
			mui.ajax(url+'my_ggpj_count.php',{
				data:{
					gclb:gclb,
					sjc :sjc
				},
				dataType: 'json',
				type:'post',
				timeout:10000,
				success:function(data){
					var length = data.length;
					var g = 0;
					var x = 0;
					for(var i = 0; i < length - 1; i++) {
					    var world = data[i].测点编号;
						var cdType = data[i].测点类型;
						var ggpjCount = data[i].观感评价;
						var zm = world.substr(0,1);
//						alert(ggpjCount+','+world);
						if (ggpjCount=='√'){
							g = g+1;
						} else if (ggpjCount=='×'){
							x = x+1;
						};
					}
					var num=g+x;
					var a = ((g/num)*100).toFixed(2)+'%'; 
					if(num>0){
						createAllCount('综合统计','----',a);
						getCount(a);
					} else {
						createAllCount('综合统计','----','----');
					}
					
				},
				error:function(xhr,type,errorThrown){
					//异常处理；
					//alert('ajax错误'+type);
				}
			});
			var getCount = function(a){
//				alert(gclb+"-"+sjc+"-"+gcmc+"-"+gcid+"-"+a);
				mui.ajax(url+'my_plus/my_ggpj_uploadcount.php',{
					data:{
						gclb:gclb,
						sjc :sjc,
						gcmc:gcmc,
						xmid:gcid,
						checkId:checkId,
						hgl:a,
						scgg:"观感评价"
					},
					dataType: 'json',
					type:'post',
					timeout:10000,
					success:function(data){
						
					},
					error:function(xhr,type,errorThrown){
						//异常处理；
//						alert('ajax错误'+type);
					}
				});
			}
			var createAllCount = function(world,cdType,n){
				var ul = document.getElementsByTagName('ul');
				var li = ul[2].getElementsByTagName('li');
				var allCount= '<div class="my_table my_td_width30">' + world + '</div><div class="my_table my_td_width40">' + cdType + '</div><div  class="my_table my_td_width30">' + n + '</div>';
				li[1].innerHTML=allCount;
				
			};
			//统计分析
			var zmArray = ['A','B','C','D','E','F','G','H','I'];
			for(var i=0;i<zmArray.length;i++){
				var zm = zmArray[i];
				mui.ajax(url+'my_plus/my_ggpj_count_list.php',{
					data:{
						gclb:gclb,
						sjc :sjc,
						zm:zm
					},
					dataType: 'json',
					type:'post',
					timeout:10000,
					success:function(data){
						var t = data.t;
						var f = data.f;
						var g = data.cdType;
						var count = data.count;
						var world = data.zm;
						var a = ((t/count)*100).toFixed(2)+'%'; 
						if(count>0){
							createCount(world,g,a);
						} else {
	//						createCount('A',g,'不存在');
						}
					},
					error:function(xhr,type,errorThrown){
						//异常处理；
						//alert('ajax错误'+type);
					}
				});
			};
			
			var createCount = function(world,cdType,n){
				var ul = document.getElementsByClassName('mui-table-view');
				var li = document.createElement("li");
				li.className = "mui-table-view-cell  ";
				li.innerHTML = '<div class="my_table my_td_width30">' + world + '</div><div class="my_table my_td_width40">' + cdType + '</div><div  class="my_table my_td_width30">' + n + '</div>';
				ul[1].appendChild(li);
			}
			
			
			var ajaxPictureformdata = function() {
				var sclb;
				mui.ajax(url + 'my_plus/my_project_xinx2.php', {
					data: {
						sjc: sjc,
						gclb: gclb,
						sclb:'观感评价'
					},
					dataType: 'json',
					type: 'post',
					timeout: 10000,
					success: function(data) {
						//						alert(data);
						var length = data.length;
						for(var i = 0; i < length - 1; i++) {
							cdfj = data[i].测点附件;
							mydiv.style.backgroundImage = "url(" + url + "upload/" + cdfj + ")";
//							alert(url);
						}
					},
					error: function(xhr, type, errorThrown) {
						//异常处理；
						//alert('ajax错误'+type); 
						return callback('ajax错误' + type + errorThrown);
					}
				});
			}

			//观感评价，获取数据函数
			var ajaxggpj = function() {
				mui.ajax(url + 'my_ggpj_cdbz.php', {
					data: {
						sjc: sjc,
						gclb:gclb
					},
					dataType: 'json',
					type: 'post',
					timeout: 10000,
					success: function(data) {
						var length = data.length;
						for(var i = 0; i < length - 1; i++) {
							var bhao = data[i].编号;
							var cdlx = data[i].测点类型;
							var ggpj = data[i].观感评价;
							var sm = data[i].说明;
							var pageX = data[i].pageX;
							var pageY = data[i].pageY;
							var cdlb = data[i].测点类别;
							var world = '';
							if (gclb == "外墙工程") {
								if (cdlb == "外墙铺贴"){
									world='A';
								} else if (cdlb == "外墙涂料"){
									world='B'; 
								} else if (cdlb == "外墙石材"){
									world='C';
								}
							
							} else if (gclb == "天花工程") {
								if (cdlb == "普遍开裂"){
									world='A' ;
								} else if (cdlb == "有吊顶天花"){
									world='B';
								} else if (cdlb == "无吊顶天花"){
									world='C';
								} else if (cdlb == "线条"){
									world='D';
								}
							} else if (gclb == "墙面工程") {
								if (cdlb == "普遍空鼓、开裂"){
									world='A';
								} else if (cdlb == "涂料工程"){
									world='B';
								} else if (cdlb == "裱糊工程"){
									world='C';
								} else if (cdlb == "木饰面"){
									world='D';
								} else if (cdlb == "软硬包"){
									world='E'; 
								} else if (cdlb == "石材、瓷砖铺贴"){ 
									world='F';
								} else if (cdlb == "玻璃、金属"){
									world='G';
								}
							} else if (gclb == "地面工程") {
								if (cdlb == "地砖"){
									world='A';
								} else if (cdlb == "木地板"){
									world='B';
								} else if (cdlb == "石材"){
									world='C';
								} else if (cdlb == "踢脚线"){
									world='D';
								} else if (cdlb == "门槛石"){
									world='E'; 
								} 
							} else if (gclb == "厨房") {
								if (cdlb == "橱柜"){
									world='A';
								} else if (cdlb == "电器"){
									world='B';
								} else if (cdlb == "给、排水"){
									world='C';
								}
							} else if (gclb == "卫生间、阳露台") {
								if (cdlb=="马桶、浴缸、尿斗" ) {
									world='A';
								} else if (cdlb=="浴室镜、柜" ) {
									world='B';
								} else if (cdlb=="淋浴屏风" ) {
									world='C';
								} else if (cdlb=="地洞" ) {
									world='D';
								} else if (cdlb=="龙头、花洒、五金件" ) {
									world='E';
								} else if (cdlb=="给、排水") {
									world='F';
								}else {
									
								}
							}else if (gclb == "电气工程") {
								if (cdlb=='空调'){
									world='A';
								} else if (cdlb=='电箱、排气扇、开关、插座'){
									world='B';
								} else if (cdlb=='灯具'){
									world='C';
								}
							}else if (gclb == "门窗工程") {
								if (cdlb=='木门'){
									world='A';
								} else if(cdlb=='铝合金、塑钢门、窗') {
									world='B';
								}
							}else if (gclb == "栏杆、楼梯扶手") {
								if ($cdlx == "铁艺") {
									world='A';
								} else if ($cdlx == "观感") {
									world='B';
								}  else {
									
								} 
							}else if (gclb == "电梯前室、首层大堂") {
								if(cdlb=="天花"){
									world='A';
								} else if(cdlb=="墙面"){
									world='B';
								} else if(cdlb=="地面"){
									world='C';
								} else {
									
								}
							} else {
								
							};
							createggpj(bhao, cdlx, ggpj);     //观感评价列表的创建函数
							createkbcd(bhao, pageX, pageY ,world);   //可供布置的测点的创建函数
						}
//						alert(data);
					},
					error: function(xhr, type, errorThrown) {
						//异常处理；
						//alert('ajax错误'+type);
						return callback('ajax错误' + type + errorThrown);
					}
				});
			};
			//观感评价列表创建函数
			var createggpj = function(bhao, cdlx, ggpj) {
				var ul = document.getElementsByClassName('mui-table-view');
				var li = document.createElement("li");
				li.className = "mui-table-view-cell";
				li.innerHTML = '<div class="my_table my_td_width30">' + bhao + '</div><div class="my_table my_td_width40">' + cdlx + '</div><div id="sc' + bhao + '" class="my_table my_td_width30">' + ggpj + '</div>';
				ul[0].appendChild(li);
			};
			//创建测点布置（可供布置的测点）
			var createkbcd = function(bhao, pageX, pageY,world) {
				var bzcd = document.getElementsByClassName('bzcd');
				var span = document.createElement("span");
				span.id = "cd" + bhao;
				var firstWord = bhao.substr(0,1);
//				根据不同的测点类型不同的颜色
				if(gclb=='混凝土工程' || gclb=='砌体工程' || gclb=='内墙抹灰工程' || gclb=='外墙防水工程' || gclb=='门窗工程' || gclb=='卫生间、沉箱工程' || gclb=='水电安装工程' ||  gclb=='屋面及楼地面工程') {
					if(firstWord == 'A') {
						span.className = "mui-badge mui-badge-yellow";
					} else if (firstWord == 'B') {
						span.className = "mui-badge mui-badge-blue";
					} else if ( firstWord == 'C') {
						span.className = "mui-badge mui-badge-red";
					} else if ( firstWord == 'D') {
						span.className = "mui-badge mui-badge-purple";
					} else if ( firstWord == 'E') {
						span.className = "mui-badge mui-badge-green"
					} else if ( firstWord == 'F') {
						span.className = "mui-badge mui-badge-F"
					} else if ( firstWord == 'G') {
						span.className = "mui-badge mui-badge-G"
					} else if ( firstWord == 'H') {
						span.className = "mui-badge mui-badge-H"
					} else if ( firstWord == 'I') {
						span.className = "mui-badge mui-badge-I"
					}
				} else {
					if(world == 'A') {
						span.className = "mui-badge mui-badge-yellow";
					} else if (world == 'B') {
						span.className = "mui-badge mui-badge-blue";
					} else if ( world == 'C') {
						span.className = "mui-badge mui-badge-red";
					} else if ( world == 'D') {
						span.className = "mui-badge mui-badge-purple";
					} else if ( world == 'E') {
						span.className = "mui-badge mui-badge-green"
					} else if ( world == 'F') {
						span.className = "mui-badge mui-badge-F"
					} else if ( world == 'G') {
						span.className = "mui-badge mui-badge-G"
					} else if ( world == 'H') {
						span.className = "mui-badge mui-badge-H"
					} else if ( world == 'I') {
						span.className = "mui-badge mui-badge-I"
					}
				}
				span.innerText = bhao;
				bzcd[0].appendChild(span);
				if(pageX && pageY) {
					span.classList.add("myposition");
					span.style.left = pageX;
					span.style.top = pageY;
				}
				window.addEventListener('cdlx', function(event) {
					span.classList.remove('my_none');
					var cdfc = event.detail.flag;
//					alert(cdfc);
					if(cdfc == "A") {
						if(firstWord !== "A") {
							span.classList.add('my_none');
						}
					} else if(cdfc == "B") {
						if(firstWord !== "B") {
							span.classList.add('my_none');
						}
					} else if(cdfc == "C") {
						if(firstWord !== "C") {
							span.classList.add('my_none');
						}
					} else if(cdfc == "D") {
						if(firstWord !== "D") {
							span.classList.add('my_none');
						}
					} else if(cdfc == "E") {
						if(firstWord !== "E") {
							span.classList.add('my_none');
						}
					} else if(cdfc == "F") {
						if(firstWord !== "F") {
							span.classList.add('my_none');
						}
					} else if(cdfc == "G") {
						if(firstWord !== "G") {
							span.classList.add('my_none');
						}
					} else if(cdfc == "H") {
						if(firstWord !== "H") {
							span.classList.add('my_none');
						}
					} else if(cdfc == "I") {
						if(firstWord !== "I") {
							span.classList.add('my_none');
						}
					} else if(cdfc == "J") {
						if(firstWord !== "J") {
							span.classList.add('my_none');
						}
					} else if(cdfc == "K") {
						if(firstWord !== "K") {
							span.classList.add('my_none');
						}
					} else if(cdfc == "L") {
						if(firstWord !== "L") {
							span.classList.add('my_none');
						}
					} else if(cdfc == "M") {
						if(firstWord !== "M") {
							span.classList.add('my_none');
						}
					} else if(cdfc == "N") {
						if(firstWord !== "N") {
							span.classList.add('my_none');
						}
					} else if(cdfc == "O") {
						if(firstWord !== "O") {
							span.classList.add('my_none');
						}
					} else if(cdfc == "P") {
						if(firstWord !== "P") {
							span.classList.add('my_none');
						}
					} else if(cdfc == "Q") {
						if(firstWord !== "Q") {
							span.classList.add('my_none');
						}
					} else if(cdfc == "R") {
						if(firstWord !== "R") {
							span.classList.add('my_none');
						}
					} else if(cdfc == "S") {
						if(firstWord !== "S") {
							span.classList.add('my_none');
						}
					} else if(cdfc == "T") {
						if(firstWord !== "T") {
							span.classList.add('my_none');
						}
					} else if(cdfc == "U") {
						if(firstWord !== "U") {
							span.classList.add('my_none');
						}
					} else if(cdfc == "V") {
						if(firstWord !== "V") {
							span.classList.add('my_none');
						}
					} else if(cdfc == "W") {
						if(firstWord !== "W") {
							span.classList.add('my_none');
						}
					} else if(cdfc == "X") {
						if(firstWord !== "X") {
							span.classList.add('my_none');
						}
					} else if(cdfc == "Y") {
						if(firstWord !== "Y") {
							span.classList.add('my_none');
						}
					} else if(cdfc == "Z") {
						if(firstWord !== "Z") {
							span.classList.add('my_none');
						}
					} else if(cdfc == "$") {
						if(firstWord !== "$") {
							span.classList.add('my_none');
						}
					}
				})
			};

			
			ajaxformdata();
			ajaxggpj();
			ajaxPictureformdata();
			//基本信息保存
			
			save.addEventListener('tap', function() {
				var mydata = {
					sjc: sjc,
					mc: mc.value,
					jcbw: jcbw.value,
					jcrq: jcrq.value,
					jcry: jcry.value,
					sgbz: sgbz.value,
					zzxm: zzxm.value,
					lxdh: lxdh.value,
					sgrq: sgrq.value,
					gzms: gzms.value,
					checkId: checkId
				};
				var btnArray = ['是', '否'];
				mui.confirm('确定修改数据吗？', '实测实量', btnArray, function(e) {
					if(e.index == 0) {
						ajaxform(mydata, function(err) {
							if(err) {
								plus.nativeUI.toast(err);
								return;
							}
							plus.nativeUI.alert('保存成功');
						});
					} else {
		
					}
				});
			});
			
			//基本信息，编辑保存函数
			var ajaxform = function(mydata, callback) {
				callback = callback || $.noop;
				mydata = mydata || {};
				mydata.mc = mydata.mc || '';
				mydata.jcbw = mydata.jcbw || '';
				mydata.jcrq = mydata.jcrq || '';
				mydata.jcry = mydata.jcry || '';
				mydata.sgbz = mydata.sgbz || '';
				mydata.zzxm = mydata.zzxm || '';
				mydata.lxdh = mydata.lxdh || '';
				mydata.sgrq = mydata.sgrq || '';
//				if(mydata.mc.length < 1) {
//					return callback('名称不能为空！');
//				}
//				if(mydata.jcbw.length < 1) {
//					return callback('检查部位不能为空！');
//				}
//				if(mydata.jcrq.length < 1) {
//					return callback('检查日期不能为空！');
//				}
//				if(mydata.sgbz.length < 1) {
//					return callback('施工班组不能为空！');
//				}
//				if(mydata.zzxm.length < 1) {
//					return callback('组长姓名不能为空！');
//				}
//				if(mydata.sgrq.length < 1) {
//					return callback('施工日期不能为空！');
//				}
				mui.ajax(url + 'my_project_ggpj_save.php', {
					data: {
						sjc: sjc,
						mc: mydata.mc,
						jcbw: mydata.jcbw,
						jcrq: mydata.jcrq,
						jcry: mydata.jcry,
						sgbz: mydata.sgbz,
						zzxm: mydata.zzxm,
						lxdh: mydata.lxdh,
						sgrq: mydata.sgrq,
						gzms: mydata.gzms,
						checkId: mydata.checkId
					},
					dataType: 'json',
					type: 'post',
					timeout: 10000,
					success: function(data) {
						//						alert(data.result);
						if(data.result == 'success') {
							return callback();
						} else {
							return callback('服务器返回error');
						}
					},
					error: function(xhr, type, errorThrown) {
						//异常处理；
						//alert('ajax错误'+type);
						return callback('ajax错误' + type + errorThrown);
					}
				});
			};

			
			//监听可供布置的测点，这是对样式的一种监听
			var cdbhao = "";
			mui('.bzcd').on('tap', 'span', function() {
				cdbhao = this.innerText;
//				alert(cdbhao);
				out.innerHTML = "您【单击】了测点" + cdbhao + "，可进行测点布置。";
			});
			
			
			//mydiv区域监听
			mydiv.addEventListener('tap', function(e) {
				var pageX = e.detail.touches[0].pageX;							//获取点击点的X坐标
				var pageY = e.detail.touches[0].pageY;	
//				alert(pageX+"--"+pageY);//获取点击点的Y坐标
				var pageX1 = parseInt((pageX / screen.width) * 100) + '%';
				var pageY1 = parseInt((pageY / (mydiv.offsetHeight)) * 100 - 33) + '%';
				var spanid = "cd" + cdbhao;
				spanid = document.getElementById(spanid);
				spanid.classList.add("myposition");
				spanid.style.left = pageX - 30 + "px";
				spanid.style.top = pageY - 110 + "px";
				out.innerHTML = "您在给" + cdbhao + "测点布置。";
			});
			
			//可供布置的测点监听,双击
			mui('.bzcd').on('doubletap', 'span', function() {
				//alert(45);
				var sjbhao = this.innerText;
				kbbhao.value = sjbhao;
				out.innerHTML = "您【双击】了测点" + cdbhao + "，可修改测点基本信息。";
				mui.ajax(url + 'my_ggpj_cdbu_du.php', {
					data: {
						sjc: sjc,
						bhao: sjbhao,
						checkId: checkId
					},
					dataType: 'json',
					type: 'post',
					timeout: 10000,
					success: function(data) {
						var length = data.length;
						for(var i = 0; i < length - 1; i++) {
							kbcdlx.value = data[i].测点类别;
							kbggpj.value = data[i].观感评价;
						}
						mui("#cdbzPopover").popover("toggle");
					},
					error: function(xhr, type, errorThrown) {
						//异常处理；
						//alert('ajax错误'+type);
						return callback('ajax错误' + type + errorThrown);
					}
				});

			});
			
			//测点布置菜单确定监听
			kbqding.addEventListener('tap', function() {
//				alert(kbggpj.value);
				var xbhao = kbbhao.value;
				var xggpj = kbggpj.value;
				if(xggpj.length < 1) {
					plus.nativeUI.toast('观感评价不能为空！');
				} else {
					mui.ajax(url + 'my_ggpj_xgcd.php', {
						data: {
							sjc: sjc,
							bhao: xbhao,
							ggpj: xggpj,
							checkId: checkId
						},
						dataType: 'json',
						type: 'post',
						timeout: 10000,
						success: function(data) {
							if(data.result == "success") {
								var m = "sc" + xbhao;
								var divggpj = document.getElementById(m);
								divggpj.innerText = xggpj;
								plus.nativeUI.toast('修改成功！');
								mui("#cdbzPopover").popover("toggle");
							} else {
								plus.nativeUI.toast('修改失败！');
							}
//							alert(data.result);
						},
						error: function(xhr, type, errorThrown) {
							//异常处理；
							//alert('ajax错误'+type);
							return callback('ajax错误' + type + errorThrown);
						}
					});
				}

			});
			//关闭菜单
			kbgbi.addEventListener('tap', function() {
				mui("#cdbzPopover").popover("toggle");
			});
			
			//保存布置的监听				
			bcbz.addEventListener('tap', function() {
				var span = document.getElementsByClassName('mui-badge ');
				out.innerHTML = "您点击了【保存布置】，同步云端数据";
				var btnArray = ['是', '否'];
				mui.confirm('确定要保存布置吗？', '实测实量', btnArray, function(e) {
					if(e.index == 0) {
						for(var i = 0; i < span.length; i++) {
							var mbhao = span[i].innerText;
							mbhao = mbhao.toString();
							var left = span[i].style.left;
							var top = span[i].style.top;
							var left1 = left.replace(/[^0-9^.]/ig, "");
							var top1 = top.replace(/[^0-9^.]/ig, "");
							var pageX1 = parseInt((left1 / screen.width) * 100) + '%';
							var pageY1 = parseInt((top1 / (mydiv.offsetHeight)) * 100) + '%';
							mui.ajax(url + 'my_plus/save_ggpj_cdbz.php', {
								data: {
									sjc: sjc,
									bhao: mbhao,
									left: left,
									top: top,
									pageX1: pageX1,
									pageY1: pageY1,
									checkId: checkId,
									gclb:gclb
								},
								dataType: 'json',
								type: 'post',
								timeout: 10000,
								success: function(data) {
									
								},
								error: function(xhr, type, errorThrown) {
									//异常处理；
									//alert('ajax错误'+type+errorThrown);
									return callback('ajax错误' + type + errorThrown);
								}
							});
						}
						setTimeout("plus.nativeUI.alert('测点布置保存成功！');",2000);
//						plus.nativeUI.alert('测点布置保存成功！');
					} else {

					}
				});

			});
			
			//清空布置
			qkbz.addEventListener('tap', function() {
				var span = document.getElementsByClassName('mui-badge ');
				out.innerHTML = "您点击了【清空布置】，保存后，同步云端数据。";
				var btnArray = ['是', '否'];
				mui.confirm('确定要清空布置吗？', '实测实量', btnArray, function(e) {
					if(e.index == 0) {
						for(var i = 0; i < span.length; i++) {
							span[i].classList.remove("myposition");
							span[i].style.left = "";
							span[i].style.top = "";
						}
					} else {}
				});

			});
			
			//观感评价列表监听
			mui('.mui-table-view').on('tap', 'li', function() {
				bhao.value = this.childNodes[0].innerText;
				cdlx.value = this.childNodes[1].innerText;
				ggpj.value = this.childNodes[2].innerText;
				mui("#middlePopover").popover("toggle");
			});
			
			//观感输入菜单确定监听
			ggqding.addEventListener('tap', function() {
//				alert(ggpj.value);
				var xbhao = bhao.value;
				var xggpj = ggpj.value;
				if(xggpj.length < 1) {
					plus.nativeUI.toast('观感评价不能为空！');
				} else {
					mui.ajax(url + 'my_ggpj_xgcd.php', {
						data: {
							sjc: sjc,
							bhao: xbhao,
							ggpj: xggpj,
							checkId:checkId
						},
						dataType: 'json',
						type: 'post',
						timeout: 10000,
						success: function(data) {
							if(data.result == "success") {
								var m = "sc" + xbhao;
								var divggpj = document.getElementById(m);
								divggpj.innerText = xggpj;
								plus.nativeUI.toast('修改成功！');
								mui("#middlePopover").popover("toggle");
							} else {
								plus.nativeUI.toast('修改失败！');
							}
//							alert(data);
						},
						error: function(xhr, type, errorThrown) {
							//异常处理；
							//alert('ajax错误'+type);
							return callback('ajax错误' + type + errorThrown);
						}
					});
				}

			});
			//观感评价菜单关闭
			gggbi.addEventListener('tap', function() {
				mui("#middlePopover").popover("toggle");
			});
});
			//上传文件
var i = 1,
	gentry = null,
	w = null;
var hl = null,
	le = null,
	de = null,
	ie = null;
var unv = true;
// H5 plus事件处理
function plusReady_camera() {
	// 获取摄像头目录对象
	plus.io.resolveLocalFileSystemURL("_doc/", function(entry) {
		entry.getDirectory("camera/fhys", { create: true }, function(dir) {
			gentry = dir;
			//updateHistory();
		}, function(e) {
			outSet("Get directory \"camera\fhys\" failed: " + e.message);
		});
	}, function(e) {
		outSet("Resolve \"_doc/\" failed: " + e.message);
	});
}
if(window.plus) {
	plusReady_camera();
} else {
	document.addEventListener("plusready", plusReady_camera, false);
}
// 监听DOMContentLoaded事件
document.addEventListener("DOMContentLoaded", function() {
	// 获取DOM元素对象
	//验收照片
	hl_yszp = document.getElementById("history_yszp");
	le_yszp = document.getElementById("empty_yszp");

	de = document.getElementById("display");
	if(ie = document.getElementById("index")) {
		ie.onchange = indexChanged;
	}
	// 判断是否支持video标签
	unv = !document.createElement('video').canPlayType;
}, false);

//选择前后摄像头
function changeIndex() {
	outSet("选择摄像头：");
	ie.focus();
}

function indexChanged() {
	de.innerText = ie.options[ie.selectedIndex].innerText;
	i = parseInt(ie.value);
	outLine(de.innerText);
}

// 拍照函数
function getImage(lx) {
	outSet("开始拍照：");
	var cmr = plus.camera.getCamera(); //获取摄像头管理对象	
	//进行拍照操作cmr.captureImage( successCB, errorCB, option );
	cmr.captureImage(function(p) {
		outLine("成功：" + p);
		// resolveLocalFileSystemURL(url,succesCB,errorCB )通过URL参数获取目录对象或文件对象
		plus.io.resolveLocalFileSystemURL(p, function(entry) {
			createItem(p, entry, lx);
		}, function(e) {
			outLine("读取拍照文件错误：" + e.message);
		});
	}, function(e) {
		outLine("失败：" + e.message);
	}, { filename: "_doc/camera/fhys/", index: 1 });
}

// 从相册中选择图片
function galleryImg(lx) {
	// 从相册中选择图片
	outSet("从相册中选择图片:");
	plus.gallery.pick(function(path) {
		outLine(path);
		plus.io.resolveLocalFileSystemURL(path, function(entry) {
			createItem(path, entry, lx);
			//alert(entry.name);
		}, function(e) {
			outLine("读取拍照文件错误：" + e.message);
		});
		//showImg( path );
		//createItem(path);
	}, function(e) {
		outSet("取消选择图片");
	}, { filter: "image" });
}

// 显示文件
function displayFile(li) {
	if(w) {
		outLine("重复点击！");
		return;
	}
	if(!li || !li.entry) {
		ouSet("无效的媒体文件");
		return;
	}
	var name = li.entry.name;
	var suffix = name.substr(name.lastIndexOf('.'));
	var url = "";
	if(suffix == ".mov" || suffix == ".3gp" || suffix == ".mp4" || suffix == ".avi") {
		//if(unv){plus.runtime.openFile("_doc/camera/"+name);return;}
		url = "camera_video.html";
	} else {
		url = "camera_image.html";
	}
	w = plus.webview.create(url, url, { hardwareAccelerated: true, scrollIndicator: 'none', scalable: true, bounce: "all" });
	w.addEventListener("loaded", function() {
		w.evalJS("loadMedia('" + li.entry.toLocalURL() + "')");
		//w.evalJS( "loadMedia(\""+"http://localhost:13131/_doc/camera/"+name+"\")" );
	}, false);
	w.addEventListener("close", function() {
		w = null;
	}, false);
	w.show("pop-in");
}

// 添加播放项
var index;
var index_yszp = 1;
var index_hxpmt = 1;
var index_ysjl = 1;
var index_bcjl = 1;
//alert('222')
function createItem(p, entry, lx) {
	var fileName=entry.name;
//	alert(fileName);
	var li = document.createElement("li");
	li.className = "ditem";
	li.innerHTML = '<span class="iplay"><font class="aname"></font><br/><font class="ainf"></font></span>';
	li.setAttribute("onclick", "displayFile(this);");
	if(lx == 'yszp') {
		hl = hl_yszp;
		le = le_yszp;
		files_yszp.push({ name: "upfile" + index_yszp, path: p });
		index_yszp++;
	} else {

	}
	hl.insertBefore(li, le.nextSibling);
	li.querySelector(".aname").innerText = fileName;
	li.querySelector(".ainf").innerText = "...";
	li.entry = entry;
	updateInformation(li);
	le.style.display = "none";
}
// 获取录音文件信息
function updateInformation(li) {
	if(!li || !li.entry) {
		return;
	}
	var entry = li.entry;
	entry.getMetadata(function(metadata) {
		li.querySelector(".ainf").innerText = dateToStr(metadata.modificationTime);
	}, function(e) {
		outLine("获取文件\"" + entry.name + "\"信息失败：" + e.message);
	});
}
// 获取录音历史列表
function updateHistory() {
	if(!gentry) {
		return;
	}
	var reader = gentry.createReader();
	reader.readEntries(function(entries) {
		for(var i in entries) {
			if(entries[i].isFile) {
				createItem(entries[i]);
			}
		}
	}, function(e) {
		outLine("读取录音列表失败：" + e.message);
	});
}

// 清除历史记录
function cleanHistory(lx) {
	var btnArray = ['确定', '取消'];
	mui.confirm('您确定要清空记录吗？', '警告:', btnArray, function(e) {
		if(e.index == 0) {
			if(lx == 'yszp') {
				hl_yszp.innerHTML = '<li id="empty_yszp" class="ditem-empty">无历史记录</li>';
				le_yszp = document.getElementById("empty_yszp");
				files_yszp = [];
				index_yszp = 1;
			} else {

			}

			// 删除音频文件
			outSet("清空拍照录像历史记录：ok");
		} else {
			//info.innerText = '取消';
			return;
		}
	});
}

/*----------上传----------*/
var server = url + "fileupload.php";
//var server="http://demo.dcloud.net.cn/helloh5/uploader/upload.php";
var files = [];
var files_yszp = [];

function upload(lx, clean) {
	//获取url参数值
	function geturl(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}
	var sjc = geturl("sjc");
	var xmid = geturl("gcid");
	var mc = geturl("mc");
	var gclb = geturl("gclb");
	var checkId = geturl("checkId");
	var sclb;
//	alert(checkId);
	gclb = decodeURI(gclb);
	mc = decodeURI(mc);
	//			alert(sjc);
	if(lx == 'yszp') {
		files = files_yszp;
//		alert(files.path)
	} else {

	}
	if(files.length <= 0) {
		plus.nativeUI.alert("没有添加上传文件！");
		return;
	}
	outSet("开始上传：")
	var wt = plus.nativeUI.showWaiting();
	var task = plus.uploader.createUpload(server, { method: "POST" }, function(t, status) {
		//上传完成
		if(status == 200) {
			outLine("上传成功：" + t.responseText);
			wt.close();
			var button_lx = document.getElementById(lx);
			var button_clean = document.getElementById(clean);
			button_lx.disabled = true;
			button_clean.disabled = true;
			button_lx.innerText = "上传成功";
			var wobj = plus.webview.currentWebview();					
			wobj.reload(true);
//			var target = plus.webview.currentWebview().opener();
//			mui.fire(target, 'json_bj', {
//				flag: 'ok',
//			});
//			mui.back();
		} else {
			outLine("上传失败：" + status);
			wt.close();
		}
	});
	//			alert(sjc);
	task.addData("lx", lx);
	task.addData("uid", getUid());
	nub = files.length.toString();
//	alert(nub);
	task.addData("nub", nub);
	task.addData("sjc", sjc);
	task.addData("xmid",xmid);
	task.addData("gclb",gclb);
	task.addData("checkId",checkId);
	task.addData("sclb",'观感评价');
	task.addData("mc",mc);
	for(var i = 0; i < files.length; i++) {
		var f = files[i];
		task.addFile(f.path, { key: f.name });
	}
	task.start();
	files = [];
}

// 产生一个随机数
function getUid() {
	return Math.floor(Math.random() * 100000000 + 10000000).toString();
}