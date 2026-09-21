const toDoList = [];

function rendertodolist() {
  let toDoListHTML = "";

  for (let i = 0; i < toDoList.length; i++) {
    const todo = toDoList[i];
    const html = `<p>${todo}</p>`;
    toDoListHTML += html;
  }

  document.querySelector(".js-todo-list").innerHTML = toDoListHTML;
}
rendertodolist();

function toDo() {
  const inputElement = document.querySelector(".js-name-input");
  const name = inputElement.value;
  console.log(name);

  toDoList.push(name);
  console.log(toDoList);

  inputElement.value = "";

  rendertodolist();
}
