import React, { useState, useRef, useContext } from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  NavigationStackProp,
  NavigationStackScreenComponent,
} from 'react-navigation-stack';
import FirebaseContext from '../contexts';

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
  const [loading, setLoading] = useState(false);
  const [value, onChangeText] = useState('');
  const functionsRef = useRef(useContext(FirebaseContext));
  const { f } = functionsRef.current;
  if (!f) throw new Error('Functions is not initialized');
  const questionFunction = f.httpsCallable('question');
  const entry = f.httpsCallable('entry');

  const handlePress = async (name: string) => {
    const trimedName = name.trim();
    if (!trimedName) {
      Alert.alert('名無しはやめてください');

      return;
    }

    setLoading(true);
    try {
      const question = await questionFunction().then(result => {
        return result.data;
      });

      await entry({ name: trimedName }).then(() => {
        navigation.navigate('Answer', { name: value, question });
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.info(err.name, ' ', err.message, ' ', trimedName);
      Alert.alert(err.name, err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ハンドルネームを入力</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={text => onChangeText(text)}
        returnKeyType="done"
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="参加する" onPress={() => handlePress(value)} />
      )}
    </View>
  );
};

EntryScreen.navigationOptions = () => {
  return {
    gestureEnabled: false,
  };
};

export default EntryScreen;
