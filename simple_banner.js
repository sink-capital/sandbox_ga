setTimeout(function() { widget.show() }, 0);

var TIME_DELAY = 2000;

widget.setVal('clicked', false);

widget.method('showId', function () {
    this.clicked = true;
    fetchToken();

    setTimeout(function() {
        widget.setState(2);
    }, TIME_DELAY);
    tracker.track('call_tracking', {track_id: this.idNumber});

});

// プレビュー用
widget.onChangeVal('state', function(x) {
    x.newVal == 1 && widget.setVal('clicked', false);
});

function fetchToken() {
    var path = 'https://ott.ivry.jp/token?'
    
    var partner_client_id = '#{project_id}';
    var partner_visitor_id = #{visitor_id};
    var partner_user_id = #{user_id} || 'vis-' + #{visitor_id};
    
    var params = {
        partner_client_id: partner_client_id,
        partner_visitor_id: partner_visitor_id,
        partner_user_id: partner_user_id
    };
    
    var query = new URLSearchParams(params);
    
    fetch(path + query)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        var telNumber = json.ivry_phone_number.replace("+81", "0").replace(/^(0[56789]0)([0-9]{4})([0-9]{4})$/, "$1-$2-$3") || '電話番号の取得取得に失敗しました。';
        var idNumber = json.token || '0000';
        widget.setVal('idNumber', idNumber);
        widget.setVal('telNumber', telNumber);
    })
    .catch(function (error) {
        console.error('Error:', error);
    });
}