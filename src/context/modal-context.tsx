import { createContext, Dispatch, ReactNode, useReducer } from 'react';

import { Action, modalReducer } from '@/reducers/modal-redurec';

import { ModalState } from '@/types';

interface ModalContextProviderProps {
  children: ReactNode;
}

interface ModalContextProps extends ModalState {
  dispatch: Dispatch<Action>;
}

const initialState: ModalState = {
  isModalOpen: false,
  title: '',
  description: '',
  action: () => {},
};

export const ModalContext = createContext<ModalContextProps>({
  ...initialState,
  dispatch: () => {},
});

export const ModalContextProvider = ({ children }: ModalContextProviderProps) => {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  return (
    <ModalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ModalContext.Provider>
  );
};
