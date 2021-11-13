window.onload = function() {
    $.ajax({
        url: '/profile',
        method: "POST",
        dataType: "json"
    })
    .done((res) => {

        initProfile(res.info)
        buildPanel(res.semester)
        console.log(res.semester);
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
    let inner = data.marks.reduce((acc, el) => {
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
    console.log("ddede");
    $.ajax({
        url: '/get_panel_data',
        method: "POST",
        dataType: "json",
        data: {
            id
        }
    })
    .done(data => buildTable(data));
}

// Функция заполения панели кнопками выбора семестра
// data -> array of objects {id, name}
function buildPanel(data) {
    let ids = []
    let inner = data.reduce((acc, el) => {
        ids.push({id: 'btn'+el.id, num: el.id});
        return acc + `<button id="${'btn' + el.id}"class="button semesterBtn">${el.name}</button>`
    }, '');
    $("#subjects__list").html(inner);

    ids.forEach((el) => {
        $('#'+el.id).on('click', () => {
            semesterClickHandler(el.num)
        });
    });
}


