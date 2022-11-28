

document.querySelector('#search').addEventListener('click',getEducator)
const searchField = document.querySelector('#subject')

function getEducator(){
    const input = searchField.value

    fetch('/subject/'+input)
    .then(res => res.json())
    .then(data => {
        console.log(data)



    })
}


