import { createContext } from 'react';

type FirebaseContextValue = {
  f: firebase.functions.Functions | null;
};

const FirebaseContext = createContext<FirebaseContextValue>({
  f: null,
});

export default FirebaseContext;
