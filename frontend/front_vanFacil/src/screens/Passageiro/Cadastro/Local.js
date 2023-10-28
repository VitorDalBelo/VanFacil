import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';

import cores from '../../../../assets/cores';
import PesquisaLocal from './PesquisaLocal';

export default function Local(props) {
   const { loading, setSelectedCampus, endereco, setEndereco, complemento, setComplemento } = props;

   const [open, setOpen] = useState(false);
   const [value, setValue] = useState(null);

   const [items, setItems] = useState([
      { label: 'Campus Barcelona', value: 1 },
      { label: 'Campus Centro', value: 2 },
      { label: 'Campus Conceição', value: 3 },
   ]);

   return (
      <View>
         <View style={{ zIndex: 10 }}>
            <DropDownPicker
               open={open}
               value={value}
               items={items}
               setOpen={setOpen}
               setValue={setValue}
               setItems={setItems}
               placeholder={'Em qual campus você estuda?'}
               style={[estilos.input, { zIndex: 1 }]}
               textStyle={estilos.textoInput}
               onChangeValue={(value) => setSelectedCampus(value)}
            />
         </View>
         <PesquisaLocal loading={loading} endereco={endereco} setEndereco={setEndereco} />
         <TextInput
            editable={!loading}
            style={[estilos.input, estilos.textoInput]}
            value={complemento}
            onChangeText={setComplemento}
            maxLength={40}
            placeholder={'Complemento'}
         />
      </View>
   );
}

const estilos = StyleSheet.create({
   input: {
      minHeight: 40,
      height: 40,
      paddingHorizontal: 10,
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: cores.azulProfundo,
      borderRadius: 5,
      marginVertical: 10,
   },
   textoInput: {
      fontSize: 16,
      fontFamily: 'RubikRegular',
   },
});
