// import RNFS from 'react-native-fs';
// import Toast from 'react-native-toast-message';

// // * Interface
// interface IFormData {
//   sex: string;
//   age: number;
//   name: string;
//   image: string;
//   weight: string;
//   isLost: boolean;
//   location: string;
//   category: string;
//   isAdoption: boolean;
//   description: string;
//   contactInfo: {
//     name: string;
//     email: string;
//     phone: string;
//   };
// }

// const copyFileToDevice = async () => {
//   const sourcePath = RNFS.MainBundlePath + '/src/data/pets-data/pets/pets.json';
//   const destinationPath = RNFS.DocumentDirectoryPath + '/pets.json';

//   try {
//     const fileSourceExists = await RNFS.exists(sourcePath);
//     if (!fileSourceExists) {
//       console.error('Arquivo de origem não encontrado:', sourcePath);
//       return;
//     }
//     const fileExists = await RNFS.exists(destinationPath);
//     if (!fileExists) {
//       await RNFS.copyFile(sourcePath, destinationPath);
//       console.log('Arquivo copiado com sucesso!');
//     }
//   } catch (error) {
//     console.error('Erro ao copiar o arquivo:', error);
//   }
// };

// const handleSubmit = async (formData: IFormData, navigation: any) => {
//   try {
//     if (
//       !formData.name ||
//       !formData.location ||
//       !formData.contactInfo.email ||
//       !formData.contactInfo.phone
//     ) {
//       Toast.show({
//         text1: 'Erro',
//         text2: 'Por favor, preencha todos os campos obrigatórios',
//         type: 'error',
//       });
//       return;
//     }

//     await copyFileToDevice();

//     const filePath = RNFS.DocumentDirectoryPath + '/pets.json';

//     const existingPetsJson = await RNFS.readFile(filePath, 'utf8').catch(
//       () => '[]'
//     );
//     const existingPets = JSON.parse(existingPetsJson);

//     const newPet = {
//       ...formData,
//       id: existingPets.length + 1,
//     };

//     const updatedPets = [...existingPets, newPet];

//     await RNFS.writeFile(filePath, JSON.stringify(updatedPets), 'utf8');

//     Toast.show({
//       text1: 'Pet adicionado com sucesso!',
//       type: 'success',
//     });

//     navigation.goBack();
//   } catch (error) {
//     console.error('Erro ao salvar pet:', error);

//     Toast.show({
//       text1: 'Erro',
//       text2: 'Ocorreu um erro ao salvar o pet',
//       type: 'error',
//     });
//   }
// };

// export { copyFileToDevice, handleSubmit };
