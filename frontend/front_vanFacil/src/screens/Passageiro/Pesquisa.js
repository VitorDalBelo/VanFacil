import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import MenuBar from '../Shared/MenuBar';
import CardMotorista from '../Shared/CardMotorista';

import api from '../../services/api';
import { toastApiError } from '../../helpers/toast';
import Texto from '../../components/Texto';
import { TextInput } from 'react-native-gesture-handler';
import cores from '../../../assets/cores';

export default function Pesquisa() {
   return (
      <View style={estilos.container}>
         <MenuBar nomeTela={'Pesquisa Motorista'} mostraBtnPerfil={false} />
         <ListaPesquisa />
      </View>
   );
}

function ListaPesquisa() {
   // const motoristas = useMotoristas();
   const navigation = useNavigation();
   const [listaMotoristas, setListaMotoristas] = React.useState([]);
   const [pesquisa, setPesquisa] = useState('');
   const [listaResultados, setListaResultados] = useState([]);

   const [loading, setLoading] = React.useState(false);
   const getDrivers = async () => {
      setLoading(true);
      await api
         .get('/users/drivers/search')
         .then((resp) => {
            setListaMotoristas(resp.data);
         })
         .catch((e) => {
            toastApiError(e);
         });
      setLoading(false);
   };

   React.useEffect(() => {
      getDrivers();
   }, []);

   useEffect(() => {
      if (pesquisa != '') {
         setLoading(true);
         const pesquisaNome = setTimeout(async () => {
            const motoristas = await api
               .get(`/users/drivers/search?name=${pesquisa}`)
               .then((response) => {
                  return response.data;
               })
               .finally(() => {
                  setLoading(false);
               })
               .catch((e) => {
                  toastApiError(e);
                  console.log('Erro: ' + e);
                  return null;
               });
            if (motoristas) {
               console.log('Motoristas: ', motoristas);
            } else console.log('Sem motoristas');
         }, 2000);

         return () => clearTimeout(pesquisaNome);
      }
   }, [pesquisa]);

   return (
      <View style={estilos.pesquisaContainer}>
         <View style={estilos.inputContainer}>
            <View style={estilos.linhaTexto}>
               <Texto style={estilos.textoGeral}>Pesquise o nome do(a) Motorista</Texto>
            </View>
            <TextInput style={estilos.input} value={pesquisa} onChangeText={setPesquisa} placeholder="Digite o nome do(a) Motorista" />
         </View>
         <FlatList
            style={{ flex: 1 }}
            data={listaMotoristas}
            renderItem={({ item }) => {
               return (
                  <CardMotorista
                     {...item}
                     aoPressionar={() => {
                        navigation.navigate('M_Perfil', { ...item, donoDoPerfil: false });
                     }}
                  />
               );
            }}
            keyExtractor={({ nome }) => nome}
         />
      </View>
   );
}

const estilos = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
   },
   pesquisaContainer: {
      width: '100%',
      flex: 1,
      backgroundColor: cores.branco,
   },
   inputContainer: {
      width: '100%',
      paddingHorizontal: 10,
      paddingBottom: 10,
      borderBottomColor: cores.azulProfundo,
      borderBottomWidth: 1,
   },
   linhaTexto: {
      justifyContent: 'center',
      marginVertical: 10,
   },
   textoGeral: {
      fontSize: 20,
      fontWeight: 'bold',
   },
   input: {
      height: 40,
      paddingHorizontal: 10,
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: cores.azulProfundo,
      borderRadius: 5,
      fontSize: 16,
      fontFamily: 'RubikRegular',
   },
});
