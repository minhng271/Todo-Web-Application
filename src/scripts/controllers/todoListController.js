import { authService } from '../service/authService';

export default class TodoListController {
  constructor(modelApi, modelLocal, view) {
    this.modelApi = modelApi;
    this.modelLocal = modelLocal;

    this.filterTypeButton = 'all';

    this.setModel();
    this.view = view;

    // bind this in model
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleToggleTodo = this.handleToggleTodo.bind(this);
    this.handleUpdateTodo = this.handleUpdateTodo.bind(this);
  }

  async init() {
    // Explicit this binding
    this.renderForm();
    this.view.bindAddTodo((todoText) => {
      this.handleAddTask(todoText);
    });
    this.view.bindToggleCheckAll((isToggleAll) => {
      this.handleToggleCheckAll(isToggleAll);
    });
    this.view.bindFilters((selectedId) => {
      this.filterTypeButton = selectedId;
      this.renderForm(selectedId);
    });
    this.view.bindDeleteAllTodo(() => {
      this.handleClearCompleted();
    });
  }

  /**
   * Check the status of userId to set to receive data from localStorage or JSON server
   */
  setModel() {
    this.model = authService.isAuthenticatedUser() ? this.modelApi : this.modelLocal;
  }

  /**
   * Render board task list
   */
  async renderForm() {
    const handlers = {
      handleDeleteTask: this.handleDeleteTask,
      handleToggleTodo: this.handleToggleTodo,
      handleUpdateTodo: this.handleUpdateTodo,
    };

    const filterType = this.filterTypeButton;
    const todos = await this.model.filterModeTodos(filterType);

    this.view.showTaskActive(await this.model.countTaskActive());
    this.view.displayTaskList(todos, await this.model.countTaskCompleted(), handlers, filterType);
  }

  /**
   * Handle add task
   * @param {*} todoText task name form input
   * Add new task to data
   * Render form after add
   */
  async handleAddTask(todoText) {
    await this.model.addTodo(todoText);
    this.renderForm();
  }

  /**
   * Handle delete task
   * @param {*} id id of task selected
   * Remove selected task from data
   * Render form after delete
   */
  async handleDeleteTask(id) {
    await this.model.deleteTodo(id);
    this.renderForm();
  }

  /**
   * Handle done task
   * @param {*} id id of task selected
   * Change task completion status in data
   * Render form after toggle task
   */
  async handleToggleTodo(data) {
    await this.model.toggleTodo(data);
    this.renderForm();
  }

  /**
   * Handle update content after edit
   * @param {*} id id of task selected
   * @param {*} newTaskName new name from input
   * Update task name of task selected after edit
   * Render form after edit task
   */
  async handleUpdateTodo(data) {
    await this.model.updateTodo(data);
    this.renderForm();
  }

  /**
   * Handle toggle all tasks
   * @param {*} isToggleAll status of toggleAll button
   * Change the state of the entire task in the data based on the state of the toggle all button
   * Render form after change all status
   */
  async handleToggleCheckAll(isToggleAll) {
    await this.model.toggleCheckAll(isToggleAll);
    this.renderForm();
  }

  /**
   * Handle clear task completed
   * Delete all tasks with completed status in data
   * Render form after delete all task completed
   */
  async handleClearCompleted() {
    await this.model.deleteCompletedTodos();
    this.renderForm();
  }
}