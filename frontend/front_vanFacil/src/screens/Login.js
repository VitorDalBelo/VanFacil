import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import Cores from '../../assets/cores';

export default function Login() {
   const [text, onChangeText] = React.useState('Useless Text');
   const [number, onChangeNumber] = React.useState('');

   return (
      <View style={styles.exemplo}>
         <TextInput style={styles.input} onChangeText={onChangeText} value={text} />
         <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="useless placeholder"
            keyboardType="default"
         />
      </View>
   );
}

const styles = StyleSheet.create({
   input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
   },
   exemplo: {
      backgroundColor: Cores.gelo,
   },
});
