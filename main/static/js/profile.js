window.onload = function() {
    $.ajax({
        url: '/profile',
        method: "POST",
        dataType: "json"
    })
    .done((res) => {
        initProfile(res.info)
        res.info.is_teacher ? buildSubjectPanel(res.subjects) : buildSemesterPanel(res.semester)
    })
}
//Вставка данных о пользователе в поля 
function initProfile(data) {
    $('#role').text(data.role)
    $('#name').text(data.name)
    $('#email').text(data.email)
}

//Формирование панели кнопок предметов
function buildSubjectPanel(data) {
    let ids = []
    let inner = data.reduce((acc, el) => {
        ids.push({id: 'btnSub'+el.id, num: el.id});
        return acc + `<button id="${'btnSub' + el.id}"class="button semesterBtn">${el.name}</button>`
    }, '');
    $("#subjects__list").html(inner);

    ids.forEach((el) => {
        $('#'+el.id).on('click', () => {
            subjectClickHandler(el.num)
        });
    });
}

//Формирование таблицы оценок всех студентов по данному предмету
function buildSubjectTable(data, id) {
    const table = $('#table')
    let header = `<tr class="table__header"><th>Студент</th><th>Оценка</th></tr>`
    let inner = data.marks.reduce((acc, el) => {
         return acc + `<tr>
                    <td>${el.name}</td>
                    <td>
                        <input class="inputMark" id="${el.id}" type="text" value="${el.mark}">
                    </td>
                </tr>`
    }, header)
    
    table.html(inner)
    $('.brnPlace').html('<button class="button saveBtn" id="btnSave">Сохранить</button>')
    $('#btnSave').on('click', () => sendMarkData(id))
}

//Функция заполнения таблицы с предметами
//data -> array of objects {name, teacher, mark}
function buildTable(data) {
    const table = $('#table')
    let header = `<tr class="table__header"><th>Название</th><th>Преподаватель</th><th>Оценка</th></tr>`
    let inner = data.marks.reduce((acc, el) => {
         return acc + `<tr>
                    <td>${el.name}</td>
                    <td>${el.teacher}</td>
                    <td>${el.mark}</td>
                </tr>`
    }, header)
    
    table.html(inner)
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
    .done(data => buildTable(data))
}

//Обработка клика по кнопе предмета
const subjectClickHandler = (id) => {
    $.ajax({
        url: '/get_subject_data',
        method: "POST",
        dataType: "json",
        data: {
            id
        }
    })
    .done(data => buildSubjectTable(data, id))
}

//Отправка измененных данных
const sendMarkData = (subject_id) => {
    const inputs = $('.inputMark')
    const result = []
    inputs.each((el) => {
        result.push({
            subject_id,
            student_id: inputs[el].id,
            mark: inputs[el].value
        })
    })
    $.ajax({
        url: '/modify_mark',
        method: 'post',
        dataType: 'json',
        data: {
            data: JSON.stringify(result)
        }
    })
    .done((res) => location.reload())
} 

// Функция заполения панели кнопками выбора семестра
// data -> array of objects {id, name}
function buildSemesterPanel(data) {
    let ids = []
    let inner = data.reduce((acc, el) => {
        ids.push({id: 'btn'+el.id, num: el.id})
        return acc + `<button id="${'btn' + el.id}"class="button semesterBtn">${el.name}</button>`
    }, '');
    $("#subjects__list").html(inner)
    

    ids.forEach((el) => {
        $('#'+el.id).on('click', () => {
            semesterClickHandler(el.num)
        });
    });
}


