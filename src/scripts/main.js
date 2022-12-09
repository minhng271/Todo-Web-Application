// import todo list file
import TodoItemView from './views/todoItemView';
import TodoListView from './views/todoListView';
import TodoListModelApi from './models/todoListModelApi';
import TodoListModelLocal from './models/todoListModelLocal';
import TodoListController from './controllers/todoListController';

import AuthenticationModel from './models/authenticationModel';
import AuthenticationView from './views/authenticationView';
import AuthenticationController from './controllers/authenticationControllers';

const todoListModelApi = new TodoListModelApi();
const todoListModelLocal = new TodoListModelLocal();
const authenticationModel = new AuthenticationModel();

const todoItemView = new TodoItemView();
const todoListView = new TodoListView(todoItemView);
const authenticationView = new AuthenticationView();

const todoListController = new TodoListController(
  todoListModelApi,
  todoListModelLocal,
  todoListView
);
const authenticationUser = new AuthenticationController(authenticationModel, authenticationView);

authenticationUser.init(() => {
  todoListController.setModel();
  todoListController.renderForm();
});
todoListController.init();