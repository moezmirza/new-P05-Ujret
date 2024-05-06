import React from 'react';
import {View, Button} from 'react-native';

export default function Extra() {
  // Function to be called when the button is pressed
  const handleButtonPress = () => {
    // Call your function here and log its return data
    const returnData = myFunction();
    console.log(returnData);
  };

  // Function whose return data you want to log
  const myFunction = () => {
    // Replace this with your actual function logic
    return 'Hello, world!';
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Press Me" onPress={handleButtonPress} />
    </View>
  );
}
