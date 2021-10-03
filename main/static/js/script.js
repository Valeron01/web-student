window.onload = function() {
    init();
};

// Инициализация элементов 
// Проверка авторизации
async function init() {
    await changePage('/register');
}

// Изменение стандарного поведения ссылок 
// Переход по ссылке
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
        bindQueriesForLinks();
        setLocation(url);
    });
}

//Фунция изменяет адресную строку
function setLocation(curLoc) {
    try {
      history.pushState(null, null, curLoc);
      return;
    } catch(e) {}
    location.hash = '#' + curLoc;
}

function checkboxHandler(event) {
    if (event.target.checked) {
        $("#student-number").prop("disabled", true);
    } else {
        $("#student-number").prop("disabled", false);
    }
}