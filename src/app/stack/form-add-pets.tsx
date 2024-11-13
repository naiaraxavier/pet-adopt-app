// * React Native
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

// * Icons
import { Ionicons } from '@expo/vector-icons';

// * Components and Helpers
import Toast from 'react-native-toast-message';
import { Picker } from '@react-native-picker/picker';
// import { copyFileToDevice } from '@/src/data/helpers/saveData';

interface PetFormData {
  sex: string;
  age: number;
  name: string;
  image: string;
  weight: string;
  isLost: boolean;
  location: string;
  category: string;
  isAdoption: boolean;
  description: string;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

const FormScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState<PetFormData>({
    name: '',
    location: '',
    image: '',
    isLost: false,
    isAdoption: true,
    category: 'Gato',
    description: '',
    weight: '',
    sex: 'Macho',
    age: 0,
    contactInfo: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const handleSubmit = async () => {
    try {
      if (
        !formData.name ||
        !formData.location ||
        !formData.contactInfo.email ||
        !formData.contactInfo.phone
      ) {
        Toast.show({
          text1: 'Erro',
          text2: 'Por favor, preencha todos os campos obrigatórios',
          type: 'error',
        });
        return;
      }

      // copyFileToDevice();
      // handleSubmit();
    } catch (error) {
      console.error('Error saving pet:', error);
    }
  };

  const renderInput = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    placeholder: string,
    keyboardType: any = 'default',
    multiline: boolean = false
  ) => (
    <View className='mb-4'>
      <Text className='text-gray-700 mb-2 font-semibold'>{label}</Text>
      <TextInput
        className='border border-gray-300 rounded-lg p-3 bg-gray-50'
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
      />
    </View>
  );

  const renderPicker = (
    label: string,
    selectedValue: any,
    onValueChange: (value: any) => void,
    items: { label: string; value: any }[]
  ) => (
    <View className='mb-4'>
      <Text className='text-gray-700 mb-2 font-semibold'>{label}</Text>
      <View className='border border-gray-300 rounded-lg bg-gray-50'>
        <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
          {items.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='flex-1 bg-white'
    >
      <ScrollView className='flex-1 bg-white'>
        <View className='p-6'>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className='absolute top-14 left-4 z-10'
          >
            <Ionicons name='arrow-back' size={24} color='#F7924A' />
          </TouchableOpacity>

          <Text className='text-3xl font-bold mb-8 mt-12 text-center text-gray-800'>
            Adicionar novo PET
          </Text>

          {renderPicker(
            'Tipo de Cadastro*',
            formData.isLost,
            (value) =>
              setFormData({ ...formData, isLost: value, isAdoption: !value }),
            [
              { label: 'Para Adoção', value: false },
              { label: 'Pet Perdido', value: true },
            ]
          )}

          {renderInput(
            'Nome do Pet*',
            formData.name,
            (text) => setFormData({ ...formData, name: text }),
            'Digite o nome do pet'
          )}

          {renderPicker(
            'Categoria*',
            formData.category,
            (value) => setFormData({ ...formData, category: value }),
            [
              { label: 'Gato', value: 'Gato' },
              { label: 'Cachorro', value: 'Cachorro' },
              { label: 'Outro', value: 'Outro' },
            ]
          )}

          {renderInput(
            'Localização*',
            formData.location,
            (text) => setFormData({ ...formData, location: text }),
            'Digite a localização'
          )}
          {renderInput(
            'URL da Imagem',
            formData.image,
            (text) => setFormData({ ...formData, image: text }),
            'Cole a URL da imagem'
          )}
          {renderInput(
            'Descrição',
            formData.description,
            (text) => setFormData({ ...formData, description: text }),
            'Descreva o pet',
            'default',
            true
          )}
          {renderInput(
            'Peso',
            formData.weight,
            (text) => setFormData({ ...formData, weight: text }),
            'Digite o peso',
            'numeric'
          )}

          {renderPicker(
            'Sexo',
            formData.sex,
            (value) => setFormData({ ...formData, sex: value }),
            [
              { label: 'Macho', value: 'Macho' },
              { label: 'Fêmea', value: 'Fêmea' },
            ]
          )}

          {renderInput(
            'Idade',
            formData.age.toString(),
            (text) => setFormData({ ...formData, age: parseInt(text) || 0 }),
            'Digite a idade',
            'numeric'
          )}

          <Text className='text-2xl font-bold mb-4 mt-8 text-gray-800'>
            Informações de Contato
          </Text>

          {renderInput(
            'Nome*',
            formData.contactInfo.name,
            (text) =>
              setFormData({
                ...formData,
                contactInfo: { ...formData.contactInfo, name: text },
              }),
            'Digite seu nome'
          )}
          {renderInput(
            'Email*',
            formData.contactInfo.email,
            (text) =>
              setFormData({
                ...formData,
                contactInfo: { ...formData.contactInfo, email: text },
              }),
            'Digite seu email',
            'email-address'
          )}
          {renderInput(
            'Telefone*',
            formData.contactInfo.phone,
            (text) =>
              setFormData({
                ...formData,
                contactInfo: { ...formData.contactInfo, phone: text },
              }),
            'Digite seu telefone',
            'phone-pad'
          )}

          <View className='flex-row justify-between mt-8'>
            <TouchableOpacity
              className='bg-gray-200 p-4 rounded-full w-[48%]'
              onPress={() => navigation.goBack()}
            >
              <Text className='text-gray-800 font-bold text-center text-lg'>
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className='bg-[#F7924A] p-4 rounded-full w-[48%]'
              onPress={handleSubmit}
            >
              <Text className='text-white font-bold text-center text-lg'>
                Cadastrar Pet
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FormScreen;
