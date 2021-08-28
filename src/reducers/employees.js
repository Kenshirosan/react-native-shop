import { GET_EMPLOYEES, EMPLOYEE_UPDATED } from '../actions/types';
/**
 *
 * @type {{employees: *[]}}
 */
const initialState = {
  employees: [],
};

export default function employees(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EMPLOYEES:
      return {
        ...state,
        employees: payload,
      };
    case EMPLOYEE_UPDATED:
      return {
        ...state,
        employees: state.employees.map(user =>
          user.id === payload.id ? payload : user
        ),
      };
    default:
      return state;
  }
}
