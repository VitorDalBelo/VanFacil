import React from "react";
import { Button, StyleSheet } from "react-native";
import { useNavigation} from "@react-navigation/native";

export default function TesteNavegação(){

    const navigation = useNavigation();

    return(
        <>
        <Button style={estilo.btn} title="Motorista" onPress={() => navigation.navigate('M_Inicial')}/>
        <Button style={estilo.btn} title="passageiro" onPress={() => navigation.navigate('P_Inicial')}/>
        </>
    )
}

const estilo = StyleSheet.create({

    btn:{
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
    }
})