window.onload = function() {
    init();
};

// Инициализация элементов 
// Проверка авторизации
async function init() {
    await changePage('/register');

    bindQueriesForLinks();
}

function bindQueriesForLinks() {
    $('a')
    .on('click', function (e) { 
        e.preventDefault();
        changePage(e.target.getAttribute('href'));
    })
};

// Изменить содержимое блока root
async function changePage(url) {
    await $.ajax({
        url: url,
        method: "get",
        dataType: "html"
    })
    .done((html) => {
        $("#root").html(html);
    });
}

