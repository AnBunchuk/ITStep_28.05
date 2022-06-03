'use strict'
const sendform = () => {
    let form = document.querySelector('form'),
        user = form.querySelector('[type=text]'),
        email = form.querySelector('[type=mail]'),
        mesDiv = document.querySelector('.message')

    let messages = {
        'succses': 'Данные успешгно отправлены',
        'warning': 'Данные отправляются',
        'error': 'Ошибка отправления данных'
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault()//отменяем стандартное поведени т.е. событие кнопки мы нажимаем ничего не происходит

        // раззрабатываем ассинхронную составляющую
        const request = new XMLHttpRequest// создаем переменную соединение создано
        request.addEventListener('readystatechange', () => { //отслеживаем событие 'readystatechange' 
            mesDiv.classList.add('warning')
            mesDiv.innerHTML = messages.warning;
            if (request.readyState !== 4) {
                return;
            }
            if (request.status === 200) {
                mesDiv.classList.remove('warning');
                mesDiv.classList.add('succses');
                mesDiv.innerHTML = messages.succses;
            } else {
                mesDiv.classList.remove('warning');
                mesDiv.classList.add('error');
                mesDiv.innerHTML = messages.error;
            }
        });
        request.open('POST', './send.php');// выбираем метод прередачи данных и url адресс где находятся наши данные
        request.setRequestHeader('Content-type', 'application/json'); //формат и куда отправляем

        const data = {}
        data.user = user.value;
        data.email = email.value;

        const body = JSON.stringify(data)

        console.log(body);

        request.send(body)

    })
}

sendform()