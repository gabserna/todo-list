# 2.P.1 | Todo App - Step-by-step guide

Cree una aplicación de tareas pendientes que permita a los usuarios crear múltiples listas de tareas, editar, eliminar, marcar y borrar tareas cuando estén completas.

# Requisitos:
**El usuario debe poder:**
- crear varias listas de tareas.
- editar, eliminar y marcar tareas.
- borrar las tareas cuando estén completas.
- ver todas las tareas en una lista.
- buscar tareas específicas en la lista.
- guardar tareas para verlas más tarde.
- marcar las tareas como completadas.
- eliminar tareas de la lista.
- personalizar la vista de la lista de tareas.
- debe ser intuitiva y fácil de usar.

# Entregables:
Una aplicación que cumpla con los requisitos establecidos anteriormente.
Capturas de pantalla de la aplicación.
Documentación del código y características de la aplicación.
Debe estar escrito en JavaScript.
 

# Guía paso a paso para la aplicación Todo
1 Descripción general
2 interfaz de usuario
3 Modelo
4 Funciones
5 Eventos
6 animaciones
7 Almacenamiento local
8 Consejos


# 1. Información general
El propósito de esta guía es brindarle una buena estructura a seguir al crear su aplicación Todo. Si sigue este patrón, le resultará mucho más fácil completar el proyecto. Esta guía no lo detallará todo, sino que le brindará una buena orientación y lo ayudará a evitar baches.

# 2 - interfaz de usuario
Una gran parte de esta aplicación es hacer que aparezcan cosas en la pantalla y hacer que se pueda interactuar. Todas las buenas aplicaciones tienen una buena interfaz de usuario. UI significa interfaz de usuario. En esta guía, esto significa el HTML y CSS que escribirás.

Paso 1: Cree un buen contenedor div que contendrá tanto el menú de la izquierda como la pantalla de lista de tareas de la derecha. Recomiendo usar bootstrap grid https://getbootstrap.com/docs/4.0/layout/grid/#how-it-works. para esto. Le brinda una manera simple y fácil de organizar las cosas en su HTML. Lo uso junto con flexbox y mantengo las cosas simples. Este es un ejemplo de un diseño general que necesitaría para crear una lista como esta.

<div class="outer">
 <nav class="navbar">
   <!-- navbar not needed but looks cool -->
 </nav>

 <div class="container-fluid">
   <div class="row">
     <div class="col-3">
       <!-- list of todo lists go here -->
     </div>

     <div class="col-8">
       <!-- current todo list name goes here -->
       <!-- current todo list goes here -->
     </div>

   </div>
 </div>
</div>

Paso 2: cree una entrada y una lista en la parte izquierda de la interfaz de usuario. El aspecto más limpio sería tener un cuadro de entrada a la izquierda y debajo la lista de tareas pendientes. Si bien la lista se generará dinámicamente con JS, puede crear una lista ficticia para poder realizar parte del formato. Mire el Bootstrap grupo de listas https://getbootstrap.com/docs/4.0/components/list-group/#basic-example. para esto. Es un buen aspecto limpio. Recuerde proporcionar una identificación a la entrada para que luego pueda hacer referencia a ella en JS y obtener el valor de la misma. Use flexbox para hacer que la entrada tenga el ancho de la columna.

Paso 3: cree un contenedor que contendrá un título y las tareas pendientes de la lista actual. Tiene que tomar una decisión aquí, y es, ¿cómo va a permitir que el usuario ingrese más tareas pendientes? La forma más fácil sería tener un cuadro de entrada y un botón "Agregar", cuando el usuario haga clic en el botón Agregar, su JS creará una nueva tarea pendiente y hará que aparezca en la lista debajo de la entrada.

