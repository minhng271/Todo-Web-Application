/* eslint-disable class-methods-use-this */
import { hideElement } from '../helpers/elementHelpers';
import KEY_ENTER from '../constants/keypress';

export default class TodoItemView {
  constructor() {
    this.todoList = document.getElementsByClassName('todo-list');
    this.addTaskForm = document.getElementsByClassName('add-task');
    this.inputTaskName = document.getElementsByClassName('input-add-task');
  }

  /**
   * Render a task view
   * @param {object} task
   *
   * @returns task <li> element
   */
  renderTask(task) {
    const templateTask = document.createElement('li');

    templateTask.id = `${task.id}`;
    templateTask.className = 'task';

    templateTask.innerHTML = `
      <div class="view-mode">
        <input
          class="toggle"
          id="${task.id}-toggle"
          type="checkbox" ${task.isCompleted ? 'checked' : ''}
        />
        <label for="${task.id}-toggle"></label>
        <p>${task.taskName}</p>
        <button type="button" class="btn btn-close"></button>
      </div>
    `;

    return templateTask;
  }

  /**
   * Bind delete todo
   * Add event 'click' for todoList element
   * @param {function} handler
   */
  bindDeleteTodo(task, handler, filterType) {
    const taskSelected = document.getElementById(`${task.id}`);
    const deleteButton = taskSelected.querySelector('.btn-close');

    deleteButton.addEventListener('click', () => {
      handler(task.id, filterType);
    });
  }

  /**
   * Bind toggle todo
   * Add event 'click' for todoList element
   * @param {function} handler
   */
  bindToggleTodo(task, handler, filterType) {
    const taskSelected = document.getElementById(`${task.id}`);
    const toggleButton = taskSelected.querySelector('.toggle');

    toggleButton.addEventListener('change', () => {
      const data = {
        id: taskSelected.id,
        isCompleted: taskSelected.querySelector('input').checked,
        taskName: taskSelected.querySelector('p').textContent,
      };

      handler(data, filterType);
    });
  }

  /**
   * Bind edit task todo
   * Get data after edit task name
   * @param {fuction} handler
   */
  bindEditTodo(task, handler, filterType) {
    const taskSelected = document.getElementById(`${task.id}`);
    const taskName = taskSelected.querySelector('.view-mode');

    taskName.addEventListener('dblclick', () => {
      // Create an input box for the selected task to edit
      const input = document.createElement('input');

      input.classList.add('edit');
      // Hide the task content of the selected task
      hideElement(taskName);

      // Insert the generated input element into the hidden task position
      taskSelected.insertBefore(input, taskName);

      input.focus();
      input.value = taskName.querySelector('p').innerHTML;

      // Get data from input
      input.onchange = (e) => {
        const newTaskName = e.target.value;

        this.updateTodo(taskSelected, handler, newTaskName, filterType);
      };

      this.updateTodo(taskSelected, handler, input.value, filterType);
    });
  }

  /**
   * Bind update todos
   * Add event 'double click' for todoList element
   * @param {fuction} handler
   */
  updateTodo(taskSelected, handler, newTaskName, filterType) {
    const inputElement = document.querySelector('.edit');
    const data = {
      id: taskSelected.id,
      isCompleted: taskSelected.querySelector('input').checked,
      taskName: newTaskName,
    };

    inputElement.addEventListener('blur', () => {
      handler(data, filterType);
      this.contentEdit = '';
    });

    inputElement.addEventListener('keypress', (event) => {
      if (event.key === KEY_ENTER) {
        handler(data, filterType);
        this.contentEdit = '';
      }
    });
  }
}