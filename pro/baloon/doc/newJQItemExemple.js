$('<a>', {
    text: 'Я контейнер-ссылка',
    href: 'http://google.com',
    target: "_blank",
    css: {
        color: 'green',
        backgroundColor: 'black',
        display: 'block',
        position: 'relative',
        padding: '10px',
    },
    width: 200,
    height: 100,
    offset: {
        top: 20,
        left: 120,
    },
    on: {
        click: function(event){
            alert('На меня кликнули');
        },
        mouseover: function(event){
            alert("На меня навели мышку");
            $(this).off('mouseover');
        }
    },
    append: $('<br>')
        .add($('<span>',
            {
                text: 'Я вставленный html',
                css: { fontWeight: 'bold'}
            }))
        .add($('<br>'))
        .add($('<span>', {
            html: '<strong>Мой html задан в параметрах</strong>',
        })),
})
    .appendTo('#wrapper');

//http://api.jquery.com/jQuery/#jQuery2
//http://ts-soft.ru/blog/jquery-create-element