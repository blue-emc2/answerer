import React from 'react';
import { View, Text, Button } from 'react-native';
import {
  NavigationStackProp,
  NavigationStackScreenComponent,
} from 'react-navigation-stack';

type Props = {
  navigation: NavigationStackProp;
  name: string;
};

const AnswerScreen: NavigationStackScreenComponent<Props> = ({
  navigation,
}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Answer Screen</Text>
      <Button title="送信" onPress={() => navigation.navigate('Answer')} />
    </View>
  );
};

AnswerScreen.navigationOptions = ({ navigation }) => {
  const name = navigation.getParam('name');

  return {
    title: name,
    gestureEnabled: false,
  };
};

export default AnswerScreen;
