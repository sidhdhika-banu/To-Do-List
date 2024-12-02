document.addEventListener('DOMContentLoaded', function () {
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');
  const filters = document.querySelectorAll('input[name="filter"]');
  let todoIndex = 1;

  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
      const todoItem = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.completed;
      checkbox.classList.add('checkbox');
      checkbox.id = 'todo-' + index;
      const label = document.createElement('label');
      label.htmlFor = 'todo-' + index;
      label.textContent = `${todoIndex++}. ${todo.text}`;
      label.classList.add('checkbox-label');
      if (todo.completed) {
        label.classList.add('completed');
      }
      checkbox.addEventListener('change', () => {
        todos[index].completed = checkbox.checked;
        saveTodos();
        renderTodos();
      });

      const actions = document.createElement('div');
      actions.classList.add('actions');
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => {
        const newText = prompt('Enter new text:', todo.text);
        if (newText !== null && newText.trim() !== '') {
          todos[index].text = newText.trim();
          saveTodos();
          renderTodos();
        }
      });
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
      });
      actions.appendChild(editButton);
      actions.appendChild(deleteButton);

      todoItem.appendChild(checkbox);
      todoItem.appendChild(label);
      todoItem.appendChild(actions);
      todoList.appendChild(todoItem);
    });
    todoIndex = 1;
  }

  function filterTodos() {
    const selectedFilter = document.querySelector('input[name="filter"]:checked').value;
    if (selectedFilter === 'completed') {
      const completedTodos = todos.filter(todo => todo.completed);
      renderFilteredTodos(completedTodos);
    } else if (selectedFilter === 'incomplete') {
      const incompleteTodos = todos.filter(todo => !todo.completed);
      renderFilteredTodos(incompleteTodos);
    } else {
      renderTodos();
    }
  }

  function renderFilteredTodos(filteredTodos) {
    todoList.innerHTML = '';
    filteredTodos.forEach((todo, index) => {
      const todoItem = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.completed;
      checkbox.classList.add('checkbox');
      checkbox.id = 'todo-' + index;
      const label = document.createElement('label');
      label.htmlFor = 'todo-' + index;
      label.textContent = `${todoIndex++}. ${todo.text}`;
      label.classList.add('checkbox-label');
      if (todo.completed) {
        label.classList.add('completed');
      }
      checkbox.addEventListener('change', () => {
        todos[index].completed = checkbox.checked;
        saveTodos();
        renderFilteredTodos(filteredTodos);
      });

      const actions = document.createElement('div');
      actions.classList.add('actions');
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => {
        const newText = prompt('Enter new text:', todo.text);
        if (newText !== null && newText.trim() !== '') {
          todos[index].text = newText.trim();
          saveTodos();
          renderFilteredTodos(filteredTodos);
        }
      });
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        const todoIndex = todos.findIndex(item => item.text === todo.text);
        todos.splice(todoIndex, 1);
        saveTodos();
        renderFilteredTodos(filteredTodos);
      });
      actions.appendChild(editButton);
      actions.appendChild(deleteButton);

      todoItem.appendChild(checkbox);
      todoItem.appendChild(label);
      todoItem.appendChild(actions);
      todoList.appendChild(todoItem);
    });
    todoIndex = 1;
  }

  todoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
      todos.push({ text: todoText, completed: false });
      saveTodos();
      renderTodos();
      todoInput.value = '';
    }
  });

  filters.forEach(filter => {
    filter.addEventListener('change', filterTodos);
  });

  renderTodos();
});
