import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function GoBackButton({ style }) {
  const navigation = useNavigation();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });

    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={style ? style : estilo.default}
    >
      {keyboardVisible ? null : (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={40} color="white" />
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
}

const estilo = StyleSheet.create({
  default: {
    position: "absolute",
    left: 20,
    top: 25,
    backgroundColor: "#2297ef",
    borderRadius: 10
  },
});
