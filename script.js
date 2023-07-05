const apiUrl = 'https://jsonplaceholder.typicode.com/todos'
const todo = document.getElementById('todo-list')
const todoForm = document.getElementById('todo-form')


const getPosts = async () => {
    const fetching = await fetch(apiUrl + '?_limit=5')
    const jason = await fetching.json()
    jason.forEach(e => addTodoToDom(e))
   
}

const addTodoToDom = async (e) => {
  const div = document.createElement('div')
  div.classList.add('new-todo')
  div.appendChild(document.createTextNode(e.title))
  div.setAttribute('data-id',e.id)
  if(e.completed) {
      div.classList.add('done')
  }
  todo.appendChild(div)
}

const createTodo = (e) => {
e.preventDefault()

if(e.target[0].value === ''){
  alert('Enter Valid Value')
} else {

const newTodo = {
  title: e.target[0].value,
  completed: false
}
fetch(apiUrl, {
  method: 'POST',
  body: JSON.stringify(newTodo),
  headers: {
    'Content-Type' : 'application/json'
  }
  }
)
.then(res => res.json())
.then(data => addTodoToDom(data))
}
}

const todoDone = (e) => {
  if(e.target.classList.contains('new-todo')){
  e.target.classList.toggle('done')
  
  updateToDo( e.target.classList.contains('done'), e.target.dataset.id)
}}

const updateToDo = (taskCompleted,idValue) => {

  fetch(`${apiUrl}/${idValue}`, {
    method: 'PUT',
    body: JSON.stringify({taskCompleted}) ,
    headers: {
      'Content-Type' : 'application/json'
    }
    }
  )

}

const todoDelete = (e) => {
  if(e.target.classList.contains('done')){
    const id = e.target.dataset.id
    fetch(`${apiUrl}/${id}`,{
      method: 'DELETE'
    })
    .then(res=> res.json())
    .then(() => e.target.remove())
    
    
  }
}


const init = () => {
  document.addEventListener('DOMContentLoaded',getPosts)
  todoForm.addEventListener('submit',createTodo)
  todo.addEventListener('click',todoDone)
  todo.addEventListener('dblclick',todoDelete)
  
}

init();