import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/components/HomeScreen';

const AppNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
});

const App = createAppContainer(AppNavigator);

export default App;
