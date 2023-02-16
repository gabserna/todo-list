const lists = {
    1: {name: 'Shopping list'},
    2: {name: 'Honey do list'},
}

const currentList = {
    name: "Shopping list",
    todos: [
    ]
}

todos: [
    {
      text: 'bananas',
      completed: false
    },
    {
      text: '1 lbs ground turkey',
      completed: false
    }
]

const lists = {
    1: {
      name: "Shopping list",
      todos: [
        {
          text: 'bananas',
          completed: false
        },
        {
          text: '1 lbs ground turkey',
          completed: false
        }
      ]
    },
   }
   const currentList = lists[0];


   function render() {
    // this will hold the html that will be displayed in the sidebar
    let listsHtml = '<ul class="list-group">';
    // iterate through the lists to get their names
    lists.forEach((list) => {
      listsHtml += `<li class="list-group-item">${list.name}</li>`;
    });
   
    listsHtml += '</ul>';
    // print out the lists
   
    document.getElementById('lists').innerHTML = listsHtml;
    // print out the name of the current list
   
    document.getElementById('current-list-name').innerText = currentList.name;
    // iterate over the todos in the current list
   
    let todosHtml = '<ul class="list-group-flush">';
    currentList.todos.forEach((list) => {
      todosHtml += `<li class="list-group-item">${todo.text}</li>`;
    });
    // print out the todos
    document.getElementById('current-list-todos').innerHTML = todosHtml;
   }



   function addTodo() {
    // get the todo text from the todo input box
    const text = document.getElementById('todo-input-box').value;
    if(text) {
      currentList.todos.push({
        text: text,
        completed: false
      })
      render();
    }
   }


//list of functions you will probably need
   addList
   removeList
   addTodo
   removeTodo
   markTodoAsCompleted
   removeAllTodosCompleted


//Let’s try an animation. Here is the recipe for animating a the removal of completed todo. Three basic steps. All super simple. This would be inside your deleteTodo or deleteCompleted functions:

// get element by the id
 
const todoElement = document.getElementById(todoId);
// step 1, add the animated class and the animation class you want
 
todoElement.classList.add('animated', 'fadeOutRight');
// step 2, remove the todo from the list
 
currentList.todos = currentList.todos.filter(todo => todo == todoId)
// step 3, set a timer so that after the animation
// the html renders again and the

setTimeout(render, 650);



function save() {
    localStorage.setItem('currentList', JSON.stringify(currentList)); 
    localStorage.setItem('lists', JSON.stringify(lists));
}