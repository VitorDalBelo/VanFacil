import React , {useState} from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import {auth} from '../../configs/FireBaseConfigs'

import Cores from '../../assets/cores';

export default function Login() {
   const [email, setEmail] = useState();
   const [password,setPassword] = useState('');
   const [loading,setLoading] = useState(false);
   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.exemplo}>
            <TextInput style={styles.input} onChangeText={setEmail} value={email} />
         </View>
      </SafeAreaView>
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
   container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      //justifyContent: 'center',
   },
});
