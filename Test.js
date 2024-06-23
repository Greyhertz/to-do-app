const todoForm = document.getElementById("todo-form");

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const todoInput = document.getElementById("todo-input").value;

  if (todoInput === "") {
    alert("please enter a task!");
    return;
  }
  
  addTodo(todoInput);

  

  todoInput.value = "";
  
});

const todos = [];

function addTodo(todo) {
  todos.push(todo);
  const todoList = document.getElementById("todo-list");
  const listItem = document.createElement("li");
  const todoText = document.createElement("span");

  listItem.textContent = todo;
  todoList.appendChild(listItem);
  todoText.textContent = todo;
  todoList.appendChild(listItem)

  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  listItem.appendChild(checkBox);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  listItem.appendChild(deleteButton);

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  listItem.appendChild(editButton);

  checkBox.addEventListener("change", function () {
  if (this.checked) {
    listItem.style.textDecoration = "line-through"; // Add line-through when checked
  } else {
    listItem.style.textDecoration = "none"; // Remove decoration when unchecked
  }
});
  deleteButton.addEventListener("click", function () {
    todoList.removeChild(listItem);
  });

  editButton.addEventListener('click', function () {
    const currentText = listItem.textContent.trim();
    
    // Create an input field for editing
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = currentText;
  
    // Create a save button for editing
    const saveButton = document.createElement('button');
    saveButton.textContent = "Save";
    listItem.appendChild(saveButton);
    
    // Replace the listItem content with the input field
    listItem.textContent = '';
    listItem.appendChild(inputField);
    
    // Add event listener to saveButton for saving edits
    saveButton.addEventListener('click', function () {
      const newText = inputField.value.trim();
      if (newText !== '') {
        listItem.textContent = newText;
        
        // Update the todos array with the edited text
        const index = todos.indexOf(currentText);
        if (index !== -1) {
          todos[index] = newText;
        }
      } else {
        listItem.textContent = currentText; // Restore previous text if input is empty
      }
  
      // Restore delete and edit buttons
      listItem.appendChild(checkBox);
      listItem.appendChild(deleteButton);
      listItem.appendChild(editButton);
    });
  
    // Handle editing when pressing Enter key
    inputField.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        saveButton.click(); // Trigger saveButton click event to save changes
      }
    });
  });
}



