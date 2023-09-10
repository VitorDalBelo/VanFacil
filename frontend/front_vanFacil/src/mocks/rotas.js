import FundoRota1 from '../../assets/teste/GradientBackground1.png';
import FundoRota2 from '../../assets/teste/GradientBackground2.png';
import ImagemFalha from '../../assets/icon.png';

import passageiros from './passageiros';
import motoristas from './motoristas';

const Rotas = [
   {
      id: 1,
      imagem: FundoRota1,
      nome: 'USCS - Manhã',
      motorista: motoristas[0],
      passageiros: [passageiros[0], passageiros[1], passageiros[2], passageiros[3], passageiros[4], passageiros[5], passageiros[6]],
      ativa: true,
   },
   {
      id: 2,
      imagem: FundoRota2,
      nome: 'USCS - Noite',
      motorista: motoristas[1],
      passageiros: [passageiros[4], passageiros[5], passageiros[6], passageiros[7], passageiros[8], passageiros[9], passageiros[10]],
      ativa: true,
   },
   {
      id: 3,
      imagem: ImagemFalha,
      nome: 'Algo deu errado',
      motorista: motoristas[1],
      passageiros: [passageiros[4], passageiros[5], passageiros[6], passageiros[7], passageiros[8], passageiros[9], passageiros[10]],
      ativa: false,
   },
];

export default Rotas;
