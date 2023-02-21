let thingsToDo;
let lists;
function showToDo() {
  if (lists[0]) {
    document.getElementById('initial').style.display = "flex";
    document.getElementById('dropdown').style.display = "initial";
    document.getElementById('list-group').style.display = "initial";
  } else {
    document.getElementById('initial').style.display = "none";
    document.getElementById('dropdown').style.display = "none";
    document.getElementById('list-group').style.display = "none";
    document.getElementById('tasksList').innerHTML =
      '<div class="newcateg"><i class="fa fa-list-ul"></i>&nbsp;Categories</div>';
  }

  let domThing = '<ul class="list-group">';
  lists.forEach((list) => {
    domThing += `<li id="${list.id}" class="list-group-item list-box" onclick="changeList(this.id)">${list.name}</li>`;
  });
  domThing += '</ul>';
  document.getElementById('lists').innerHTML = domThing;
  if (lists[0]) {
    document.getElementById('tasksList').innerText = thingsToDo.name;
  }

  let taskManager = '<ul class="list-group">';
  if (lists[0]) {
    thingsToDo.todos.forEach((list) => {
      if (list.completed === false) {
        taskManager +=
          `<li id="${list.id}" class="tarea list-group-item"><label class="checkbox-container"><input id="${list.id}" type="checkbox" onclick="taskDone(this.id)"></label><div id="${list.id}" class="taskText" onclick="taskDone(this.id)">${list.text}</div><button type="submit" id="${list.id}" class="btncard card card-body" onclick="removeTodo(this.id)"><i class="fa fa-close"></i></i></button></li>`;
      } else {
        taskManager += `<li id="${list.id}" class="tarea list-group-item"><label class="checkbox-container"><input id="${list.id}" type="checkbox" checked onclick="taskDone(this.id)"></label><div id="${list.id}" class="taskText" onclick="taskDone(this.id)">${list.text}</div><button type="submit" id="${list.id}" class="btncard card card-body" onclick="removeTodo(this.id)"><i class="fa fa-close"></i></i></button></li>`;
      }
    });
  }

  document.getElementById('mythingsToDo-list').innerHTML = taskManager;
  lists.forEach((list) => {
    if (thingsToDo.id === list.id) {
      document.getElementById(thingsToDo.id).classList.add('active')
    } else {
      document.getElementById(list.id).classList.remove('active')
    }
  })
}

function newCategory() {
  const text = document.getElementById('input-box').value;
  if (text === '') {
    alert('Please write a list name!');
    return false;
  } else {
    let id = randomIdentifier()
    lists.push({ id: id, name: text, todos: [] })
    thingsToDo = lists[lists.length - 1]
    document.getElementById('input-box').value = ''
    showToDo();
    keepRecord();
  }
}

function newTask() {
  const text = document.getElementById('inputBox').value;
  if (text === '') {
    alert('You need to add some text!');
    return false;
  } else {
    let id = randomIdentifier()
    let checkId = randomIdentifier()
    thingsToDo.todos.push({
      id: id,
      checkId: checkId,
      text: text,
      completed: false
    })
    document.getElementById('inputBox').value = ''
    showToDo();
    keepRecord();
  }
}

function removeList() {
  document.getElementById(thingsToDo.id).remove()
  lists.splice(lists.findIndex((elem) => elem.id === thingsToDo.id), 1)
  thingsToDo = lists[0]
  showToDo();
  keepRecord();
}

function removeTodo(clickedId) {
  thingsToDo.todos.splice(thingsToDo.todos.findIndex((elem) => elem.id === clickedId), 1)
  console.log(thingsToDo.todos)
  showToDo();
  keepRecord();
}

function taskDone(clickedId) {
  if (thingsToDo.todos[thingsToDo.todos.findIndex((elem) => elem.id === clickedId)].completed === false) {
    thingsToDo.todos[thingsToDo.todos.findIndex((elem) => elem.id === clickedId)].completed = true
  } else {
    thingsToDo.todos[thingsToDo.todos.findIndex((elem) => elem.id === clickedId)].completed = false
  }
  showToDo();
  keepRecord();
}

function removeAllDone() {
  thingsToDo.todos = thingsToDo.todos.filter((elem) => elem.completed === false);
  showToDo();
  keepRecord();
}

function changeList(clickedId) {
  if (clickedId !== thingsToDo.id) {
    thingsToDo = lists[lists.findIndex((elem) => elem.id === clickedId)]
    showToDo();
    keepRecord();
  }

}


function randomIdentifier() {
  return Math.random().toString(36).slice(2)
}
function keepRecord() {
  localStorage.setItem('thingsToDo', JSON.stringify(thingsToDo));
  localStorage.setItem('lists', JSON.stringify(lists));
}
function resetEverything() {
  localStorage.removeItem('thingsToDo', JSON.stringify(thingsToDo));
  localStorage.removeItem('lists', JSON.stringify(lists));
  console.log(JSON.parse(localStorage.getItem('lists')))
  storeThis();
  showToDo();
  console.log(JSON.parse(localStorage.getItem('lists')))
}

function storeThis() {
  if (JSON.parse(localStorage.getItem('lists')) !== null) {
    lists = JSON.parse(localStorage.getItem('lists'));
  } else {
    lists = []
  }
  if (JSON.parse(localStorage.getItem('thingsToDo')) !== null) {
    thingsToDo = JSON.parse(localStorage.getItem('thingsToDo'));
  } else {
    thingsToDo = []
  }
}
storeThis();
showToDo();


// add class checked to checked item of list
lists.addEventListener('click', function (event) {

  const targetElement = event.target;

  if (event && targetElement.tagName === 'LI') {
    targetElement.classList.toggle('checked');
  }
});

//targetElement rev    <-----