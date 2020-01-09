import React from 'react';
import { Text, View, Button, TextInput, StyleSheet } from 'react-native';
import {
  NavigationStackProp,
  NavigationStackScreenComponent,
} from 'react-navigation-stack';

type Props = {
  navigation: NavigationStackProp;
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
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 128,
    marginVertical: 8,
  },
});

// わかりにくいけどNavigationStackScreenComponent typeがfunction componentを合成している
const EntryScreen: NavigationStackScreenComponent<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ハンドルネームを入力</Text>
      <TextInput style={styles.input} />
      <Button
        title="答える"
        onPress={() => navigation.navigate('Answer', { name: 'Brent' })}
      />
    </View>
  );
};

EntryScreen.navigationOptions = () => {
  return {
    gestureEnabled: false,
  };
};

export default EntryScreen;