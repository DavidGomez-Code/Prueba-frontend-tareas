const lista = document.querySelector('#lista')
const elemento = document.querySelector('#elemento')
const input = document.querySelector('#input')
const descripcion = document.querySelector('#descripcion-nota')
const botonEnter = document.querySelector('#boton-enter')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let LIST

let id // para que inicie en 0 cada tarea tendra un id diferente

//Creación de la Fecha Actualizada  
const dateNumber = document.getElementById('dateNumber');
const dateText = document.getElementById('dateText');
const dateMonth = document.getElementById('dateMonth');
const dateYear = document.getElementById('dateYear');

// Tasks Main (container principal)
const tasksContainer = document.getElementById('tasksContainer');

const setDate = () => {
    const date = new Date();
    dateNumber.textContent = date.toLocaleString('es', { day: 'numeric' });
    dateText.textContent = date.toLocaleString('es', { weekday: 'long' });
    dateMonth.textContent = date.toLocaleString('es', { month: 'short' });
    dateYear.textContent = date.toLocaleString('es', { year: 'numeric' });
};

const renderOrderedTasks = () => {
    order().forEach(el => tasksContainer.appendChild(el))
}
setDate();


// Función de Agregar Nota 
function agregarTarea( tarea,id,realizado,eliminado) {
    if(eliminado) {return} // si existe eliminado es true si no es false 

    const REALIZADO = realizado ? check : uncheck // si realizado es verdadero check si no uncheck

    const LINE = realizado ? lineThrough : '' 

    const elemento = `
                        <li id="elemento">
                        <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
                        </li>
                    `
    lista.insertAdjacentHTML("beforeend",elemento)

}


// Función de Nota Realizada 
function tareaRealizada(element) {
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST[element.id].realizado = LIST[element.id].realizado ?false :true //Si
   // console.log(LIST)
   // console.log(LIST[element.id])
   // console.log(LIST[element.id].realizado)
}

function tareaEliminada(element){
   // console.log(element.parentNode)
   // console.log(element.parentNode.parentNode)
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].eliminado = true
    console.log(LIST)
}



// crear un evento para escuchar el enter y para habilitar el boton
botonEnter.addEventListener('click', ()=> {
    const tarea = input.value
    if(tarea){
        agregarTarea(tarea,id,false,false)
        LIST.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false
        })
        localStorage.setItem('TODO',JSON.stringify(LIST))
        id++
        input.value = ''
    }

})


document.addEventListener('keyup', function (event) {
    if (event.key=='Enter'){
        const tarea = input.value
        if(tarea) {
            agregarTarea(tarea,id,false,false)
        LIST.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false
        })
        localStorage.setItem('TODO',JSON.stringify(LIST))
     
        input.value = ''
        id++
        console.log(LIST)
        }
    }
    
})


lista.addEventListener('click',function(event){
    const element = event.target 
    const elementData = element.attributes.data.value
    console.log(elementData)
    
    if(elementData == 'realizado') {
        tareaRealizada(element)
    }
    else if(elementData == 'eliminado') {
        tareaEliminada(element)
        console.log("elimnado")
    }
    localStorage.setItem('TODO',JSON.stringify(LIST))
})


let data = localStorage.getItem('TODO')
if(data){
    LIST = JSON.parse(data)
    console.log(LIST)
    id = LIST.length
    cargarLista(LIST)
}else {
    LIST = []
    id = 0
}


function cargarLista(array) {
    array.forEach(function(item){
        agregarTarea(item.nombre,item.id,item.realizado,item.eliminado)
    })
}