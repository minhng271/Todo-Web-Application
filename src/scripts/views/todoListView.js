export default class TodoListView {
    constructor(TodoItemView) {
      // Todo item view class
      this.taskView = TodoItemView;
  
      // Todo list element
      this.todoList = document.querySelector('.todo-list');
      this.todo = document.querySelector('li');
  
      // Add todo
      this.addTaskForm = document.querySelector('.add-task');
      this.inputTaskName = document.querySelector('.input-add-task');
  
      // Count todo
      this.todoCount = document.querySelector('.todo-count');
  
      // Toggle all tasks todo
      this.toggleAll = document.querySelector('#toggle-all');
  
      // Filters button
      this.filters = document.querySelector('.filters');
      this.filter = this.filters.querySelectorAll('button');
  
      // Clear all task completed button
      this.clearCompleted = document.querySelector('.btn-clear-completed');
  
      // Footer list task
      this.footerTodoList = document.querySelector('.footer-todo-list');
    }
  
    /**
     * Get data from input task name cell
     */
    get todoText() {
      return this.inputTaskName.value;
    }
  
    /**
     * Show the number of active tasks
     * @param {number} activeTask
     */
    showTaskActive(activeTask) {
      this.todoCount.innerHTML = `${activeTask} item${activeTask > 1 ? 's' : ''} left`;
    }
  
    /**
     * Render task list table
     * @param {object} tasks
     * @param {number} totalTaskCompleted
     * @param {fuction} handlers
     * @param {string} filterType
     */
    async displayTaskList(tasks, totalTaskCompleted, handlers, filterType) {
      const taskList = await tasks;
      // Delete all nodes
      while (this.todoList.firstChild) {
        this.todoList.removeChild(this.todoList.firstChild);
      }
  
      const { handleDeleteTask, handleToggleTodo, handleUpdateTodo } = handlers;
      // Show the entire task
      taskList.forEach((task) => {
        const taskElement = this.taskView.renderTask(task);
  
        this.todoList.append(taskElement);
        this.taskView.bindDeleteTodo(taskElement, handleDeleteTask, filterType);
        this.taskView.bindToggleTodo(taskElement, handleToggleTodo, filterType);
        this.taskView.bindEditTodo(taskElement, handleUpdateTodo, filterType);
      });
  
      // Show/hide clear completed button
      if (totalTaskCompleted !== 0) {
        this.clearCompleted.classList.add('visible');
        this.clearCompleted.classList.remove('invisible');
      } else {
        this.clearCompleted.classList.add('invisible');
      }
  
      if (tasks.length !== 0) {
        // Show todo list after adding task
        this.footerTodoList.classList.add('flex');
      }
  
      // Toggle all task status
      if ((await totalTaskCompleted) !== taskList.length || taskList.length === 0) {
        this.toggleAll.checked = false;
      } else {
        this.toggleAll.checked = true;
      }
    }
  
    /**
     * Bind add todo
     * Add event 'submit' for element form
     * @param {function} handler
     */
    bindAddTodo(handler) {
      this.addTaskForm.addEventListener('submit', (event) => {
        event.preventDefault();
  
        if (this.todoText.trim()) {
          handler(this.todoText);
          this.addTaskForm.reset();
        }
      });
    }
  
    /**
     * Bind toggle check all todo
     * Add event 'click' to select all todos
     * @param {fuction} handler
     */
    bindToggleCheckAll(handler) {
      this.toggleAll.addEventListener('click', (event) => {
        if (event.target.type === 'checkbox') {
          const isToggleAll = event.target.checked;
  
          if (isToggleAll) {
            this.showClearCompleted = true;
          }
          handler(isToggleAll);
        }
      });
    }
  
    /**
     * Bind filters todos
     * Add event 'click' to show filter todos
     * @param {fuction} handler
     */
    bindFilters(handler) {
      this.filter.forEach((button) => {
        button.addEventListener('click', (event) => {
          const selectedId = event.target.id;
          const selected = document.querySelector('.selected');
  
          selected.classList.remove('selected');
          event.target.classList.add('selected');
          handler(selectedId);
        });
      });
    }
  
    /**
     * Bind deletd all completed todos
     * Add event 'click' to delete all todos
     * @param {fuction} handler
     */
    bindDeleteAllTodo(handler) {
      this.clearCompleted.addEventListener('click', () => {
        handler();
      });
    }
  }