//全ページに設置するタグ
//同ドメインの遷移以外でクエリパラメータをローカルストレージに保存
window.onload = function () {
  var referrer = document.referrer;
  var currentUrl = window.location.href;

  var referrerDomain = referrer.split("/")[2];
  var currentDomain = currentUrl.split("/")[2];

//   console.log(referrerDomain);
//   console.log(currentDomain);

  if (currentDomain !== referrerDomain) {
    // 現在のURLからクエリパラメータを取得
    var params = {};
    var queryString = window.location.search.substring(1);
    var queryArray = queryString.split("&");

    for (var i = 0; i < queryArray.length; i++) {
      var pair = queryArray[i].split("=");
      if (pair[0] != "") {
              params[pair[0]] = decodeURIComponent(pair[1]);
      }
    }
    
    // ローカルストレージに個々のパラメータを保存
    for (var key in params) {
      ivry_key = "ivry_" + key //パラメータの接頭辞にivryを指定
      localStorage.setItem(ivry_key, params[key]);
    }
  }
};

//ここからバナーを出したい箇所に設置
//変数定義
var ivry_api_url = "https://ott.stg.ivry.jp/token?"; //TODO: 本番環境のURLに変更
var partner_client_id = "p406116219"; //to IVRy様: プロパティIDの設定をお願いします。
var ga_property_id = "G-QY86BV694Z";


//cssとhtmlを文字列にして新たなバナー用divを作成
(function () {
  var cssString = ".callBunner_Wrapper {position: fixed; right: 30px; bottom: 50px; text-align: left; font-size: 12px; line-height: 1.66667; font-family: inherit;}.callBunner_Wrapper * {box-sizing: border-box; font-size: 100%; line-height: inherit;}.btn-close {display: none; width: 24px; height: 24px; border: none; position: absolute; z-index: 1; border-radius: 4px; transition: .25s; right: 0; bottom: 100%; padding: 6px 6px; background: #04b06c; color: #fff; font-size: 10px; line-height: 1; opacity: 0;}.btn-close.active {display: block;}.btn-close::before, .btn-close::after {content: ''; position: absolute; top: 50%; left: 50%; width: 1.5px; height: 10px; background: #fff;}.btn-close::before {transform: translate(-50%, -50%) rotate(45deg);}.btn-close::after {transform: translate(-50%, -50%) rotate(-45deg);}.callBunner_Wrapper:hover .btn-close {opacity: 1;}.callBunner_Wrapper .btn-close:hover, .callBunner_Wrapper .btn-close:focus {opacity: .5; transform: rotate(90deg);}.telNumber {font-size: 130%;}.reception-Skin {width: 85.33vw; max-width: 320px; border-radius: 4px; background: #FFF; box-shadow: 0px 32px 64px rgba(0, 16, 14, 0.31), 0px 0px 0px rgba(0, 16, 14, 0.03);}.reception-Skin {display: none;}.reception-Skin.active {display: block;}.reception-Answer_Container {position: relative; box-sizing: border-box; background: rgba(0, 16, 14, 0.03);}.reception-Answer_Container:after {content: ''; display: none; z-index: 2; position: absolute; right: 0; bottom: 0; left: 0; width: 100%; height: 60px; background: linear-gradient(0, rgba(255, 255, 255, 0.0001) 0.02%, #FFFFFF 0.03%, #FFFFFF 42%, rgba(255, 255, 255, 0) 99.97%);}.:global(.is-scroll).reception-Answer_Container:after {display: block;}.reception-Answer_Item {position: relative; margin: 24px 0;}.js-answer-item {height: 242px;}.reception-Answer_TextOuter {position: relative; min-height: 100%;}.reception-Answer_TextOuter:after {display: block; position: absolute; top: 0; right: 0; bottom: 0; left: 0;}.reception-Answer {position: relative; z-index: 1; min-height: 100%; padding: 0 24px 72px; font-size: 12px; line-height: 1.67;}.reception-Answer a {text-decoration: underline;}.reception-Answer a:hover {text-decoration: none;}.reception-Answer h1 {font-size: 1111px;}.reception-Answer_Notice {position: absolute; bottom: 0; left: 0; padding: 0 24px; font-size: 10px; font-weight: bold;}.reception-Answer_Call-Notice {bottom: 0; left: 0; padding: 10px 24px; font-size: 10px; margin-bottom: 10px;}.reception-Answer_Call {padding: 0 24px;}.reception-Answer_Call p {font-size: 12px; padding: 10px 0;}.reception-Answer_Call .telNumber {font-size: 80%;}.reception-Answer_Call .telNumber>a {font-size: 150%; text-decoration: underline;}.reception-Answer_Call .idNumber {display: block; border-radius: 4px; border: solid 1px transparent; padding: 10px 0; width: 100%; background: #f0f1f1; text-align: center; font-size: 80%; margin-top: 10px;}.reception-Answer_Call .idNumber em {font-style: normal; font-weight: inherit; font-size: 160%; font-family: 'Noto Sans', sans-serif; letter-spacing: .1em;}.js-answer-item-call {margin: 0; max-height: 100%;}.callRequest_Banner .reception-Answer_Call {display: flex; align-items: center;}.callRequest_Banner .callRequest_Button {height: 50px; width: 120px; padding: 10px 10px; background-color: #04b06c; color: white; border-radius: 4px; border: none; text-align: center; cursor: pointer; font-size: 10px; line-height: 1.2;}.callRequest_Banner .callRequest_Button:active {box-shadow: none; transform: scale(0.98);}";


  var htmlString =
    '<div class="callBunner_Wrapper">' +
    '<button type="button" class="btn btn-close active" onclick=clickBannerCloseButton()>' +
    "</button>" +
    '<div class="reception-Skin callRequest_Banner active">' +
    '<div class="reception-Answer_Container">' +
    '<div ref="answer-item" class="reception-Answer_Item js-answer-item-call">' +
    '<div class="reception-Answer_TextOuter js-answer-text-outer">' +
    '<div class="reception-Answer_Call">' +
    "<p>お電話でのお問い合わせをご希望の方はお客様番号を取得してください</p>" +
    '<button class="callRequest_Button" onclick=clickCallRequest()>お客様<br>番号取得</button>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div class="reception-Skin callResponse_Banner">' +
    '<div class="reception-Answer_Container">' +
    '<div ref="answer-item" class="reception-Answer_Item js-answer-item-call">' +
    '<div class="reception-Answer_TextOuter js-answer-text-outer">' +
    '<div class="reception-Answer_Call reception-Answer_Call_Response">' +
    "<p>下記に表示された4桁のお客様番号を音声ガイドに従いご入力ください。</p>" +
    '<strong class="telNumber">お問い合わせ窓口：<a href="tel:050-3198-9423">050-3198-9423</a></strong>' +
    '<strong class="idNumber">お客様番号<br><em class="idNumber_Value"></em></strong>' +
    "</div>" +
    '<p class="reception-Answer_Call-Notice">' +
    '<i class="fa fa-exclamation-triangle" aria-label="注意:"></i>' +
    "お客様番号の有効期限は5分になります。5分経過している場合は再度こちらの画面を開き直してください。<br>" +
    "また、過去電話でお問い合わせ頂いている場合、お客様番号の入力は不要となります。" +
    "</p>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "<style>" +
    cssString +
    "</style>";

  var o = document.createElement("div");
  o.insertAdjacentHTML("afterbegin", htmlString);
  document.body.appendChild(o);
})();

