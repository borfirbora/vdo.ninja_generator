'use client'; // Bu dosyanın bir Client Component olduğunu belirtir

import { Provider } from 'react-redux';
import store from './store'; // Oluşturduğunuz store'u içe aktarın

export function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}