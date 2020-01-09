import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import {
  NavigationStackProp,
  NavigationStackScreenComponent,
} from 'react-navigation-stack';
import { TextInput } from 'react-native-gesture-handler';

type Props = {
  navigation: NavigationStackProp;
  name: string;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  input: {
    height: 128,
    borderColor: 'gray',
    borderWidth: 1,
    width: 256,
    marginVertical: 8,
  },
});

const AnswerScreen: NavigationStackScreenComponent<Props> = () => {
  const [value, onChangeText] = useState('');
  const [editable, setEditable] = useState(true);

  return (
    <View style={styles.container}>
      <Text>ここに問題文を表示する</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={text => onChangeText(text)}
        multiline
        editable={editable}
      />
      <Button title="送信" onPress={() => setEditable(false)} />
      <Button title="やり直す" onPress={() => setEditable(true)} />
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
