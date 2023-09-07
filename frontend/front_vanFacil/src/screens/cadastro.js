import React, { useState } from 'react';
import { TextInput,StyleSheet, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import cores from "../../assets/cores";
import Texto from "../components/Texto";




export default function Cadastro(){

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');


    return (
        <>
            <Texto style={estilos.textoTitulo}>{"Informações pessoais"}</Texto>
            <ScrollView style={estilos.Scroll}>

                <Texto style={estilos.textoRotulo}>{"nome completo"}</Texto>
                <TextInput 
                placeholder="nome" 
                style={estilos.textoInput} 
                value={nome}
                onChangeText={(texto) => setNome(texto)}/>

                <Texto style={estilos.textoRotulo}>{"telefone"}</Texto>
                <TextInput placeholder="11900000000" 
                style={estilos.textoInput} 
                value={telefone}
                onChangeText={(texto) => setTelefone(texto)}/>

                <Texto style={estilos.textoRotulo}>{"e-mail"}</Texto>
                <TextInput placeholder="exemplo@e-mail.com" 
                style={estilos.textoInput} 
                value={email}
                onChangeText={(texto) => setEmail(texto)}/>

                <Button title="salvar" onPress={() => console.log(nome +" "+ telefone +" "+ email)}/>
                
            </ScrollView>
            
        </>
        
    )
}

const estilos = StyleSheet.create({

    textoTitulo:{
        fontSize: 25,
        marginVertical:10,
        marginLeft:20,
    },

    Scroll:{
        marginHorizontal:10,
    },
    textoRotulo:{
        fontSize:15,
        marginBottom:2,


    },

    textoInput:{
        
        height: 40,
        marginBottom: 10,
        paddingLeft: 10,
        paddingBottom: 5,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: cores.azulProfundo ,
        textAlignVertical:'bottom',
        backgroundColor:cores.branco,
        fontSize: 20,
    }
})