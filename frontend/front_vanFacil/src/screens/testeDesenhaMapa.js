import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import cores from '../../assets/cores';

export default function TesteDesenhaMapa() {
   return (
      <View>
         <Ionicons name="color-palette" size={24} style={styles.img} />
      </View>
   );
}
