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
});

// わかりにくいけどNavigationStackScreenComponent typeがfunction componentを合成している
const EntryScreen: NavigationStackScreenComponent<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>ハンドルネームを入力</Text>
      <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} />
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
