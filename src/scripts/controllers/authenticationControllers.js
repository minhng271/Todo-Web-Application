import { authService } from '../service/authService';

export default class AuthenticationController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  init(handlerRender) {
    this.handlerRender = handlerRender;
    this.view.bindOpenLoginForm();
    this.view.bindCloseLoginForm();
    this.view.showHideStatus();

    // Login
    this.view.bindLogin(this.onLogin);

    // Logout
    this.view.bindLogout(this.onLogout);
  }

  /**
   * Handle login
   * @param {string} email
   * @param {string} password
   * Check user existence to perform actions
   */
  async onLogin(email, password) {
    const result = await this.model.login(email, password);

    if (result) {
      this.view.showMessageLogin(true);
      this.view.closeLoginForm();
      this.view.showHideStatus();
      this.handlerRender();
    } else {
      this.view.login.reset();
      this.view.showMessageLogin(false);
    }
  }

  /**
   * Handle logout
   * Remove auth id from localStorage
   * Render form
   */
  async onLogout() {
    authService.removeUser();
    await this.handlerRender();
  }
}