# 3 - Modelo
Esta es una parte muy importante de la aplicación. En esta parte es donde crea la forma en que se representarán los datos en su aplicación. Si haces bien esta parte, el resto de la aplicación será mucho más fácil. Dedique algún tiempo a comprender cómo va a representar la lista o el objeto que contendrá las listas de tareas pendientes. Las principales preocupaciones a las que se enfrentará en esta aplicación son:

Cómo realizar un seguimiento de cada lista y cada tarea pendiente en cada lista
Cómo relacionar una entrada de usuario (es decir, un botón) con las listas o tareas pendientes
¿Cómo guardaré y recuperaré las listas?
Paso 1: crea la estructura de datos que vas a utilizar para tu lista de listas. En clase, vamos a repasar las clases y puedes hacerlo, pero si quieres facilitar las cosas para esta primera aplicación, un objeto bien pensado y ejecutado será suficiente. Para la lista que contendrá la lista, puede crear una matriz, sin embargo, si la convierte en un objeto, se ahorrará algunos dolores de cabeza. Entonces, ¿cuál sería la clave en el objeto? Recuerde que los objetos tienen pares clave-valor. El valor es claramente la lista, pero ¿qué pasa con la clave? Tienes razón, una "identificación" de algún tipo. Entonces se vería algo como esto:

const lists = {
 1: {name: 'Shopping list'},
 2: {name: 'Honey do list'},
 ...
}

Paso 2: Cree la estructura de datos para una lista. Ahora, pensemos en esto. ¿Qué tan fácil será la vida si mantienes todos los datos de una lista dentro de un objeto? Para eso están los objetos, ¿verdad? Entonces, ¿qué pondrías ahí? El nombre de la lista por supuesto, ¿qué más? ¡La tarea es duh! Podría verse algo como esto:

const currentList = {
 name: "Shopping list",
 todos: [
 ]
}


Paso 3: Cree la estructura de datos para una tarea pendiente. Ahora, el todo tendrá un texto o valor, ¿verdad? Algo que alguien tiene que hacer. Pero también necesita otro campo. Una forma de saber o establecer si esa tarea ha sido completada o no. Es probable que este campo se represente como una casilla de verificación, pero en el código debe ser booleano. Esto de aquí es un buen comienzo:

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

Paso 4: ponerlo todo junto. Así es como se vería todo. Una vez más, esto es un comienzo. Es posible que necesite más campos. Puede crear esto como un objeto de prueba a medida que comienza a crear el resto de la aplicación. Si no está seguro de lo que sucede con este código, tómese un tiempo para comprenderlo antes de continuar. ¡Hacer preguntas!

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

# 4 - Funciones
Ok, ahora estamos llegando a la parte divertida del proyecto. ¡Esta es la parte donde hacemos que las cosas sucedan! Con nuestras funciones y lógica, nuestro objetivo es simple, hacer que haga lo que queremos con el enfoque más simple. Hay muchas, de hecho, infinitas formas de escribir esta aplicación, pero nos esforzaremos por lograr la simplicidad. ¿Por qué? Porque al hacerlo, evitará que nos golpeemos demasiado la cabeza con el teclado tratando de averiguar qué está pasando en el mundo. Queremos tener una función principal que haga la mayor parte del trabajo pesado y luego otras funciones que reaccionen a la entrada del usuario.

Paso 1: crea una función de renderizado. Esta es la función que hará el trabajo pesado. Será el encargado de renderizar todo el contenido de la página. Crear una función para hacerlo todo en lugar de manejarla en diferentes funciones tiene la ventaja de que se puede llamar cada vez que se realizan cambios en los datos. Por ejemplo, alguien agrega una tarea pendiente, usted agrega la tarea pendiente a la lista correcta y luego llama a la función de procesamiento. Su función de renderizado puede verse así:

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



