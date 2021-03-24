var grecaptchaWidgetId = null;
var grecaptchaToken = null;

var grecaptchaOnloadCallback = function() {
    if ( grecaptchaWidgetId==null ) {
        grecaptchaWidgetId = grecaptcha.render('grecaptcha', {
            'sitekey' : '6Ld2a3caAAAAAMrcZ8v3A8P9FnDt9l7gTvwBWeR9',
            'callback': grecaptchaRenderCallback,
            'expired-callback': grecaptchaExpiredErrorCallback,
            'error-callback': grecaptchaExpiredErrorCallback,
        });
    } else {
        grecaptcha.reset(grecaptchaWidgetId);
    }
};

var grecaptchaRenderCallback = function(response) {
    grecaptchaToken = response;
    $("button#submit").prop('disabled', false);
}

var grecaptchaExpiredErrorCallback = function(response) {
    grecaptchaToken = null;
    //$("button#submit").prop('disabled', true);
}

$( document ).ready(function() {

    $( '#submit' ).click(function() {

        $(".response").html("");

        let data = {
            "destination": $("#inputUrl").val(),
            "slashtag": ($("#inputKeyword").val().trim()=="") ? "" : $("#inputKeyword").val().trim(),
        };

        $.ajax({
            url: 'https://1820ngovs3.execute-api.ap-southeast-1.amazonaws.com/Production/',
            type: "POST",
            dataType: "json",
            crossDomain: true,
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
            },
            async: true,
            cache: false,
            success: function(response){
                console.log(response);
                
                if ( response.response.status=="active" ) {
                    $(".response").html( '<div class="msgOk">' + response.response.shortUrl + '</div>' );
                } else {
                    $(".response").html( '<div class="msgErr">' + response.response.errors[0]["message"] + '</div>' );
                }

                //$(".response").html( JSON.stringify( response.response ) );
            },
            error: function (e){
                console.log("Error: ", e);
                alert(e);
            },
            complete: function () {
                $("button#submit").prop('disabled', true);
                grecaptcha.reset(grecaptchaWidgetId);
            },
        });

    });

});
