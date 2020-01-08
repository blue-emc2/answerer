import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/components/HomeScreen';
import EntryScreen from './src/components/EntryScreen';
import AnswerScreen from './src/components/AnswerScreen';

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

const App = createAppContainer(AppNavigator);

export default App;
