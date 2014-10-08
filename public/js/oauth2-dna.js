DNA.OAuth2 = {
	init: function() {

		this.addEvent();
		$.cookie("auth_code",'');
		$("#Iframe").hide();
		$("#getCode_btn").attr('disabled',false);
		$("#getToken_btn").attr('disabled',true);
		$(".box_view#help_box").html(DNA.context.help_message);
		$("#setURI").val("");
		$('#select_api option').eq(0).prop('selected', true);

		DNA.OAuth2.makeApiRequestURI(0,0);
		DNA.OAuth2.CLIENT_ID = '1234567890';
		DNA.OAuth2.token = -1;
		DNA.OAuth2.viewDialog(DNA.context.diaglog0_1,'right');
		
		$("#tap_oauthCode").toggleClass("active");
		$('.btn.btn-default.submitKakao').addClass('is-disabled');
	},

	addEvent: function() {
		$('#getCode_btn').click(function() {

			$("#codeRefresh").removeClass("is-disabled");
			$("li").removeClass("active");
			$("#2").toggleClass("active");
			$("#2").removeClass("is-disabled");
			$(".tab-pane").removeClass("active");
			$("#tap_oauthCode").toggleClass("active");
			$(".box_view#box_view_first").css("overflow","hidden");
			DNA.OAuth2.createIframe();
		});
		$('#getToken_btn').click(function() {
			$("#tokenRefresh").removeClass("is-disabled");
			DNA.OAuth2.getToken();
		});
		$('.btn_divide').click(function() {

			if($('.btn_divide').html()=='&lt;'){
				$('.btn_divide').html('&gt;');
				$(".cont_tool").css('width', 50+'%');
		 		$(".cont_help").css('width', 50+'%');
		 		$(".cont_help").show();
			}
			else{
				$('.btn_divide').html("&lt;");
				$(".cont_tool").css('width', 100+'%');
		 		$(".cont_help").css('width', 0+'%');
		 		$(".cont_help").hide();
			}
		});

		//인증 코드 새로고침 버튼
		$('#codeRefresh').click(function() {
			DNA.OAuth2.viewDialog(DNA.context.refresh_code,'left');
			$("li").removeClass("active");
			$("#2").toggleClass("active");
			$("#2").removeClass("is-disabled");
			$(".tab-pane").removeClass("active");
			$("#tap_oauthCode").toggleClass("active");
			$(".box_view#box_view_first").css("overflow","hidden");
			DNA.OAuth2.createIframe();
		});

		//Access Token 새로고침 버튼
		$('#tokenRefresh').click(function() {
			DNA.OAuth2.viewDialog(DNA.context.refresh_token,'left');
			DNA.OAuth2.getRefreshToken();
		});
		
		$('.btn.btn-default.btn_run').click(function() {
			if(DNA.OAuth2.token==null){
				DNA.OAuth2.viewDialog(DNA.context.error_1,'right');
				return;
			}
			if($("#select_api").find(":selected").parent().index()==0){
				DNA.OAuth2.viewDialog(DNA.context.error_2,'right');
				return;
			}
			$("#3").removeClass("is-disabled");
			$("li").removeClass("active");
			$("#3").toggleClass("active");
			$(".tab-pane").removeClass("active");
			$("#tap_accessToken").toggleClass("active");
			$(".btn.btn-default.btn_close").hide();

			DNA.OAuth2.sendApiRequest($("#setURI").val());
		});

		$("#select_api").change(function () {
			$("#runAPI").attr('disabled',false);
			var $selectedGroupIndex = $("#select_api").find(":selected").parent().index();
			var $selectedIndex = $("#select_api").find(":selected").index();
		    DNA.OAuth2.makeApiRequestURI($selectedGroupIndex,$selectedIndex);
		    DNA.OAuth2.makeHelpInputParameter($selectedGroupIndex);
		});
		$('#myTab a').click(function (e) { e.preventDefault(); $(this).tab('show');});
		
		//대화창 메뉴 버튼
		$('#kakaoBtn').click(function () {
			$("#kakaoMenu").toggle("blind", 300);
		});

		$('#deleteDialog').click(function () {
			$(".talk_tool").fadeOut(0,function(){$(this).remove();});
			$("#kakaoMenu").hide("blind", 300);
		});

		$('.cont_tool, .inner_cont').click(function () {
			$("#kakaoMenu").hide("blind", 300);
		});
		
		$('.btn.btn-default.submitKakao').click(function () {
			if($(".kakaoInput").val()!='')
				DNA.OAuth2.viewDialog($(".kakaoInput").val(),"left");
			$(".kakaoInput").val('');
		});
		
		$('#PG_Refresh').click(function () {
			location.reload();
		});
		
		$('#showHelp').click(function () {
			$('body').block(
					  {
					    message: "<img id='imgHelp' src='/assets/assets_oauth2/images/help.png' style='cursor:pointer'>",//DNA.context.help_message,
						cursorReset: 'click',
						fadeIn: 0,
						fadeOut: 0,
						overlayCSS: { },
		    			css: { 
						        padding:        0, 
						        margin:         0, 
						        width:          '100%',
						        height:         '100%', 
						        border:         '0', 
						        opacity:         0.9
		   					} });

			$('#imgHelp').click(function () {
				$('body').unblock();
			});
		});

		$('.kakaoInput').bind('keydown', function(e) {
			var message = $(".kakaoInput").val();
			var code = e.keyCode || e.which;
			if(message != '')
				$('.btn.btn-default.submitKakao').removeClass('is-disabled');
			//TODO
			if(code == 13) {

			 		if(message!=''&&message!='/clean')
						DNA.OAuth2.viewDialog(message,"left");

					if(message=='/clean')
						$('#deleteDialog').click();
					else if(message=='/help')
						$('#showHelp').click();
					else if(message=='/refresh')
						$('#PG_Refresh').click();
					else if(message=='/help-m')
						DNA.OAuth2.viewDialog(DNA.context.help_message,'right');
					else if(message=='/bye')
						window.location = "http://daum.net";

				$(".kakaoInput").val('');
			}
			else if(code == 8){
				if(message == '')
					$('.btn.btn-default.submitKakao').addClass('is-disabled');
			}
		});
	},
	createIframe : function(){
		if($("#ifrmChild").length) $("#ifrmChild").remove();
		$(".box_Iframe").html('');
		$(".box_Iframe").append("<iframe id='ifrmChild' frameborder='0' style='width:100%; height:100%;' src='https://apis.daum.net/oauth2/authorize?client_id="+DNA.OAuth2.CLIENT_ID+"&redirect_uri=http://"+window.location.host+"/tools/oauth2/getAuthCode&response_type=code' onload='DNA.OAuth2.getCode(this);'></iframe>");
		$("#Iframe").show();
		$("#fullTab").hide();
		
		DNA.OAuth2.viewDialog(DNA.context.diaglog2_0,'right');	
	},
	divMove : function(e){
		  var position = $(".bar_divide").position();
		  var toolWith = ((e.pageX-50)/$(".wrap_tools").width())*100;
		  var helpWith = 100-toolWith;

		  if(toolWith < 30){
		  	toolWith = 30;
		  	helpWith = 70;
		  } 
		  
		  if(helpWith < 32){
		  	toolWith = 68;
		  	helpWith = 32;
		  }
		 $(".cont_tool").css('width', toolWith+'%');
		 $(".cont_help").css('width', helpWith+'%');
	},
	addMoveBarEvent : function(){
		$(".bar_divide").css('cursor','move');
		$(".wrap_tools").mouseup(function() {
  			$(".wrap_tools").unbind('mousemove', DNA.OAuth2.divMove);
		});

    	$(".bar_divide").mousedown(function() {
  			$(".wrap_tools").bind('mousemove', DNA.OAuth2.divMove);
		});
    },
    viewDialog : function(message,direction){
		$(".talk_tool:last").css('padding-bottom',20);
    	if(!direction.localeCompare('right'))
    	{
	    	$(".cont_help .inner_cont").append($("<div class='talk_tool clearfix'>"
	    							  +"<div class='wrap_img'>"
	    								+"<img width='42' height='50' alt='' src='images/img_men.png'>"
	    									+"</div><div class='wrap_talk'><strong class='tit_talk'>API맨</strong>"
	    										+"<div class='bubble_tool'>"
	    											+message
	    									+"<span class='ico_tools ico_bubble'>"
	    									+"</span></div></div></div>").hide().fadeIn(700));
    	}
    	else if(!direction.localeCompare('left'))
    	{
	    	$(".cont_help .inner_cont").append($("<div class='talk_tool talk_me clearfix'>"
									+"<div class='wrap_talk'>"
										+"<div class='bubble_tool'>"
											+message
											+"<span class='ico_tools ico_bubble'></span>"
										+"</div>"
									+"</div>"
								+"</div>").hide().fadeIn(700));
    	}
    	console.log($(".inner_cont.sub")[0].scrollHeight);
    	$(".talk_tool:last").css('padding-bottom',200);
    	$(".inner_cont.sub").scrollTop($(".inner_cont.sub").prop('scrollHeight'));//스크롤 항상 하위에 있도록 한다
    },
    makeApiList : function(){
    	var newOptions = [
    							{
									"알림 정보" : "0",
								  	"게시글 리스트 보기" : "1",
									"게시판 리스트 보기" : "2",
									"자주가는 카페 목록" : "3",
									"최신글 보기" : "4"
				 			     },

				 			     {
									"글 목록" : "0",
								  	"새 글 쓰기" : "1",
									"글 내용 가져오기(글 한개)" : "2",
									"파일 업로드" : "3",
									"카테고리 목록 가져오기" : "4",
									"댓글 목록 가져오기" : "5",
									"댓글 작성하기" : "6",
									"블로그 정보 가져오기" : "7",
									"나에 대한 반응 목록" : "8"
				 			     },

				 			     {
				    				"카테고리 생성":"0",
				    				"카테고리 조회":"1",
				    				"카테고리 수정":"2",
				    				"일정 조회":"3"

				    			 },

				    			 {
				    				"프로필 정보":"0"
				    			 }
    	];
		var $select = $("#select_api optgroup");
		for(var i=0;i<$select.length;i++)
		{
			$.each(newOptions[i], function(key, value) {
		 		$select[i].appendChild(new Option(key,value));
			});	
		}
    },
    makeApiRequestURI : function(first_index,second_index){
    	var API_Array = new Array(
    							 new Array("URI 완성하기")
    							 //카페
    							 ,new Array("https://apis.daum.net/cafe/v1/alimis.json"//알림 정보
    							 			,"https://apis.daum.net/cafe/v1/articles/{cafeCode}/{boardId}.json"//게시글 리스트 보기
    							 			,"https://apis.daum.net/cafe/v1/boards/{cafeCode}.json"//게시판 리스트 보기
    							 			,"https://apis.daum.net/cafe/v1/favorite_cafes.json"//자주가는 카페 목록
    							 			,"https://apis.daum.net/cafe/v1/recent_articles/{cafeCode}.json"//최신글 보기
    							 			,"https://apis.daum.net/cafe/v1/write_article/{cafeCode}/_memo.jsonxml"//게시글 쓰기 - 한줄 메모장
    							 			)
    							 //블로그
    							 ,new Array("https://apis.daum.net/blog/v1/{blogName}/list.json"//글 목록
    							 			,"https://apis.daum.net/blog/v1/{blogName}/write.json?blogName={blogName}&title={title}&content={content}"//새 글 쓰기
    							 			,"https://apis.daum.net/blog/v1/{blogName}/modify.json?blogName={blogName}&postId={postId}&title={title}&content={content}"//글 수정하기
    							 			,"https://apis.daum.net/blog/v1/{blogName}/read.json?blogName={blogName}&postId={postId}"//글 내용 가져오기(글 한개)
    							 			,"https://apis.daum.net/blog/v1/{blogName}/categories.json?blogName={blogName}"//카테고리 목록 가져오기
    							 			,"https://apis.daum.net/blog/v1/{blogName}/list.json?blogName={blogName}&postId={postId}"//댓글 목록 가져오기
    							 			,"https://apis.daum.net/blog/v1/{blogName}/write.json?blogName={blogName}&postId={postId}&secret={Y/N}"//댓글 작성하기
    							 			,"https://apis.daum.net/blog/v1/{blogName}/info.json"//블로그 정보 가져오기
    							 			,"https://apis.daum.net/blog/v1/{blogName}/activities.json?blogName={blogName}"//나에 대한 반응 목록
    							 			)
								//캘린더
								,new Array("https://apis.daum.net/calendar/v1/category/create.json?name={name}"
										   ,"https://apis.daum.net/calendar/v1/categories.json"
										   ,"https://apis.daum.net/calendar/v1/category/{category_id}.json"
										   ,"https://apis.daum.net/calendar/v1/{category_id}/events.json"
										   )
								//로그인
								,new Array("https://apis.daum.net/user/v1/show.json" )

    							);
		$("#setURI").val(API_Array[first_index][second_index]);
		if(API_Array[first_index][second_index]=="URI 완성하기")
			$("#setURI").attr('disabled',true);
		else
			$("#setURI").attr('disabled',false);
    },
    makeHelpInputParameter : function(selectedGroupIndex){
    	var $setURI = $("#setURI");
		var subString = "";
		var first, second;
    	for(var i=0; i<$setURI.val().length; i++){	
    		first = $setURI.val().indexOf('{',i);
    		second = $setURI.val().indexOf('}',i)+1;
			if(second){
				//$setURI.selectRange(first,second);//입력 변수 블럭 지정
				subString += $setURI.val().substring(first,second);
				i = second;
			}
			else
				break;
    	}
    	if(subString!="")
    		DNA.OAuth2.viewDialog(DNA.context["diaglog1_"+selectedGroupIndex]+"자 이제 "+subString+DNA.context.diaglog4_1,'right');
    	else
    		DNA.OAuth2.viewDialog(DNA.context["diaglog1_"+selectedGroupIndex]+DNA.context.diaglog4_2,'right');
    },
    sendApiRequest : function(URI){
		if(URI!=''){
			if(URI.indexOf("?")==-1)
				URI = URI+'?access_token=';//+DNA.OAuth2.token;
			else
				URI = URI+'&access_token=';//+DNA.OAuth2.token;
			
			$.ajax({
				type:"POST",
		        url:'http://'+window.location.host+'/tools/oauth2/executeAPI',
		        data: {'URI' : URI, 'userAgent' : navigator.userAgent},
		       	complete: function (data){

		       		var result = JSON.parse(data.responseText);
	          		var response = result.response;
	          		var request = response.request;
	          		
	          		$(".box_view#apiExecute_first").html(
	          			"<pre style='width:100%;height:100%'>"
	          			+request.method
	          			+" "+request.uri.path
	          			+"</br>User-Agent: "+request.headers.userAgent
	          			+"</br>Host: "+request.uri.host
	          			+"</br>Accept: */*"
	          			+"</pre>"
	          			);
	          		if(response.statusCode==200){
		          		$(".box_view#apiExecute_second").html(
			                  				"<pre style='width:100%;height:100%'>"
			                  				+"HTTP/1.1 200 OK"
			                  				+"</br>Server: "+response.headers.server
			                  				+"</br>Date: "+response.headers.date
			                  				+"</br>Content-type: "+response.headers["content-type"]
			                  				+"</br>Transfer-encoding: "+response.headers["transfer-encoding"]
			                  				+"</br>Connection: "+response.headers.connection
			                  				+"</br>Vary: "+response.headers["vary"] 
			                  				+"</br>X-request-id: "+response.headers["x-request-id"]
			                  				+"</br>X-ratelimit-perday-current: "+response.headers["x-ratelimit-perday-current"]
			                  				+"</br>X-ratelimit-perday-limit: "+response.headers["x-ratelimit-perday-limit"]
			                  				+"</br>X-ratelimit-permin-current: "+response.headers["x-ratelimit-permin-current"]        				
			                  				+"</br>X-ratelimit-permin-limit: "+response.headers["x-ratelimit-permin-limit"]        				
			                  				+"</br></br>"
			                  				+response.body
			                  				+"</pre>"
		          			);
					}
					else{
						$(".box_view#apiExecute_second").html(
							"<pre style='width:100%;height:100%'>"
							+response.body
							+"</pre>"
		          			);
					}
	          		DNA.OAuth2.viewDialog(DNA.context.diaglog5_1,'right');
	          		DNA.OAuth2.viewDialog(response.body,'left');
	       		},
	       		error : function(data){
	       			//alert(JSON.parse(data));
	       		}
	   		});
		}
    },
    makeRequestHeader : function(code){
    	var requestBody = "code="+code
    					 +"&redirect_uri=http://"+window.location.host+"/tools/oauth2/oauth_Code"
    					 +"&client_id=343453"
    					 +"&client_secret=************&grant_type=authorization_code";

    	var requestHeader = "POST /oauth2/token HTTP/1.1</br>"
    					   +"Host: apis.daum.net</br>"
    					   +"Accept: */*</br>"
    					   +"Content-Length:"+requestBody.length+"</br>"
    					   +"Content-Type: application/x-www-form-URIencoded</br></br>";

    	return requestHeader+requestBody;
    },
	//iframe에서 auth_code 가져와 부모 프레임에 표시, 크로스 도메인 문제로 에러 처리, redirection 후 도메인이 같아져 문제 없음
	getCode : function(iframe){
        try
        {	
            var code = $(iframe).contents().find('#code1').html();
            $("#fullTab").show();
            $("#Iframe").hide();
            $(".box_view#accessToken_first").css("overflow","hidden");
            $(".box_view#accessToken_first").html("<pre style='width:100%;height:100%'>"+DNA.OAuth2.makeRequestHeader(code)+"</pre>");
            $("#getToken_btn").attr('disabled',false);

            if(!code){
                DNA.OAuth2.async(getCode);
            }
            else
            {
            	$("#ifrmChild").remove();
                $("#getCode_btn").attr('disabled',true);
                $("#getCode_btn").html("Authorization Code : "+code);
                $("#getCode_btn").val(code);
                $.cookie("auth_code", code, {expires: 1});//만료기간 1일

                DNA.OAuth2.viewDialog(DNA.help.insertIMG("https://air21.daum.net/images/sticker/high/sticker_1360.png")+
                '"'+code+'"'+DNA.context.diaglog2_1,'left');//메서지가 바로 나오는 문제
                
				//$(".box_view#accessToken_first pre").animate({borderWidth:4,borderColor:"#0e7796"}, 'fast');//테두리 효과 주기
				//$(".box_view#accessToken_second pre").css({borderWidth:1,borderColor:"#f5f5f5"});

				setTimeout(function(){DNA.OAuth2.viewDialog(DNA.context.diaglog2_2,'right');},700);

                //setTimeout(function(){$(".box_view#accessToken_first pre").effect("highlight");},900);
                //setTimeout(function(){$(".box_view#accessToken_first pre").effect("highlight");},100);
            }
        }
        catch(err)
        {
           //alert(err.message);
        }
    },
    getToken : function(){
    	if(!$.cookie("auth_code")) {
    		DNA.OAuth2.viewDialog(DNA.context.error_3,'right');
    		return;
    	}
    	$.ajax({
	                url:'http://'+window.location.host+'/tools/oauth2/getAccessToken',
	                success:function(result)
	                {	
	                	var JSON_result = JSON.parse(result);
                  		var response = JSON_result.response;
                  		var token = JSON.parse(response.body);
                  		
                  		if(response.statusCode==400)
                  				DNA.OAuth2.viewDialog(DNA.context.error_3,'right');
                  		else{
                  				$('#getToken_btn').html('Access Token : '+token.access_token.substring(0, 20)+"...");
                  				$("#select_api").removeClass('is-disabled');
                  				//TODO
                  				$("#getToken_btn").attr('disabled',true);
	                  			DNA.OAuth2.token = token.access_token;
	                  			DNA.OAuth2.refresh_token = token.refresh_token;

	                  			if(token.error_description!='undefined')
	                  					DNA.OAuth2.viewDialog(DNA.help.insertIMG("https://air21.daum.net/images/sticker/high/sticker_1370.png")
	                  						+'"'+token.access_token.substring(0, 20)+'..." 라고 '+DNA.context.diaglog3_1,'right');
	                  			else
	                  				DNA.OAuth2.viewDialog('오류가 났네요 - '+token.error_description,'right');
	                  			if(response.statusCode=='200'){
		                  			$(".box_view#accessToken_second").html(
		                  				"<pre style='width:100%;height:100%'>"
		                  				+"HTTP/1.1 200 OK"
		                  				+"</br>Server: "+response.headers.server
		                  				+"</br>Date: "+response.headers.date
		                  				+"</br>Content-type: "+response.headers["content-type"]
		                  				+"</br>Content-length: "+response.headers["content-length"]
		                  				+"</br>Connection: "+response.headers.connection
		                  				+"</br>X-powered-by: "+response.headers["x-powered-by"]          				
		                  				+"</br></br>"
		                  				+"{"
		                  				+'</br>&nbsp"access_token" : '+token.access_token
		                  				+'</br>&nbsp"expires_in" : '+token.expires_in
		                  				+'</br>&nbsp"token_type" : '+token.token_type
		                  				+'</br>&nbsp"scopes" : '+JSON.stringify(token.scopes)
		                  				+'</br>&nbsp"refresh_token" : '+token.refresh_token
		                  				+"</br>}"
		                  				+"</pre>");
	                  			}
	                  			else{
	                  				$(".box_view#accessToken_second").html(
		                  				"<pre style='width:100%;height:100%'>"
		                  				+"HTTP/1.1 "+response.statusCode+" error"
		                  				+response.body
		                  				+"</pre>");
	                  			}
	                  			//Effect
	                  			//$(".box_view#accessToken_first pre").animate({borderWidth:1,borderColor:"#f5f5f5"}, 'fast');
    							//$(".box_view#accessToken_second pre").animate({borderWidth:4,borderColor:"#0e7796"}, 'fast');
                  		}
                    },
                    error : function()
                    {
                    	alert("error");
                    }
                });
    },
    getRefreshToken : function(){
		if(!$.cookie("auth_code")) {
			DNA.OAuth2.viewDialog(DNA.context.error_3,'right');
			return;
		}
		$.ajax({
	                url:'http://'+window.location.host+'/tools/oauth2/getRefreshToken',
	                type:'POST',
	                data:{'refresh_token':DNA.OAuth2.refresh_token},
	                success:function(result)
	                {	
	                	var JSON_result = JSON.parse(result);
                  		var response = JSON_result.response;
                  		var token = JSON.parse(response.body);
                  		
                  		if(response.statusCode==400)
                  				DNA.OAuth2.viewDialog(DNA.context.error_3,'right');
                  		else{
                  				$('#getToken_btn').html('Access Token : '+token.access_token.substring(0, 20)+"...");
                  				$("#select_api").removeClass('is-disabled');
                  				//TODO
                  				$("#getToken_btn").attr('disabled',true);
	                  			DNA.OAuth2.token = token.access_token;
	                  			DNA.OAuth2.refresh_token = token.refresh_token;

	                  			if(token.error_description!='undefined')
	                  			{
	                  				if($("#select_api").find(":selected").parent().index()==0)
	                  					DNA.OAuth2.viewDialog(DNA.context.diaglog3_1,'right');
	                  				else
	                  					DNA.OAuth2.viewDialog(DNA.context.diaglog3_2,'right');
	                  			}
	                  			else
	                  				DNA.OAuth2.viewDialog('오류가 났네요 - '+token.error_description,'right');
	                  			if(response.statusCode=='200'){
		                  			$(".box_view#accessToken_second").html(
		                  				"<pre style='width:100%;height:100%'>"
		                  				+"HTTP/1.1 200 OK"
		                  				+"</br>Server: "+response.headers.server
		                  				+"</br>Date: "+response.headers.date
		                  				+"</br>Content-type: "+response.headers["content-type"]
		                  				+"</br>Content-length: "+response.headers["content-length"]
		                  				+"</br>Connection: "+response.headers.connection
		                  				+"</br>X-powered-by: "+response.headers["x-powered-by"]          				
		                  				+"</br></br>"
		                  				+"{"
		                  				+'</br>&nbsp"access_token" : '+token.access_token
		                  				+'</br>&nbsp"expires_in" : '+token.expires_in
		                  				+'</br>&nbsp"token_type" : '+token.token_type
		                  				+'</br>&nbsp"scopes" : '+JSON.stringify(token.scopes)
		                  				+"</br>}"
		                  				+"</pre>");
	                  			}
	                  			else{
	                  				$(".box_view#accessToken_second").html(
		                  				"<pre style='width:100%;height:100%'>"
		                  				+response.headers
		                  				+"</pre>");
	                  			}
	                  			//Effect
	                  			//$(".box_view#accessToken_first pre").animate({borderWidth:1,borderColor:"#f5f5f5"}, 'fast');
    							//$(".box_view#accessToken_second pre").animate({borderWidth:4,borderColor:"#0e7796"}, 'fast');
                  		}
                    },
	                error : function()
	                {
	                	alert("error");
	                }
	            });
	},
    //비동기적으로 인증코드를 가져오는 함수를 1초마다 실행시킨다.
    async : function(func){
    	setTimeout(func(),1000);
    }
};
$(document).ready(function() {
	DNA.OAuth2.init();
	DNA.OAuth2.addMoveBarEvent();
});