//GAの値を取り出す
var client_id;
var session_id;
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}

gtag("get", ga_property_id, "session_id", function (field) {
  session_id = field;
});
gtag("get", ga_property_id, "client_id", function (field) {
  client_id = field;
});
//ここまで（GAの値を取り出す）

function clickBannerCloseButton() {
    var closeDev = document.querySelector(".btn-close");
    closeDev.classList.remove("active");
    var requestDev = document.querySelector(".callRequest_Banner");
    requestDev.classList.remove("active");
    var responseDev = document.querySelector(".callResponse_Banner");
    responseDev.classList.remove("active");
}

function clickCallRequest() {
  //500エラーの場合3回リトライをする
  fetchToken(3);
}

function changeBanner() {
  var requestDev = document.querySelector(".callRequest_Banner");
  requestDev.classList.remove("active");
  var responseDev = document.querySelector(".callResponse_Banner");
  responseDev.classList.add("active");
}

//APIリクエスト処理
//retrie = 500エラーの場合のリトライ数
function fetchToken(retries) {
  var partner_visitor_id = session_id;
  var partner_user_id = client_id;
  var params = {
    partner_client_id: partner_client_id,
    partner_visitor_id: partner_visitor_id,
    partner_user_id: partner_user_id,
  };
  // ローカルストレージの全てのキーと値をparamsオブジェクトに格納
  var strage_params = {};
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    strage_params[key] = value;
  }
  params = Object.assign({}, params, strage_params);

  // 現在のページのURLを取得してリクエストに追加
  var current_url = window.location.href;
  var current_url = current_url.split("?")[0];
  console.log(current_url);
  var current_url_params = {
    'current_url': current_url
  }
  params = Object.assign({}, params, current_url_params);  
  // console.log(params);
  var query = new URLSearchParams(params);

  fetch(ivry_api_url + query)
    .then(function (response) {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else if (response.status === 500) {
        // 500エラーの場合は再試行
        if (retries > 0) {
          // console.log("リトライ");
          return fetchToken(retries - 1);
        } else {
          throw new Error("Max retries reached for 500 error");
        }
      } else {
        // その他のエラーコードの場合はエラーを投げる
        throw new Error("Something went wrong: " + response.status);
      }
    })
    .then(function (json) {
      if (json) {
        // console.log(json);
        var telNumber =
          json.ivry_phone_number
            .replace("+81", "0")
            .replace(/^(0[56789]0)([0-9]{4})([0-9]{4})$/, "$1-$2-$3") ||
          "電話番号の取得取得に失敗しました。";
        var idNumber = json.token || "0000";
        var telNumberDev = document.querySelector(".telNumber");
        telNumberDev.innerHTML =
          'お問い合わせ窓口：<a href="tel:' +
          telNumber +
          '">' +
          telNumber +
          "</a>";
        var idNumberDev = document.querySelector(".idNumber_Value");
        idNumberDev.innerHTML = idNumber;
        changeBanner();
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
      //エラー場合のバナー切り替え
      var element = document.querySelector(".reception-Answer_Call_Response");
      if (element) {
        element.parentNode.removeChild(element);
      }

      var targetDev = document.querySelector(".reception-Answer_Call-Notice");
      targetDev.innerHTML = "ただいまお電話をご利用頂けません";

      changeBanner();
    });
}
