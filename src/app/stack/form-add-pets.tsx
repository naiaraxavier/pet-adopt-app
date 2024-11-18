// * React Native
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

// * Icons
import { Ionicons } from "@expo/vector-icons";

// * Components and Helpers
import Toast from "react-native-toast-message";
import { Picker } from "@react-native-picker/picker";
import { addDoc, collection, getDocs } from "@firebase/firestore";
import { db } from "@/firebase.config";
// import { copyFileToDevice } from '@/src/data/helpers/saveData';
import * as ImagePicker from "expo-image-picker";

interface PetFormData {
  age: number;
  sex: string;
  name: string;
  weight: string;
  breed: string;
  status: string;
  imageUrl: string;
  category: string;
  location: string;
  description: string;
  user: {
    name: string;
    email: string;
    imageUrl: string;
  };
}

const FormScreen = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState<PetFormData>({
    age: 0,
    sex: "Macho",
    name: "",
    weight: "",
    breed: "",
    status: "Adoção",
    imageUrl: "",
    category: "",
    location: "",
    description: "",
    user: {
      name: "",
      email: "",
      imageUrl:
        "https://t4.ftcdn.net/jpg/08/75/45/97/240_F_875459719_8i7J3atGbsDoRPT0ZW0DjBpgAFVTrKAe.jpg",
    },
  });

  console.log(formData);

  const GetCategories = async () => {
    setCategories([]);
    const snapshot = await getDocs(collection(db, "Category"));
    snapshot.forEach((doc) => {
      setCategories((categories) => [...categories, doc.data()]);
    });
  };

  useEffect(() => {
    GetCategories();
  }, []);

  const handleSubmit = async () => {
    try {
      if (
        !formData.name ||
        !formData.location ||
        !formData.user.email ||
        !formData.user.name ||
        !formData.status ||
        !formData.category
      ) {
        Toast.show({
          text1: "Erro",
          text2: "Por favor, preencha todos os campos obrigatórios",
          type: "error",
        });
        return;
      }

      // Adicionando dados ao Firestore
      const petRef = collection(db, "Pets");
      await addDoc(petRef, {
        ...formData,
        // createdAt: new Date().toISOString(),
      });

      Toast.show({
        text1: "Sucesso",
        text2: "Pet cadastrado com sucesso!",
        type: "success",
      });

      // Redirecionar ou limpar o formulário
      setFormData({
        age: 0,
        sex: "Macho",
        name: "",
        weight: "",
        breed: "",
        status: "Adoção",
        imageUrl: "",
        category: "",
        location: "",
        description: "",
        user: {
          name: "",
          email: "",
          imageUrl: "",
        },
      });
      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    } catch (error) {
      console.error("Erro ao salvar pet:", error);
      Toast.show({
        text1: "Erro",
        text2: "Erro ao salvar pet. Tente novamente.",
        type: "error",
      });
    }
  };

  const renderInput = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    placeholder: string,
    keyboardType: any = "default",
    multiline: boolean = false
  ) => (
    <View className="mb-4">
      <Text className="text-gray-700 mb-2 font-semibold">{label}</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-3 bg-gray-50"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
      />
    </View>
  );

  const imagePicker = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        if (!result.canceled) {
          setFormData({ ...formData, imageUrl: result.assets[0].uri });
        }
      }
    } catch (error) {
      console.error("Erro ao abrir a biblioteca de mídia:", error);
    }
  };

  const renderPicker = (
    label: string,
    selectedValue: any,
    onValueChange: (value: any) => void,
    items: { label: string; value: any }[]
  ) => (
    <View className="mb-4">
      <Text className="text-gray-700 mb-2 font-semibold">{label}</Text>
      <View className="border border-gray-300 rounded-lg bg-gray-50">
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
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView className="flex-1 bg-white">
        <View className="p-6">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-14 left-4 z-10 border border-gray-300 p-2 rounded-full"
          >
            <Ionicons name="arrow-back" size={24} color="#F7924A" />
          </TouchableOpacity>

          <Text className="text-3xl font-bold mb-8 mt-12 text-center text-gray-800">
            Adicionar novo PET
          </Text>

          <Pressable onPress={imagePicker}>
            <View className="border border-gray-300 mx-auto mb-4  rounded">
              {!formData.imageUrl ? (
                <Image
                  className="w-24 h-24"
                  source={{
                    uri: "https://cdn-icons-png.freepik.com/256/1830/1830494.png?ga=GA1.1.904123655.1726780547&semt=ais_hybrid",
                  }}
                />
              ) : (
                <Image
                  className="w-24 h-24 mx-auto "
                  source={{ uri: formData.imageUrl }}
                />
              )}
            </View>
          </Pressable>

          {renderPicker(
            "Tipo de Cadastro *",
            formData.status,
            (value) => setFormData({ ...formData, status: value }),
            [
              { label: "Para Adoção", value: "Adoção" },
              { label: "Pet Perdido", value: "Perdido" },
            ]
          )}

          {renderInput(
            "Nome do Pet *",
            formData.name,
            (text) => setFormData({ ...formData, name: text }),
            "Digite o nome do pet"
          )}

          {renderPicker(
            "Categoria *",
            formData.category,
            (value) => setFormData({ ...formData, category: value }),
            categories.map((category) => ({
              label: category.name,
              value: category.name,
            }))
          )}

          {renderInput(
            "Localização *",
            formData.location,
            (text) => setFormData({ ...formData, location: text }),
            "Digite a localização"
          )}

          {renderInput(
            "URL da Imagem",
            formData.imageUrl,
            (text) => setFormData({ ...formData, imageUrl: text }),
            "Cole a URL da imagem"
          )}

          {renderInput(
            "Raça",
            formData.breed,
            (text) => setFormData({ ...formData, breed: text }),
            "Digite a raça"
          )}

          {renderInput(
            "Descrição",
            formData.description,
            (text) => setFormData({ ...formData, description: text }),
            "Descreva o pet",
            "default",
            true
          )}
          {renderInput(
            "Peso",
            formData.weight,
            (text) => setFormData({ ...formData, weight: text }),
            "Digite o peso",
            "numeric"
          )}

          {renderPicker(
            "Sexo",
            formData.sex,
            (value) => setFormData({ ...formData, sex: value }),

            [
              { label: "Macho", value: "Macho" },
              { label: "Fêmea", value: "Fêmea" },
            ]
          )}

          {renderInput(
            "Idade",
            formData.age.toString(),
            (text) => setFormData({ ...formData, age: parseInt(text) || 0 }),
            "Digite a idade",
            "numeric"
          )}

          <Text className="text-2xl font-bold mb-4 mt-8 text-gray-800">
            Informações de Contato
          </Text>

          {renderInput(
            "Nome *",
            formData.user.name,
            (text) =>
              setFormData({
                ...formData,
                user: { ...formData.user, name: text },
              }),
            "Digite seu nome"
          )}
          {renderInput(
            "Email *",
            formData.user.email,
            (text) =>
              setFormData({
                ...formData,
                user: { ...formData.user, email: text },
              }),
            "Digite seu email",
            "email-address"
          )}

          <View className="flex-row justify-between mt-8">
            <TouchableOpacity
              className="bg-gray-200 p-4 rounded-full w-[48%]"
              onPress={() => navigation.goBack()}
            >
              <Text className="text-gray-800 font-bold text-center text-lg">
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#F7924A] p-4 rounded-full w-[48%]"
              onPress={handleSubmit}
            >
              <Text className="text-white font-bold text-center text-lg">
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
