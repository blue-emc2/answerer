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
import firebase from 'firebase';
import FirebaseContext from '../contexts';
import { globalStyles } from '../styles';

type Props = {
  navigation: NavigationStackProp;
};

const styles = StyleSheet.create({
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
      firebase
        .auth()
        .signInAnonymously()
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // eslint-disable-next-line no-console
          console.error('errorCode', errorCode, 'errorMessage', errorMessage);
          Alert.alert('認証でエラーが発生しました');
        });

      const question = await questionFunction().then(result => {
        return result.data;
      });

      await entry({ name: trimedName }).then(result => {
        navigation.navigate('Answer', {
          name: value,
          question,
          id: result.data,
        });
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
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>ハンドルネームを入力</Text>
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
    title: 'エントリー',
    gestureEnabled: false,
  };
};

export default EntryScreen;
