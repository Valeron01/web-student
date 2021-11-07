window.onload = function() {
    $.ajax({
        url: '/profile',
        method: "POST",
        dataType: "json"
    })
    .done((res) => {
        initProfile(res.info)
        buildPanel(res.semester)
    })
}

function initProfile(data) {
    $('#role').text(data.role)
    $('#name').text(data.name)
    $('#email').text(data.email)
}

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

// Фунция обработчик клика по кнопке в панели семстров 
// Запрос, ответ, заполнение таблицы данными
const semesterClickHandler = (id) => {
    $.ajax({
        url: '/semester',
        method: "POST",
        dataType: "json",
        data: {
            semester: id
        }
    })
    .done(data => buildTable(data));
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
        $('#'+el.id).on('click', () => {
            semesterClickHandler(el.num)
        });
    });
}


