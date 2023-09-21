import React from 'react';
import { StyleSheet, Modal, View, TouchableOpacity } from 'react-native';

import cores from '../../assets/cores';
import Texto from './Texto';

export default function ModalConfirmacao({ visible, confirmar, cancelar }) {
   return (
      <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={cancelar}>
         <View style={modal.overlay}>
            <View style={modal.caixaCentral}>
               <View style={modal.titleContainer}>
                  <Texto style={modal.titulo}>Confirmação</Texto>
               </View>
               <Texto>Deseja apagar o desenho e os pontos?</Texto>
               <View style={modal.linhaBotoes}>
                  <TouchableOpacity style={[modal.button, modal.btnConfirmar]} onPress={confirmar}>
                     <Texto style={modal.buttonText}>Confirmar</Texto>
                  </TouchableOpacity>
                  <TouchableOpacity style={[modal.button, modal.btnCancelar]} onPress={cancelar}>
                     <Texto style={modal.buttonText}>Cancelar</Texto>
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      </Modal>
   );
}

const modal = StyleSheet.create({
   overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
   },
   caixaCentral: {
      width: 310,
      backgroundColor: cores.branco,
      borderRadius: 10,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: cores.cinzaClaro,
   },
   titleContainer: {
      alignItems: 'center',
      backgroundColor: cores.cinzaClaro,
      padding: 10,
      borderTopLeftRadius: 9,
      borderTopRightRadius: 9,
      width: '100%',
      marginBottom: 10,
   },
   titulo: {
      fontSize: 22,
      fontWeight: 'bold',
   },
   texto: {
      fontSize: 16,
      marginBottom: 20,
   },
   textoPrincipal: {
      fontSize: 16,
      marginBottom: 20,
      fontWeight: 'bold',
   },
   linhaBotoes: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   button: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 5,
      margin: 10,
   },
   buttonText: {
      color: cores.branco,
      fontWeight: 'bold',
   },
   btnConfirmar: {
      backgroundColor: cores.azul,
      marginRight: 10,
      alignSelf: 'flex-start',
   },
   btnCancelar: {
      backgroundColor: cores.vermelho,
      marginLeft: 10,
      alignSelf: 'flex-end',
   },
});
