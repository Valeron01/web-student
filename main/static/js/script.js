window.onload = function() {
    init();
}

// Инициализация элементов 
// Проверка авторизации
function init() {
    
}

// Изменить содержимое блока root
function changePage(url) {
    $.ajax({
        url: url,
        method: "get",
        dataType: "html"
    })
    .done((html) => {
        $("#root").html(html);
    });
}