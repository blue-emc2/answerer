import React, { useState, useRef, useContext } from 'react';
import {
  View,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Text,
} from 'react-native';
import {
  NavigationStackProp,
  NavigationStackScreenComponent,
} from 'react-navigation-stack';
import { TextInput } from 'react-native-gesture-handler';
import FirebaseContext from '../contexts';

type Props = {
  navigation: NavigationStackProp;
  name: string;
  question: string;
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

const AnswerScreen: NavigationStackScreenComponent<Props> = ({
  navigation,
}) => {
  const question = navigation.getParam('question');
  const [loading, setLoading] = useState(false);
  const [value, onChangeText] = useState('');
  const [editable, setEditable] = useState(true);
  const functionsRef = useRef(useContext(FirebaseContext));
  const { f } = functionsRef.current;
  if (!f) throw new Error('Functions is not initialized');

  const handlePress = (name: string, answer: string) => {
    setEditable(false);
    setLoading(true);

    const addAnswer = f.httpsCallable('addAnswer');
    addAnswer({ name, answer })
      .then(result => {
        return result.data;
      })
      .catch((err: Error) => {
        // eslint-disable-next-line no-console
        console.error(err.name, ' ', err.message, ' ', name);
        Alert.alert(err.name, err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text>{question}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={text => onChangeText(text)}
        multiline
        editable={editable}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Button
            title="送信"
            onPress={() =>
              handlePress(navigation.getParam('name', 'hoge'), value)
            }
          />
          <Button title="やり直す" onPress={() => setEditable(true)} />
        </>
      )}
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
