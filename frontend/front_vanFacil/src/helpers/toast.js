import Toast from 'react-native-root-toast';

const successMessageStyle = {
   backgroundColor: '#1f6334',
   textColor: '#FFFFFF',
   duration: 3000,
   position: Toast.positions.TOP,
   opacity: 1,
};

const errorMessageStyle = { backgroundColor: '#B40000', textColor: '#FFFFFF', duration: 3000, position: Toast.positions.TOP, opacity: 1 };

export default function toast(message, type) {
   if (type === 'success') {
      console.log("deu certo",message)
       Toast.show(message, successMessageStyle);
   }
   if (type === 'error') return Toast.show(message, errorMessageStyle);
}

export function toastApiError(err) {
   const errorMsg = err ? err.response?.data?.message : false;
   if (errorMsg) Toast.show(errorMsg, errorMessageStyle);
   else Toast.show('Ocorreu um erro!', errorMessageStyle);
}
