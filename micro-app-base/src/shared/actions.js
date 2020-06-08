import { initGlobalState } from 'qiankun';

const initialState = {
  token: '',
};
const actions = initGlobalState(initialState);

export default actions;
