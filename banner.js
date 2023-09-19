var loadedFiles = [];
console.log('a_1')
var loadScript = function(src, callback) {
    // ロード済みか確認
    if (loadedFiles.indexOf(src) == -1) {
        var firstScriptTag = document.getElementsByTagName('script')[0],
            tag = document.createElement('script'),
            loaded = false;
        tag.src = src;
        callback && (tag.onload = tag.onreadystatechange = function() {
            if (!loaded && (!this.readyState || this.readyState === 'complete')) {
                loadedFiles.push(src);
                loaded = true;
                callback();
            }
        });
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
        // コールバックをキューに追加：即時実行だと要素選択などがエラーになる
        callback && setTimeout(function() { callback() }, 0);
    }
};

var questionItems = ['#{questions.q_1}','#{questions.q_2}','#{questions.q_3}','#{questions.q_4}', '#{questions.q_5}'];
var answerItems = ['#{answers.a_1}','#{answers.a_2}','#{answers.a_3}','#{answers.a_4}', '#{answers.a_5}'];

var widgetRootElement;

var setQuestionElementsText = function() {
    widgetRootElement = widget.render.vm.$el;
    var questionElements = Array.prototype.slice.call(widgetRootElement.querySelectorAll('.js-question-item'));
    
    questionElements.forEach(function(el, index) {
        el.textContent = questionItems[index];
    });
};

var adjustContainerHeight = function() {
    var content = widgetRootElement.querySelector('.js-question-container');
    var contentHeight = content.clientHeight + 25;
    
    widget.setVal('currentContainerStyle', {
        height: contentHeight + 'px'
    });
    
    widget.setVal('currentItemStyle', {
        height: ( contentHeight - 48 ) + 'px'
    });
};

var getCurrentURLEntity = function() {
    var url = new URL(location.href);
    
    return {
        origin: url.origin,
        pathname: url.pathname,
        hash: url.hash,
        search: url.search
    };
};

var checkAnswerContainerScrolable = function() {
    var answerItem = widgetRootElement.querySelector('.' + styles['js-answer-item']);
    var answerTextOuter = answerItem.querySelector('.js-answer-text-outer');

    var scrollableHeight = answerTextOuter.clientHeight - answerItem.clientHeight;
    
    if (scrollableHeight > 0) widget.setVal('isScrollable', true);
    
    answerItem.addEventListener('scroll', function(e) {
        if (e.target.scrollTop > scrollableHeight - 1) widget.setVal('isScrollable', false);
        else widget.setVal('isScrollable', true);
    });
};

widget.onChangeVal('state', function() {
    widget.setVal('isScrollable', false);
    
    var currentState = widget.getState();
    
    switch(currentState) {
        case 2:
            setTimeout(setQuestionElementsText, 100);
            break;
            
        case 3:
            setTimeout(checkAnswerContainerScrolable, 100);
            break;
      
         default:
            break;
    }
});

widget.method('onOpenFAQ', function() {
    tracker.track('open_faq', {
        current_url: getCurrentURLEntity()
    });
    
    widget.setState(2);
});

widget.method('onBackState', function() {
   var currentState = widget.getState();
   
   widget.setState(currentState - 1);
});

widget.method('onSelectQuestion', function(index) {
    var currentQuestion = questionItems[index];
    var currentFaqIndex = index + 1;
    
    tracker.track('select_question', {
        current_url: getCurrentURLEntity(),
        question: currentQuestion,
        faq_index: currentFaqIndex
    });
    
    adjustContainerHeight();
    
    widget.setVal('currentFaqIndex', currentFaqIndex);
    widget.setVal('currentQuestion', currentQuestion);
    widget.setVal('currentAnswer', answerItems[index]);
    
    widget.setState(3);
});

widget.method('onSelectChat', function() {
    var currentState = widget.getState();
    
    var currentValue = {
        current_state: currentState,
        current_url: getCurrentURLEntity()
    };
    
    if (currentState === 3) {
        _.assign(currentValue, {
            question: widget.getVal('currentQuestion'),
            faq_index: widget.getVal('currentFaqIndex')
        });
    }
    
    tracker.track('select_chat', currentValue);
    
    chat.activate();
});

// call tracking start

widget.method('onSelectCall', function() {
    fetchToken();

    var currentState = widget.getState();
    
    var currentValue = {
        current_state: currentState,
        current_url: getCurrentURLEntity()
    };

    tracker.track('select_call', currentValue);
    console.log("select_call");
    widget.setState(4);
});

function fetchToken() {
    var path = 'https://ott.ivry.jp/token?'
    
    var partner_client_id = '#{project_id}';
    var partner_visitor_id = '#{visitor_id}';
    var partner_user_id = '#{user_id}' || 'vis-' + '#{visitor_id}';
    
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


// call traking end

chat.emitter.on('activate', function() {
    widget.hide();
});

chat.emitter.on('deactivate', function() {
    widget.setState(1);
});

chat.option({
    version: 2,
    theme_color: '#{fontColor.link}',
    header_title: '#{chat.headerTitle}',
    header_description: '#{chat.headerDescription}',
    enable_image_upload: '#{chat.enableImageUpload}',
    show_notification_email_setting_view: '#{chat.enableNotificationEmailSetting}',
    hide_launcher: true,
    default_operator_name: '#{chat.defaultOperatorName}',
    default_operator_image: '#{chat.defaultOperatorImage}',
    force_operator_name: '#{chat.forceOperatorName}',
    force_operator_image: '#{chat.forceOperatorImage}',
    align_left: '#{chat.alignLeft}',
    side_spacing: '#{chat.sideSpacing}',
    bottom_spacing: '#{chat.bottomSpacing}'
});

var init = function() {
    widget.show();
    chat.open();

    if('#{chat.autoMessage}') {
        chat.send({
          text: '#{chat.autoMessage}'
        });
    }
}

loadScript('//cdn.jsdelivr.net/npm/url-polyfill@1.1.10/url-polyfill.min.js', init);