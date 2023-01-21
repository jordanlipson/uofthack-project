import CameraPage from './camera.js'
import { Camera, CameraType } from 'expo-camera';
import * as React from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlatButton from './shared/button.js';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome to APPNAME</Text>
      <Button
        // title="Open Camera"
        // onPress={() => navigation.navigate('Camera')}
        title="Get Started"
        onPress={() => navigation.navigate('Workouts')}
        // onPress={startCamera}
      />
    </View>
  );
}

function WorkoutsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FlatButton text='Squat' onPress={() => navigation.navigate('Camera')}/>
      <FlatButton text='Bicep Curl' onPress={() => navigation.navigate('Camera')}/>
    </View>
  )
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ title: 'Home' }} component={HomeScreen} />
        <Stack.Screen name="Workouts" component={WorkoutsScreen} />
        <Stack.Screen name="Camera" component={CameraPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});