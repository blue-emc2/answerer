import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import firebase from 'firebase';
import React, { FC } from 'react';
import FirebaseApp from './src/FirebaseApp';
import HomeScreen from './src/components/HomeScreen';
import EntryScreen from './src/components/EntryScreen';
import AnswerScreen from './src/components/AnswerScreen';
import firebaseConfig from './firebase-config';

firebase.initializeApp(firebaseConfig);

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Entry: EntryScreen,
    Answer: AnswerScreen,
  },
  {
    initialRouteName: 'Entry',
  },
);

const AppContainer = createAppContainer(AppNavigator);

const App: FC = () => {
  return (
    <FirebaseApp>
      <AppContainer />
    </FirebaseApp>
  );
};

export default App;
