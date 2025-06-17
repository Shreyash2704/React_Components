const initialState = 0;

export function counterReducer(state = initialState, action:any) {
  switch (action.type) {
    case 'inc':
      return state + 1;
    case 'dec':
      return state - 1;
    default:
      return state;
  }
}