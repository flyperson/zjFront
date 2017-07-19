	/////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////hjh飞机
mui.init({
	swipeBack:true //启用右滑关闭功能
	});
	(function($) {
		$('#scroll').scroll({
			indicators: true //是否显示滚动条
			});
	})(mui);
	
	// H5 plus事件处理
	mui.plusReady(function(){	
		//接收上一个页面传递的值
			var self = plus.webview.currentWebview();
			var sjc = self.sjc;
			var gcid = self.gcid;
			var gclb = self.gclb;
			
			
			
			var myForm = document.getElementById("myDelform");
			if (gclb=='混凝土工程'){
				var cdlbSelect = '<option value="无"  selected="selected">无</option><option value="坎台-工艺要求"  >坎台-工艺要求</option><option value="观感质量">观感质量</option>';
				cdlb.innerHTML = cdlbSelect;
				
				cdlb.addEventListener('change',function(){
					var value = cdlb.value;
//					var cdlxSelect = '<option value="无" selected="selected">无</option><option value="一次成型">一次成型</option><option value="位置、尺寸">位置、尺寸</option><option value="支模" >支模</option>';
					if (value =='观感质量'){
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="砼坎台成型">砼坎台成型</option><option value="砼柱、墙、板">砼柱、墙、板</option>';
					} else {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="一次成型">一次成型</option><option value="位置、尺寸">位置、尺寸</option><option value="支模" >支模</option>';
					}
					cdlx.innerHTML = cdlxSelect;
				});
				
			} else if (gclb=='砌体工程'){
				var cdlbSelect = '<option value="无"  selected="selected">无</option><option value="工艺要求"  >工艺要求</option><option value="观感质量">观感质量</option>';
				cdlb.innerHTML = cdlbSelect;
				cdlb.addEventListener('change',function(){
					var value = cdlb.value;
					if (value =='工艺要求'){
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="组砌">组砌</option><option value="顶砖">顶砖</option><option value="留槎、拉结筋">留槎、拉结筋</option><option value="二次构件及保护">二次构件及保护</option><option value="门窗洞口、施工洞口">门窗洞口、施工洞口</option>';
					} else {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="砌筑观感">砌筑观感</option><option value="二次构件">二次构件</option>';
					};
					cdlx.innerHTML = cdlxSelect;
				});
			} else if (gclb=='内墙抹灰工程'){
				var cdlbSelect = '<option value="无"  selected="selected">无</option><option value="严重空鼓、开裂" >严重空鼓、开裂</option><option value="工艺要求"  >工艺要求</option><option value="观感质量">观感质量</option>';
				cdlb.innerHTML = cdlbSelect;
				cdlb.addEventListener('change',function(){
					var value = cdlb.value;
					if (value =='工艺要求'){
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="基底、拉毛">基底、拉毛</option><option value="加强网">加强网</option>';
					} else if (value == '严重空鼓、开裂') {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="单户通长裂缝">单户通长裂缝</option><option value="单户空鼓">单户空鼓</option>';
					} else {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="空鼓">空鼓</option><option value="开裂">开裂</option><option value="面层、修补">面层、修补</option><option value="细部外露、收口">细部外露、收口</option>';
					};
					cdlx.innerHTML = cdlxSelect;
				});
			} else if (gclb=='外墙防水工程'){
				var cdlbSelect = '<option value="无" selected="selected">无</option><option value="材料要求">材料要求</option><option value="工艺要求">工艺要求</option><option value="观感质量">观感质量</option>';
				cdlb.innerHTML = cdlbSelect;
				cdlb.addEventListener('change',function(){
					var value = cdlb.value;
					if (value =='材料要求'){
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="材料">材料</option>';
					} else if (value == '工艺要求') {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="基底、拉毛、挂网">基底、拉毛、挂网</option><option value="抹灰、防水、保温层工艺">抹灰、防水、保温层工艺</option><option value="拦河、压顶、外墙线条">拦河、压顶、外墙线条</option><option value="分格缝、滴水线">分格缝、滴水线</option>';
					} else {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="抹灰、防水、保温层观感">抹灰、防水、保温层观感</option><option value="檐口、歇山">檐口、歇山</option><option value="渗漏">渗漏</option>';
					};
					cdlx.innerHTML = cdlxSelect;
				});
				
			} else if (gclb=='门窗工程'){
				var cdlbSelect = '<option value="无" selected="selected">无</option><option value="工艺要求">工艺要求</option><option value="观感质量">观感质量</option>';
				cdlb.innerHTML = cdlbSelect;
				cdlb.addEventListener('change',function(){
					var value = cdlb.value;
					if (value =='工艺要求'){
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="洞口尺寸">洞口尺寸</option><option value="固定">固定</option><option value="塞缝">塞缝</option><option value="成品保护">成品保护</option>';
					} else if (value == '观感质量') {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="渗漏">渗漏</option><option value="窗边">窗边</option><option value="打胶">打胶</option>';
					} else {
						
					};
					cdlx.innerHTML = cdlxSelect;
				});
			} else if (gclb=='卫生间、沉箱工程'){
				var cdlbSelect = '<option value="无" selected="selected">无</option><option value="材料要求及普遍渗漏">材料要求及普遍渗漏</option><option value="工艺要求">工艺要求</option><option value="观感质量">观感质量</option>';
				cdlb.innerHTML = cdlbSelect;
				cdlb.addEventListener('change',function(){
					var value = cdlb.value;
					if (value =='工艺要求'){
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="基底">基底</option><option value="防水">防水</option><option value="细部">细部</option><option value="同层排水">同层排水</option>';
					} else if (value == '观感质量') {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="渗漏">渗漏</option><option value="空鼓开裂">空鼓开裂</option><option value="降板处理">降板处理</option>';
					} else {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="材料">材料</option><option value="每户渗漏点">每户渗漏点</option>';
					};
					cdlx.innerHTML = cdlxSelect;
				});
			} else if (gclb=='水电安装工程'){
				var cdlbSelect = '<option value="无" selected="selected">无</option><option value="工艺要求">工艺要求</option><option value="观感质量">观感质量</option>';
				cdlb.innerHTML = cdlbSelect;
				cdlb.addEventListener('change',function(){
					var value = cdlb.value;
					if (value =='工艺要求'){
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="套管">套管</option><option value="给排水">给排水</option><option value="布管布线">布管布线</option><option value="空调洞">空调洞</option>';
					} else if (value == '观感质量') {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="渗漏">渗漏</option>';
					} else {
						
					};
					cdlx.innerHTML = cdlxSelect;
				});
			} else if (gclb=='屋面及楼地面工程'){
				var cdlbSelect = '<option value="无" selected="selected">无</option><option value="要求及普遍渗漏" >要求及普遍渗漏</option><option value="工艺要求">工艺要求</option><option value="观感质量">观感质量</option>';
				cdlb.innerHTML = cdlbSelect;
				cdlb.addEventListener('change',function(){
					var value = cdlb.value;
					if (value =='工艺要求'){
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="变形缝">变形缝</option><option value="檐口">檐口</option><option value="排水">排水</option><option value="防水">防水</option>';
					} else if (value == '观感质量') {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="渗漏">渗漏</option><option value="空鼓开裂">空鼓开裂</option>';
					} else {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="材料材料">材料材料</option><option value="材料屋面防水施工前每户渗漏处">材料屋面防水施工前每户渗漏处</option>';
					};
					cdlx.innerHTML = cdlxSelect;
				});
			} else if (gclb=='外墙工程'){
				var cdlbSelect = '<option value="无" selected="selected">无</option><option value="外墙铺贴" >外墙铺贴</option><option value="外墙涂料">外墙涂料</option><option value="外墙石材">外墙石材</option>';
				cdlb.innerHTML = cdlbSelect;
				cdlb.addEventListener('change',function(){
					var value = cdlb.value;
					if (value =='外墙铺贴'){
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="图案">图案</option><option value="表面">表面</option><option value="收口">收口</option><option value="线条">线条</option>';
					} else if (value == '外墙涂料') {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="基层">基层</option><option value="层数">层数</option><option value="表面">表面</option><option value="线条">线条</option>';
					} else {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="安装">安装</option><option value="表面">表面</option><option value="线条">线条</option><option value="打胶">打胶</option>';
					};
					cdlx.innerHTML = cdlxSelect;
				});
			} else if (gclb=='天花工程'){
				var cdlbSelect = '<option value="无" selected="selected">无</option><option value="普遍开裂" >普遍开裂</option><option value="有吊顶天花">有吊顶天花</option><option value="无吊顶天花">无吊顶天花</option><option value="线条">线条</option>';
				cdlb.innerHTML = cdlbSelect;
				cdlb.addEventListener('change',function(){
					var value = cdlb.value;
					if (value =='普遍开裂'){
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="普遍开裂">普遍开裂</option>';
					} else if (value == '有吊顶天花') {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="安装">安装</option><option value="表面">表面</option><option value="油漆">油漆</option>';
					} else if (value == '无吊顶天花') {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="基层">基层</option><option value="表面">表面</option><option value="油漆">油漆</option>';
					} else {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="安装">安装</option><option value="拼接">拼接</option><option value="表面">表面</option><option value="油漆">油漆</option>';
					};
					cdlx.innerHTML = cdlxSelect;
				});
			} else if (gclb=='墙面工程'){
				var cdlbSelect = '<option value="无" selected="selected">无</option><option value="普遍空鼓、开裂" >普遍空鼓、开裂</option><option value="涂料工程">涂料工程</option><option value="裱糊工程">裱糊工程</option><option value="木饰面">木饰面</option><option value="软硬包">软硬包</option><option value="石材、瓷砖铺贴">石材、瓷砖铺贴</option><option value="玻璃、金属">玻璃、金属</option>';
				cdlb.innerHTML = cdlbSelect;
				cdlb.addEventListener('change',function(){
					var value = cdlb.value;
					if (value =='普遍空鼓、开裂'){
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="单户通长裂缝">单户通长裂缝</option><option value="单户瓷砖空鼓">单户瓷砖空鼓</option>';
					} else if (value == '涂料工程') {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="基层">基层</option><option value="层数">层数</option><option value="表面">表面</option><option value="油漆">油漆</option>';
					} else if (value == '裱糊工程') {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="基层">基层</option><option value="预埋">预埋</option><option value="表面">表面</option><option value="拼接">拼接</option><option value="收口">收口</option>';
					} else if (value == '木饰面') {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="基层">基层</option><option value="安装">安装</option><option value="表面">表面</option><option value="细部">细部</option>';
					} else if (value == '软硬包') {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="基层">基层</option><option value="安装">安装</option><option value="表面">表面</option><option value="细部">细部</option>';
					} else if (value == '石材、瓷砖铺贴') {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="放样">放样</option><option value="挂石">挂石</option><option value="排版">排版</option><option value="表面">表面</option><option value="收口">收口</option>';
					} else if (value == '玻璃、金属') {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="安装">安装</option><option value="表面">表面</option><option value="打胶">打胶</option>';
					} else {
						
					};
					cdlx.innerHTML = cdlxSelect;
				});
			} else if (gclb=='地面工程'){
				var cdlbSelect = '<option value="无" selected="selected">无</option><option value="地砖" >地砖</option><option value="木地板">木地板</option><option value="石材">石材</option><option value="踢脚线">踢脚线</option><option value="门槛石">门槛石</option>';
				cdlb.innerHTML = cdlbSelect;
				cdlb.addEventListener('change',function(){
					var value = cdlb.value;
					if (value =='地砖'){
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="放样">放样</option><option value="细部">细部</option><option value="厨房地柜底部">厨房地柜底部</option><option value="排版">排版</option><option value="表面">表面</option><option value="收口">收口</option>';
					} else if (value == '木地板') {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="细部">细部</option><option value="排版">排版</option><option value="表面">表面</option>';
					} else if (value == '石材') {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="放样">放样</option><option value="细部">细部</option><option value="排版">排版</option><option value="表面">表面</option><option value="收口">收口</option>';
					} else if (value == '踢脚线') {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="安装">安装</option><option value="表面">表面</option><option value="细部">细部</option><option value="打胶">打胶</option>';
					} else {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="铺贴">铺贴</option><option value="标高">标高</option><option value="表面">表面</option>';
					};
					cdlx.innerHTML = cdlxSelect;
				});
			} else if (gclb=='厨房'){
				var cdlbSelect = '<option value="无" selected="selected">无</option><option value="橱柜" >橱柜</option><option value="电器">电器</option><option value="给、排水">给、排水</option>';
				cdlb.innerHTML = cdlbSelect;
				cdlb.addEventListener('change',function(){
					var value = cdlb.value;
					if (value =='橱柜'){
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="背板">背板</option><option value="安装">安装</option><option value="表面">表面</option><option value="台面">台面</option><option value="间距">间距</option><option value="细部">细部</option>';
					} else if (value == '电器') {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="安装">安装</option><option value="表面">表面</option><option value="嵌入式电器">嵌入式电器</option><option value="嵌入式灶台">嵌入式灶台</option><option value="抽油烟机">抽油烟机</option><option value="嵌入式冰箱">嵌入式冰箱</option>';
					} else if (value == '给、排水') {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="给、排水管">给、排水管</option><option value="龙头">龙头</option><option value="洗菜盆">洗菜盆</option>';
					} else {
						
					};
					cdlx.innerHTML = cdlxSelect;
				});
			} else if (gclb=='卫生间、阳露台'){
				var cdlbSelect = '<option value="无" selected="selected">无</option><option value="马桶、浴缸、尿斗" >马桶、浴缸、尿斗</option><option value="浴室镜、柜">浴室镜、柜</option><option value="淋浴屏风">淋浴屏风</option><option value="地漏">地漏</option><option value="龙头、花洒、五金件">龙头、花洒、五金件</option><option value="给、排水">给、排水</option>';
				cdlb.innerHTML = cdlbSelect;
				cdlb.addEventListener('change',function(){
					var value = cdlb.value;
					if (value =='马桶、浴缸、尿斗'){
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="给、排水管">给、排水管</option><option value="马桶">马桶</option><option value="嵌入式浴缸">嵌入式浴缸</option><option value="尿斗">尿斗</option>';
					} else if (value == '浴室镜、柜') {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="背板">背板</option><option value="安装">安装</option><option value="表面">表面</option><option value="收口">收口</option><option value="柜体">柜体</option><option value="五金">五金</option><option value="水件">水件</option>';
					} else if (value == '淋浴屏风') {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="安装">安装</option><option value="表面">表面</option><option value="打胶">打胶</option><option value="五金件">五金件</option>';
					} else if (value == '地漏') {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="标高">标高</option><option value="水封">水封</option><option value="细部">细部</option>';
					} else if (value == '龙头、花洒、五金件') {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="安装">安装</option><option value="细部">细部</option>';
					} else {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="坡度、水封">坡度、水封</option><option value="固定">固定</option><option value="细部">细部</option>';
					};
					cdlx.innerHTML = cdlxSelect;
				});
			} else if (gclb=='电气工程'){
				var cdlbSelect = '<option value="无" selected="selected">无</option><option value="空调">空调</option><option value="电箱、排气扇、开关、插座">电箱、排气扇、开关、插座</option><option value="灯具">灯具</option>';
				cdlb.innerHTML = cdlbSelect;
				cdlb.addEventListener('change',function(){
					var value = cdlb.value;
					if (value == '空调') {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="孔洞">孔洞</option><option value="中央空调">中央空调</option><option value="分立式空调">分立式空调</option>';
					} else if (value == '电箱、排气扇、开关、插座') {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="箱内">箱内</option><option value="配电箱、排气扇">配电箱、排气扇</option><option value="开关、插座">开关、插座</option>';
					} else {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="高度">高度</option><option value="灯具">灯具</option>';
					};
					cdlx.innerHTML = cdlxSelect;
				});
			} else if (gclb=='门窗细部工程'){
				var cdlbSelect = '<option value="无" selected="selected">无</option><option value="木门">木门</option><option value="铝合金、塑钢门、窗">铝合金、塑钢门、窗</option>';
				cdlb.innerHTML = cdlbSelect;
				cdlb.addEventListener('change',function(){
					var value = cdlb.value;
					if (value == '木门') {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="安装">安装</option><option value="门">门</option><option value="五金件">五金件</option>';
					} else if (value == '铝合金、塑钢门、窗') {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="保护膜">保护膜</option><option value="排水孔">排水孔</option><option value="打胶">打胶</option><option value="门扇离地缝隙">门扇离地缝隙</option><option value="安装平正">安装平正</option>';
					} else {
						
					};
					cdlx.innerHTML = cdlxSelect;
				});
			} else if (gclb=='栏杆、楼梯扶手'){
				var cdlbSelect = '<option value="无" selected="selected">无</option><option value="工艺">工艺</option><option value="观感">观感</option>';
				cdlb.innerHTML = cdlbSelect;
				cdlb.addEventListener('change',function(){
					var value = cdlb.value;
					if (value == '工艺') {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="铁艺">铁艺</option>';
					} else if (value == '观感') {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="观感">观感</option>';
					} else {
						
					};
					cdlx.innerHTML = cdlxSelect;
				});
			} else if (gclb=='电梯前室、首层大堂'){
				var cdlbSelect = '<option value="无" selected="selected">无</option><option value="天花">天花</option><option value="墙面">墙面</option><option value="地面">地面</option>';
				cdlb.innerHTML = cdlbSelect;
				cdlb.addEventListener('change',function(){
					var value = cdlb.value;
					if (value == '天花') {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="工艺">工艺</option><option value="观感">观感</option>';
					} else if (value == '墙面') {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="工艺">工艺</option><option value="观感">观感</option>';
					} else {
						var cdlxSelect = '<option value="无" selected="selected">无</option><option value="工艺">工艺</option><option value="观感">观感</option>';
					};
					cdlx.innerHTML = cdlxSelect;
				});	
			} else {
								
			};
			
			cdlx.addEventListener('change',function(){
				var cdlbValue = cdlb.value;
				var cdlxValue = this.value;
//				alert(gclb+'--'+cdlbValue+'--'+cdlxValue);
				mui.ajax(url + 'my_ggpj_cdsm.php', {
					data: {
						gclb: gclb,
						cdlb: cdlbValue,
						cdlx: cdlxValue
					},
					dataType: 'json',
					type: 'post',
					timeout: 10000,
					success: function(data) {
						var length = data.length;
						for(var i=0;i<length-1;i++){
							sm.value = data[i].说明;
						}
						
					},
					error: function(xhr, type, errorThrown) {
						//异常处理；
						//alert('ajax错误'+type); 
						return callback('ajax错误' + type + errorThrown);
					}
				});
			});
			
	});