window.onload = function() {
    init();
};

// Инициализация элементов 
// Проверка авторизации
async function init() {
    $.cookie('token', '2321')
    checkAuthToken()
}

function checkAuthToken() {
    if ($.cookie('token') === undefined) {
        $(location).attr('href', '/auth')
    } else {
        $(location).attr('href', '/profile')
    }
}

