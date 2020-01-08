import React from 'react';
import { Text, View, Button } from 'react-native';
import {
  NavigationStackProp,
  NavigationStackScreenComponent,
} from 'react-navigation-stack';

type Props = {
  navigation: NavigationStackProp;
};

// わかりにくいけどNavigationStackScreenComponent typeがfunction componentを合成している
const EntryScreen: NavigationStackScreenComponent<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Entry Screen</Text>
      <Button
        title="Go to Answer"
        onPress={() => navigation.navigate('Answer')}
      />
    </View>
  );
};

EntryScreen.navigationOptions = () => {
  return {
    title: 'Profile',
    gestureEnabled: false,
  };
};

export default EntryScreen;
