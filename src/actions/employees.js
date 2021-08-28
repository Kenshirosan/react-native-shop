import axios from 'axios';
import { setAlert } from './alert';
import { GET_EMPLOYEES, EMPLOYEE_UPDATED } from './types';
import { loadUser } from './auth';

export const getEmployees = () => async dispatch => {
  try {
    const res = await axios.get('/api/users/employees');
    console.log(res);
    dispatch({
      type: GET_EMPLOYEES,
      payload: res.data,
    });
  } catch (e) {
    console.log(e.response);
    dispatch(setAlert(e.response.data.errors[0].msg, 'error'));
  }
};

export const updateEmployee = formData => async dispatch => {
  try {
    await axios.patch('/api/users/update/employees', formData);

    dispatch(loadUser());

    dispatch(setAlert('utilisateur a jour !', 'success'));
  } catch (e) {
    dispatch(setAlert(e.response.data.errors[0].msg, 'error'));
  }
};

export const assignRoleToUser = formData => async dispatch => {
  try {
    const res = await axios.post('/api/users/role', formData);

    const user = res.data.user;
    // Ajouter cet user au state
    dispatch({
      type: EMPLOYEE_UPDATED,
      payload: user,
    });

    dispatch(setAlert('Rôle attribué avec succès !', 'success'));
  } catch (e) {
    dispatch(setAlert(e.response.data.errors[0].msg, 'error'));
  }
};
