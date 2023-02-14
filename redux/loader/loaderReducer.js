import { HIDE_LOADER, SHOW_LOADER } from "./loaderActions";


const initialState = false;

const loaderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_LOADER:
      return true;
    case HIDE_LOADER:
      return false;
    default:
      return state;
  }
}

export default loaderReducer;