import FundoRota1 from '../../assets/teste/GradientBackground1.png';
import FundoRota2 from '../../assets/teste/GradientBackground2.png';
import Gataruga from '../../assets/teste/Gataruga.png';
import Espaço from '../../assets/teste/Espaço.png';
import Haingrindi from '../../assets/teste/Haingrindi.png';
import ImagemFalha from '../../assets/icon.png';

const Rotas = {
   lista1: [
      {
         imagem: FundoRota1,
         nome: 'USCS - Manhã',
      },
      {
         imagem: FundoRota2,
         nome: 'USCS - Noite',
      },
      {
         imagem: ImagemFalha,
         nome: 'AAAA',
      },
   ],
   lista2: [
      {
         imagem: Espaço,
         nome: 'Rota espacial',
      },
      {
         imagem: Gataruga,
         nome: 'Rota do Gataruga',
      },
      {
         imagem: Haingrindi,
         nome: 'Rota do bruxo',
      },
   ],
};

export default Rotas;
