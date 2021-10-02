window.onload = function() {
    init();
}

// Инициализация элементов 
// Проверка авторизации
function init() {

}

function getPage(url) {
    $.ajax({
        url: url,
        method: "get",
        async: false,
        dataType: "html"
    })
    .done(() => {

    });
    return 
}