Paso 2: Agregue funciones para reaccionar a la entrada del usuario. Entonces, el usuario puede hacer muchas cosas en su aplicación, ¿verdad? Desde crear nuevas listas hasta marcar una tarea pendiente como completa. Tienes que escribir una función para cada una de estas acciones. Aquí hay un ejemplo, pero lo más importante aquí es que sus funciones deben modificar el modelo (datos) y luego llamar a la función de representación. Debe evitar modificar html en su función. Entonces, aquí hay un ejemplo de una función que usaría. Un usuario intenta agregar una tarea pendiente. Configura un botón para esto y tiene una entrada donde pueden escribir sus tareas pendientes.

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


Aquí hay una lista de funciones que probablemente necesitará:

añadir lista
eliminarLista
añadirTodo
removeTodo
marcarTodoComoCompletado
removeAllTodosCompleted

# 5 - Eventos

Ok, ahora tienes algunas funciones que actualizan el modelo y representan el nuevo html. Lo que debemos hacer ahora es vincular esas funciones a eventos html. La mayoría de ellos serán clics. En este ejemplo, nos vinculamos con el evento onclick dom. Dentro de la función addList obtenemos el valor de la entrada al lado del botón, creamos una nueva lista y la agregamos al objeto de las listas.

<div>
 <input id="new-list-name-input">
 <button class="btn btn-primary" onclick="addList()"></button>
</div>

# 6 - Animaciones

Las animaciones no son necesarias en una aplicación, pero cuando se usan correctamente pueden proporcionar comentarios valiosos al usuario y hacer que su aplicación se sienta pulida. Al igual que con el resto de la aplicación, queremos simplificar las cosas cuando se trata de animaciones. Afortunadamente para nosotros, las animaciones de la interfaz de usuario han existido por un tiempo, por lo que existen algunas bibliotecas fáciles de usar. Uno de mis favoritos es animate css. Todo lo que necesita hacer es agregar la biblioteca a su proyecto y luego agregar o quitar una clase a un elemento html para animarlo. Puede encontrarlo aquí animate.css https://animate.style/.

Probemos una animación. Aquí está la receta para animar la eliminación de todo completado. Tres pasos básicos. Todo súper sencillo. Esto estaría dentro de sus funciones deleteTodo o deleteCompleted:

// get element by the id
 
const todoElement = document.getElementById(todoId);
// step 1, add the animated class and the animation class you want
 
todoElement.classList.add('animated', 'fadeOutRight');
// step 2, remove the todo from the list
 
currentList.todos = currentList.todos.filter(todo => todo == todoId)
// step 3, set a timer so that after the animation
// the html renders again and the

setTimeout(render, 650);


# 7 - Almacenamiento local
El almacenamiento local es muy simple. Bueno, puede serlo si usaste el modelo similar al descrito en esta guía. Realmente todo lo que tienes que hacer es crear una función de guardar que guardará el estado de la aplicación. Por lo tanto, guardará sus listas y los objetos currentList en el almacenamiento local y luego los recuperará al comienzo de su archivo javascript principal. Querrá llamar a su función de guardar cada vez que llame a su función de renderizado. De esa manera usted guarda cada vez que hay cambios. Su función de guardar se verá así:

function save() {
 localStorage.setItem('currentList', JSON.stringify(currentList)); 
 localStorage.setItem('lists', JSON.stringify(lists));
}




# 8 - Consejos
Estos son algunos consejos que le ayudarán a tener éxito en la creación de esta aplicación:

Trabajar con identificaciones. Dé a cada lista una identificación y dé a cada tarea una identificación. De esa manera, puede referirse fácilmente a ellos en el html. Querrás crear una manera para que las identificaciones sean únicas. Haría una función que crea una identificación aleatoria de 16 caracteres y luego llamaría a esa función cada vez que necesito una nueva identificación. Puede buscarlo en Google y encontrar muchas ideas sobre el desbordamiento de pila. De esa manera, cuando tenga que vincular un clic o una casilla de verificación a una tarea pendiente, puede hacerlo mediante la identificación. Algo como,


<input type="checkbox" id="${'todo-' + todo.id}" onclick="completeTodo(${todo.id})">