'use strict'

let select = document.querySelector('#cars'),
    // window.cars / можно обращаться на прямую через id
    output = document.querySelector('.output')
select.addEventListener('change',()=>{
    const request = new XMLHttpRequest();

    request.addEventListener('readystatechange', (event) => {
        if (request.readyState === 4 && request.status === 200){
            
            const data = JSON.parse(request.responseText);
            
           data.cars.foEach(item=>{
               if(item.brand===select.value){
                   output.innerHTML = 'Model: '+ item.model + '<br> Price'+
               }
           })
        }
    
    })
})


// console.dir(request)



request.open('GET', './cars.json', true,);
request.setRequestHeader('Content-type', 'application/json')
request.send()


