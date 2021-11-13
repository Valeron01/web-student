window.onload = function() {
    $.ajax({
        url: '/profile',
        method: "POST",
        dataType: "json"
    })
    .done((res) => {
        initProfile(res.info)
        res.info.is_teacher ? buildSubjectPanel(res.subject) : buildSemesterPanel(res.semester)
        console.log(res.semester);
    })
}

function initProfile(data) {
    $('#role').text(data.role)
    $('#name').text(data.name)
    $('#email').text(data.email)
}

function buildSubjectPanel(data) {
    let ids = []
    let inner = data.reduce((acc, el) => {
        ids.push({id: 'btn'+el.id, num: el.id});
        return acc + `<button id="${'btnSub' + el.id}"class="button subjectBtn">${el.name}</button>`
    }, '');
    $("#subjects__list").html(inner);
    

    ids.forEach((el) => {
        $('#'+el.id).on('click', () => {
            subjectClickHandler(el.num)
        });
    });
}

function buildSubjectTable(data) {
    const table = $('#table');
    let header = `<tr class="table__header"><th>Студент</th><th>Оценка</th></tr>`;
    let inner = data.marks.reduce((acc, el) => {
         return acc + `<tr>
                    <td>${el.name}</td>
                    <td>
                        <input class="inputMark" type="text" value="${el.mark}">
                    </td>
                </tr>`;
    }, header);
    inner += '<button id="btnSave">Сохранить</button>'
    table.html(inner);
    $("#btnSave").on('click', sendMarkData)
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

const subjectClickHandler = (id) => {
    $.ajax({
        url: '/get_subject_data',
        method: "POST",
        dataType: "json",
        data: {
            id
        }
    })
    .done(data => buildSubjectTable(data));
}

const sendMarkData = () => {

} 

// Функция заполения панели кнопками выбора семестра
// data -> array of objects {id, name}
function buildSemesterPanel(data) {
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


