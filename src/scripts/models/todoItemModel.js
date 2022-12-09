export default class TodoItemModel {
    constructor(todoAdded) {
      const { id, taskName, isCompleted } = todoAdded;
      this.id = id;
      this.taskName = taskName;
      this.isCompleted = isCompleted;
    }
  }