DNA.help = {
	insertIMG : function(url){
		return "<div style='text-align: left;'><img class='mypeopleStickerImg' src="+url+"></div>";
	}
};
DNA.context = {


	help_message : 	 "<div class='ff_kopub'><font size='5'><b>1. Open API</b></font>"
					+"</br>Oauth2.0를 통해 인증 받아 이용할 Open API를 선택합니다."
					+"</br><h3><b>2. Authorization Code</b></h3>"
					+"선택된 API가 사용자의 자원을 사용합니다."
					+"</br>사용자는 다음 로그 인을 통하여 사용 권한을 부여합니다."
					+"</br>그리고 Access Token으로 교환 되어질 Authorization Code를 받습니다."
					+"</br><h3><b>3. Access Token 인증</b></h3>"
					+"Authorization Code를 Access token으로 교환합니다."
					+"</br>이 단계에서 요청과 응답의 메시지를 보여줍니다."
					+"</br><h3><b>4. Open API 기능</b></h3>"
					+"Access Token을 실행할 API에 첨부하여 서버에 요청합니다."
					+"</br>서버는 인증된 Open API를 실행시킵니다."
					+"</br>이 단계에서 요청과 응답의 메시지를 보여줍니다.<div>",

	error_1 : 		DNA.help.insertIMG("https://air21.daum.net/images/sticker/high/sticker_1375.png")+"엑세스 토큰을 발급받고 와야해",
	
	error_2 : 		DNA.help.insertIMG("https://air21.daum.net/images/sticker/high/sticker_1383.png")+"사용할 Open API를 선택하고 와야해",

	error_3 : 		DNA.help.insertIMG("https://air21.daum.net/images/sticker/high/sticker_1378.png")+"Authorization Code를 발급 받아야해",

	refresh_code :  "새로고침 버튼을 눌렷어",

	refresh_token : "Access Token 재발급 버튼을 눌렷어",
	
	diaglog0_1 : 	 DNA.help.insertIMG("https://air21.daum.net/images/sticker/high/sticker_1388.png")
					+"안녕. OAuth 2.0을 쉽고 재밌게 가르쳐줄 API맨이야"
					+"</br>시작하기전에 <a href='http://dna.daum.net/apis/oauth2' target='_blank'>OAuth.0 살펴보기</a>를 읽어보는 것을 추천해!"
					+"</br>준비가 되었다면 <mark>Authorization Code 요청하기</mark> 버튼을 눌러봐",

	diaglog1_1 : 	 "카페 API를 선택했네!"
					+"</br>카페 API에 대하서 더 알고 싶으면  <a href='http://dna.daum.net/apis/cafe' target='_blank'>여기</a>를 보고"
					+"</br>예제로 {cafeCode}는 <mark>'daumdna'</mark>, {boardID}는 <mark>'KErw'</mark>를 쓰면되~</br></br>",

	diaglog1_2 : 	 "블로그 API를 선택했네!"
					+"</br>블로그 API에 대하서 더 알고 싶으면  <a href='http://dna.daum.net/apis/blog' target='_blank'>여기</a>를 보고</br></br>",

	diaglog1_3 : 	 "캘린더 API를 선택했네!"
					+"</br>캘린더 API에 대하서 더 알고 싶으면  <a href='http://dna.daum.net/apis/calendar' target='_blank'>여기</a>를 보고</br></br>",

	diaglog1_4 : 	 "프로필 API를 선택했네!"
					+"</br>프로필 API에 대하서 더 알고 싶으면  <a href='http://dna.daum.net/apis/profile' target='_blank'>여기</a>를 보고</br></br>",
					
	diaglog2_0 : 	 "Authorization Code 얻기 버튼을 눌렸네!"
					+"</br>지금 보이는 화면은 "
					+"<a href='https://apis.daum.net/oauth2/authorize?client_id=1234567890&redirect_uri=http://"+window.location.host+"/tools/oauth2/oauth_Code&response_type=code' target='_blank'>Daum 계정 사용 동의</a>"
					+"를 <mark>Iframe</mark>으로 가져온 화면이야"
					+"</br><mark>동의 버튼</mark>을 누르게 되면 나의 Daum 정보를 사용할 수 있드록 권한을 줄 수 있어",

	diaglog2_1 : 	 " 라고 Authorization Code가 도착했어",
	
	diaglog2_2 : 	 "옆의 요청 해드를 인증 서버에게 보낼꺼야</br>이제 <mark>Access Token 얻기</mark> 버튼을 눌러봐!",

	diaglog3_1 : 	 "Access Token이 도착했어!</br>이제 <mark>Open API</mark>를 선택해서 사용해볼까?",

	diaglog3_2 : 	 "Refresh Token을 사용해서 Access Token를 재발급 받았네!</br>다시 한번 <mark>Open API</mark>를 선택해서 사용해볼까?",

	diaglog4_1 :  	 "를 입력해서 Open API를 사용해봐!",

	diaglog4_2 :  	 "어!? 이 Open API는 변수 입력 없이 사용할 수 있어 실행해봐!",

	diaglog5_1 : 	 DNA.help.insertIMG("https://air21.daum.net/images/sticker/high/sticker_1361.png")+"Open API를 실행했어~ 결과값을 보여줄께!"
};