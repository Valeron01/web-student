window.onload = function() {
    init();
};

// Инициализация элементов 
// Проверка авторизации
async function init() {
    $.ajax({url: "/", method: "post", dataType: "html"}).done(html => $("#root").html(html));

    buildTable([{name: "Мат.Анализ", teacher: "Сирота Е.А.", mark: 3}]);
    buildPanel([{id: 1, name: "I семестр"}]);
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

//Функция заполнения таблицы с предметами
//data -> array of objects {name, teacher, mark}
function buildTable(data) {
    const table = $('#table');
    let header = `<tr class="table__header"><th>Название</th><th>Преподаватель</th><th>Оценка</th></tr>`;
    let inner = data.reduce((acc, el) => {
         return acc + `<tr>
                    <td>${el.name}</td>
                    <td>${el.teacher}</td>
                    <td>${el.mark}</td>
                </tr>`;
    }, header);
    
    table.html(inner);
}

// Функция заполения панели кнопками выбора семестра
// data -> array of objects {id, name}
function buildPanel(data) {
    let ids = []
    let inner = data.reduce((acc, el) => {
        ids.push({id: 'btn'+el.name, num: el.id});
        return acc + `<button id="${'btn' + el.name}"class="button semesterBtn">${el.name}</button>`
    }, '');
    $("#subjects__list").html(inner);

    ids.forEach((el) => {
        $('#'+el.id).on('click', () => semesterClickHandler(el.num));
    });
    console.log(inner);
}

// Фунция обработчик клика по кнопке в панели семстров 
// Запрос, ответ, заполнение таблицы данными
function semesterClickHandler(id) {
    $.ajax({
        url: '/semester',
        method: "POST",
        dataType: "json",
        data: {
            id
        }
    })
    .done(data => buildTable(data));
}

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
        // setLocation(url);
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

// Обработчик клика по чек-боксу в форме регистрации
function checkboxHandler(event) {
    if (event.target.checked) {
        $("#student-number").prop("disabled", true);
    } else {
        $("#student-number").prop("disabled", false);
    }
}

