import React from 'react';
import { FlatList } from 'react-native';
import useRotas from '../../../hooks/useRotas';

import CardRota from '../../Shared/Inicial/CardRota';

export default function ListaRotas({ telaMotorista = true }) {
   const rotas = useRotas();
   return (
      <FlatList
         data={rotas}
         renderItem={({ item }) => {
            return <CardRota {...item} telaMotorista={telaMotorista} />;
         }}
         keyExtractor={({ nome }) => nome}
      />
   );
}
