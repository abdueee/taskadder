
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

const CHECK = "fa-check-square";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "linethrough";

let LIST, id;

let data = localStorage.getItem("TODO");

if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(List);
}else{
    LIST = [];
    id = 0;
}

function loadList(array){
    array.forEach(function(item){
        addTODO(item.name, item.id, item.done, item.trash);
    });
}

const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

function addTODO(toDo, id, done, trash){

    if(trash){ return;}

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<i class="fa ${DONE} co" job="complete" id="${id}"></i>
    <p class="text ${LINE}">${toDo}</p>  
    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>`;
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

document.addEventListener("keyup",function(even){
    if(Event.keyCode == 13){
        if(toDO){
            addTODO(toDo, id, false, false);

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });

            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
});

function completeToDO(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.classList.toggle(CHECK);

    LIST[element.id].done = LIST[element.id].done? false : true;

}

function removeToDO(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob == "complete"){
        completeToDO(element);
    }else if(elementJob == "delete"){
        removeToDO(element);
    }

    localStorage.setItem("TODO", JSON.stringify(LIST));
});