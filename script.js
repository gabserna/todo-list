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
          `<li id="${list.id}" class="tarea list-group-item"><label class="checkbox-container"><input id="${list.id}" type="checkbox" onclick="taskDone(this.id)"></label><div id="text_${list.id}" class="taskText" onclick="taskDone(this.id)">${list.text}</div>
          <i type="submit" id="${list.id}" class="btncard card card-body fas fa-edit" onclick="editPost(this.id)"></i>
          <div class="gap"></div>
          <i type="submit" id="${list.id}" class="btncard card card-body fa fa-close" onclick="removeMe(this.id)"></i>
          </li>`;
      } else {
        taskManager += `<li id="${list.id}" class="tarea list-group-item"><label class="checkbox-container"><input id="${list.id}" type="checkbox" checked onclick="taskDone(this.id)"></label><div id="text_${list.id}" class="checked taskText" onclick="taskDone(this.id)">${list.text}</div>
        <i type="submit" id="${list.id}" class="btncard card card-body fas fa-edit" onclick="editPost(this.id)"></i>
        <div class="gap"></div>
        <i type="submit" id="${list.id}" class="btncard card card-body fa fa-close" onclick="removeMe(this.id)"></i></li>`;
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
    let id = randomizer()
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
    let id = randomizer()
    let checkId = randomizer()
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

function removeAllDone() {
  thingsToDo.todos = thingsToDo.todos.filter((elem) => elem.completed === false);
  showToDo();
  keepRecord();
}

function removeCategory() {
  document.getElementById(thingsToDo.id).remove()
  lists.splice(lists.findIndex((elem) => elem.id === thingsToDo.id), 1)
  thingsToDo = lists[0]
  showToDo();
  keepRecord();
}

function removeMe(clickedId) {
  document.getElementById(`${clickedId}`).classList.add('animate__bounceOut');
  setTimeout(() => { 
    thingsToDo.todos.splice(thingsToDo.todos.findIndex((elem) => elem.id === clickedId), 1);
    showToDo();
    keepRecord();
  }, 600);
  console.log(thingsToDo.todos);
}

function resetEverything() {
  localStorage.removeItem('lists', JSON.stringify(lists));
  localStorage.removeItem('thingsToDo', JSON.stringify(thingsToDo));
  console.log(JSON.parse(localStorage.getItem('lists')))
  storeThis();
  showToDo();
  console.log(JSON.parse(localStorage.getItem('lists')))
}

function editPost(clickedId) {
  const taskIndex = thingsToDo.todos.findIndex((elem) => elem.id === clickedId);
  const taskText = document.getElementById(`text_${clickedId}`).innerHTML;
  const newText = prompt('Enter new text:', taskText);
  if (newText !== null) {
    thingsToDo.todos[taskIndex].text = newText;
    showToDo();
    keepRecord();
  }
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

function changeList(clickedId) {
  if (clickedId !== thingsToDo.id) {
    thingsToDo = lists[lists.findIndex((elem) => elem.id === clickedId)]
    showToDo();
    keepRecord();
  }

}

function randomizer() {
  return Math.random().toString(36).slice(2)
}

function keepRecord() {
  localStorage.setItem('lists', JSON.stringify(lists));
  localStorage.setItem('thingsToDo', JSON.stringify(thingsToDo));
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

