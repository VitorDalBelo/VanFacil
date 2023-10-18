import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

import Texto from '../../components/Texto';
import toast from '../../helpers/toast';

import cores from '../../../assets/cores';

export default function BotoesIdaVolta({userAbsences,onConfirm}) {

   const [vai,setVai] = useState( userAbsences ? userAbsences.go : true);
   const [volta,setVolta ] = useState(userAbsences ? userAbsences.back : true);

   const estilosSwitch = funcaoEstilo(vai, volta);

   const [modalVisible, setModalVisible] = useState(false);
   const [idaOuVolta, defineIdaOuVolta] = useState(true);

   useEffect(()=>{
      setVai(userAbsences ? userAbsences.go : true);
      setVolta(userAbsences ? userAbsences.back : true);
   },[userAbsences])

   const mostrarModal = () => {
      defineMensagem(idaOuVolta);
      setModalVisible(true);
   };

   const defineMensagem = (ida) => {
      var texto = '';
      if (ida) {
         texto = !vai ? 'vai' : 'não vai';
      } else {
         texto = !volta ? 'volta' : 'não volta';
      }
      return texto;
   };

   const confirmar = (ida) => {
      const go = ida ? !vai : vai;
      const back = ida ? volta : !volta; 
      onConfirm(go,back)
      setModalVisible(false);
   };

   const cancelar = () => {
      setModalVisible(false);
   };
   return (
      <View>
         <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={cancelar}>
            <View style={modal.overlay}>
               <View style={modal.caixaCentral}>
                  <View style={modal.titleContainer}>
                     <Texto style={modal.titulo}>Confirmação</Texto>
                  </View>
                  <TextoMensagem textoPrincipal={defineMensagem(idaOuVolta)} />
                  <View style={modal.linhaBotoes}>
                     <TouchableOpacity style={[modal.button, modal.btnConfirmar]} onPress={() => confirmar(idaOuVolta)}>
                        <Texto style={modal.buttonText}>Confirmar</Texto>
                     </TouchableOpacity>
                     <TouchableOpacity style={[modal.button, modal.btnCancelar]} onPress={cancelar}>
                        <Texto style={modal.buttonText}>Cancelar</Texto>
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
         </Modal>

         <View style={estilos.linhaBotao}>
            <TouchableOpacity
               style={[estilos.botao, estilosSwitch.botaoIda]}
               onPress={() => {
                  mostrarModal();
                  defineIdaOuVolta(true);
               }}
            >
               <Texto style={estilos.textoBotao}>{vai ? 'Vou' : 'Não vou'}</Texto>
            </TouchableOpacity>
            <TouchableOpacity
               style={[estilos.botao, estilosSwitch.botaoVolta]}
               onPress={() => {
                  mostrarModal();
                  defineIdaOuVolta(false);
               }}
            >
               <Texto style={estilos.textoBotao}>{volta ? 'Volto' : 'Não volto'}</Texto>
            </TouchableOpacity>
         </View>
      </View>
   );
}

function TextoMensagem({ textoPrincipal }) {
   return (
      <View style={{ flexDirection: 'row' }}>
         <Texto style={modal.texto}>Confirmar que </Texto>
         <Texto style={modal.textoPrincipal}>{textoPrincipal}</Texto>
         <Texto style={modal.texto}> de van hoje?</Texto>
      </View>
   );
}

const funcaoEstilo = (vai, volta) =>
   StyleSheet.create({
      botaoIda: {
         backgroundColor: vai ? cores.azul : cores.vermelho,
      },
      botaoVolta: {
         backgroundColor: volta ? cores.azul : cores.vermelho,
      },
   });

const estilos = StyleSheet.create({
   linhaBotao: {
      backgroundColor: cores.cinzaClaro,
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 20,
   },
   botao: {
      width: '48%',
      alignSelf: 'flex-start',
      alignItems: 'center',
      padding: 10,
      borderRadius: 10,
      backgroundColor: cores.azulProfundo,
      color: cores.preto,
      marginVertical: 10,

      // Android
      elevation: 4,

      //iOS
      shadowColor: '#000',
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
   },
   textoBotao: {
      color: cores.branco,
      fontWeight: 'bold',
      fontSize: 18,
      lineHeight: 30,
   },
});

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
