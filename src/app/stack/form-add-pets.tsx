import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FormScreen = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    console.log('FormScreen renderizado');
  }, []);

  const navigation = useNavigation();

  const handleSubmit = () => {
    // Aqui você pode adicionar a lógica para salvar os dados do pet
    console.log('Dados do pet:', { name, type, breed, age, location });
    // Após salvar, volte para a tela anterior
    navigation.goBack();
  };

  return (
    <ScrollView className='flex-1 bg-white'>
      <View className='px-8 py-10'>
        <Text className='text-2xl font-bold mb-6'>Adicionar novo PET</Text>

        <View className='mb-4'>
          <Text className='text-gray-700 mb-2'>Nome do PET</Text>
          <TextInput
            className='border border-gray-300 rounded-md p-2'
            value={name}
            onChangeText={setName}
            placeholder='Digite o nome do PET'
          />
        </View>

        <View className='mb-4'>
          <Text className='text-gray-700 mb-2'>Tipo de animal</Text>
          <TextInput
            className='border border-gray-300 rounded-md p-2'
            value={type}
            onChangeText={setType}
            placeholder='Ex: Cachorro, Gato, etc.'
          />
        </View>

        <View className='mb-4'>
          <Text className='text-gray-700 mb-2'>Raça</Text>
          <TextInput
            className='border border-gray-300 rounded-md p-2'
            value={breed}
            onChangeText={setBreed}
            placeholder='Digite a raça do PET'
          />
        </View>

        <View className='mb-4'>
          <Text className='text-gray-700 mb-2'>Idade</Text>
          <TextInput
            className='border border-gray-300 rounded-md p-2'
            value={age}
            onChangeText={setAge}
            placeholder='Digite a idade do PET'
            keyboardType='numeric'
          />
        </View>

        <View className='mb-6'>
          <Text className='text-gray-700 mb-2'>Localização</Text>
          <TextInput
            className='border border-gray-300 rounded-md p-2'
            value={location}
            onChangeText={setLocation}
            placeholder='Digite a localização do PET'
          />
        </View>

        <TouchableOpacity
          className='bg-[#697F89] p-5 rounded-full w-full'
          onPress={handleSubmit}
        >
          <Text className='text-white font-bold text-center text-lg'>
            Salvar PET
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default FormScreen;
