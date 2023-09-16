import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

const MenuCard = ({ title, onTap, enabled }) => {
   return (
      <TouchableOpacity style={styles.button} onPress={onTap}>
         <View
            style={[
               styles.view,
               {
                  backgroundColor: enabled ? 'green' : 'orange',
               },
            ]}
         >
            <Feather name="palette" style={styles.img} />
         </View>
         <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
   );
};

export default MenuCard;

const styles = StyleSheet.create({
   view: {
      height: 40,
      width: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 16,
   },
   title: {
      color: '#241f1f',
      fontSize: 14,
      marginTop: 8,
      fontWeight: '500',
   },
   button: {
      flexDirection: 'column',
      alignItems: 'center',
   },
   img: {
      height: 24,
      width: 24,
      tintColor: 'white',
   },
});
