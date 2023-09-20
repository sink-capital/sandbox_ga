(function () {
  console.log("script.js");

  var cssString =
    ".callBunner_Wrapper {position: fixed;right: 30px;bottom: 50px;text-align: left;font-size: 12px;line-height: 1.66667;}.callBunner_Wrapper * {box-sizing: border-box;font-size: 100%;line-height: inherit;}.telNumber {font-size: 130%;text-decoration: underline;}.reception-Skin {width: 85.33vw;max-width: 320px;border-radius: 4px;background: #FFF;-webkit-box-shadow: 0px 32px 64px rgba(0, 16, 14, 0.31), 0px 0px 0px rgba(0, 16, 14, 0.03);box-shadow: 0px 32px 64px rgba(0, 16, 14, 0.31), 0px 0px 0px rgba(0, 16, 14, 0.03);}.reception-Skin {display: none;}.reception-Skin.active {display: block;}.reception-Answer_Container {position: relative;border-top: solid 1px rgba(0, 16, 14, 0.06);box-sizing: border-box;background: rgba(0, 16, 14, 0.03);}.reception-Answer_Container:after {content: '';display: none;z-index: 2;position: absolute;right: 0;bottom: 0;left: 0;width: 100%;height: 60px;background: linear-gradient(0, rgba(255, 255, 255, 0.0001) 0.02%, #FFFFFF 0.03%, #FFFFFF 42%, rgba(255, 255, 255, 0) 99.97%);}:global(.is-scroll).reception-Answer_Container:after {display: block;}.reception-Answer_Item {position: relative;margin: 24px 0;}.js-answer-item {height: 242px;}.reception-Answer_TextOuter {position: relative;min-height: 100%;}.reception-Answer_TextOuter:after {display: block;position: absolute;top: 0;right: 0;bottom: 0;left: 0;}.reception-Answer {position: relative;z-index: 1;min-height: 100%;padding: 0 24px 72px;font-size: 12px;line-height: 1.67;}.reception-Answer a {text-decoration: underline;}.reception-Answer a:hover {text-decoration: none;}.reception-Answer h1 {font-size: 1111px;}.reception-Answer_Notice {position: absolute;bottom: 0;left: 0;padding: 0 24px;font-size: 10px;font-weight: bold;}.reception-Answer_Call-Notice {bottom: 0;left: 0;padding: 10px 24px;color: #{fontColor.sub};font-size: 10px;font-weight: bold;margin-bottom: 10px;}.reception-Answer_Call {padding: 0 24px;}.reception-Answer_Call p {font-size: 12px;padding: 10px 0;}.reception-Answer_Call .telNumber {font-size: 80%;}.reception-Answer_Call .telNumber>a {font-size: 150%;text-decoration: underline;}.reception-Answer_Call .idNumber {display: block;border-radius: 4px;border: solid 1px transparent;padding: 10px 0;width: 100%;background: #f0f1f1;text-align: center;font-size: 80%;margin-top: 10px;}.reception-Answer_Call .idNumber em {font-style: normal;font-weight: inherit;font-size: 130%;font-family: 'Noto Sans', sans-serif;letter-spacing: .1em;}.js-answer-item-call {margin: 0;max-height: 100%;}.callRequest_Banner .reception-Answer_Call{display: flex;align-items: center;}.callRequest_Banner .callRequest_Button{height: 50px;width: 120px;padding: 10px 10px;background-color: #17995B;color: white;border-radius: 4px;border: none;text-align: center;cursor: pointer;font-size: 10px;line-height: 1.2;}.callRequest_Banner .callRequest_Button:active {box-shadow: none;transform: scale(0.98);}";

  var htmlString =
    '<div class="callBunner_Wrapper">' +
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
    '<div class="reception-Answer_Call">' +
    "<p>下記に表示された4桁のお客様番号を音声ガイドに従いご入力ください。</p>" +
    '<strong class="telNumber">' +
    'お問い合わせ窓口：<a href="tel:050-3198-9423">050-3198-9423</a>' +
    "</strong>" +
    '<strong class="idNumber">' +
    "お客様番号<br />" +
    '<em class="idNumber_Value">{{idNumber}}</em>' +
    "</strong>" +
    "</div>" +
    '<p class="reception-Answer_Call-Notice">' +
    '<i class="fa fa-exclamation-triangle" aria-label="注意:"></i>' +
    "お客様番号の有効期限は5分になります。5分経過している場合は再度こちらの画面を開き直してください。</br>" +
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

  // 'div'要素を作成し、クラス名 'optimize-m' を設定
  var o = document.createElement("div");
  o.className = "optimize-m";

  // HTML内容を'optimize-m' div内に挿入
  o.insertAdjacentHTML("afterbegin", htmlString);

  // 作成した 'div' 要素をbodyに追加
  document.body.appendChild(o);
})();
