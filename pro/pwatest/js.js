word = 'hello';
translate = 'привет';

console.log(word)
console.log(translate)

$(document).ready(function () {
    console.log($('#puzzles'))
    console.log(word.split('').sort(()=>Math.random()-0.5))

    template = $('#puzzle-template').html();

    word.split('').sort(()=>Math.random()-0.5)
        .forEach(function(item){
            $('#puzzles').append(template.replace('{content}', item))
        })

    function select(){
        $(this).unbind('click')
        $('#puzzles').append(this)
        $('#puzzles').append(' ')
        console.log('answer')
        $(this).click(unselect)
    }
    function unselect() {
        $('#answer').append(this)
        $('#answer').append(' ')
        console.log('select')

        $(this).unbind('click')
        $(this).click(select)
    }

    $('#puzzles > .puzzle').click(unselect)
    $('#answer > .puzzle').click(select)


    $('#check').click(function () {
        $('#conditions-screen').addClass('d-none')

        result = ''

        $('#answer > .puzzle').each(function () {
            result += $(this).text()
        })

        if (result == word) {
            console.log('success')
            $('#success-screen').removeClass('d-none')
        }else{
            console.log('fail')
            $('#fail-screen').removeClass('d-none')
        }
    })
})