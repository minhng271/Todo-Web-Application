import { TODOS_URL, USERS_URL } from '../constants/api';
import { API_MSG } from '../constants/messages';

/**
 * Get all data of users from JSON server
 * @param {string} url
 * @param {number} id
 *
 * @returns {{object} || raise {error}}
 */

export const getUserById = async (id) => {
  try {
    const response = await fetch(`${USERS_URL}?userID=${id}`);

    return await response.json();
  } catch (error) {
    console.error(API_MSG.GET + error);
    throw error;
  }
};

/**
 * Get data of user from JSON server by mail
 * @param {string} url
 * @param {number} id
 *
 * @returns {{object} || raise {error}}
 */

export const getUserByMail = async (mail) => {
  try {
    const response = await fetch(`${USERS_URL}?mail=${mail}`);

    return await response.json();
  } catch (error) {
    console.error(API_MSG.GET + error);
    throw error;
  }
};

/**
 * Get all data of users from JSON server
 * @param {string} url
 * @param {number} id
 *
 * @returns {{object} || raise {error}}
 */

export const getTasksByUser = async (id) => {
  try {
    const response = await fetch(`${TODOS_URL}?userID=${id}`);

    return await response.json();
  } catch (error) {
    console.error(API_MSG.GET + error);
    throw error;
  }
};

/**
 * Get task from JSON server by id
 * @param {string} url
 * @param {number} id
 *
 * @returns {{object} || raise {error}}
 */

export const getTasksById = async (id) => {
  try {
    const response = await fetch(`${TODOS_URL}/${id}`);

    return await response.json();
  } catch (error) {
    console.error(API_MSG.GET + error);
    throw error;
  }
};

/**
 * Add new task to JSON server
 * @param {object} data
 */
export const create = async (data) => {
  try {
    await fetch(TODOS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(API_MSG.POST + error);
    throw error;
  }
};

/**
 * Update data tasks with specific id in database
 * @param {object} data
 * @param {number} id
 */
export const update = async (id, data) => {
  try {
    await fetch(`${TODOS_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(API_MSG.PATCH + error);
    throw error;
  }
};

/**
 * Delete data tasks with specific id in database
 * @param {object} data
 * @param {number} id
 */
export const remove = async (id) => {
  try {
    await fetch(`${TODOS_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(API_MSG.DELETE + error);
    throw error;
  }
};