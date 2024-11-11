// * React
import { useState } from "react";

// * React Native
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// * Firebase
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../../../firebase.config";

// * Components
import Toast from "react-native-toast-message";
import { InputField } from "@/src/components/form/inputField";

// * Form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { saveSession } from "@/src/data/helpers/storage";
import { validationSchemaAuth } from "@/src/data/validation/schemas";

// * Interface
interface AuthFormValues {
  email: string;
  password: string;
}

const Auth = () => {
  const navigation = useNavigation<any>();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const auth = FIREBASE_AUTH;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: yupResolver(validationSchemaAuth),
  });

  const onSubmit = async (data: AuthFormValues) => {
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        const { user } = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        const token = await user.getIdToken();

        await saveSession(token, data.email);

        Toast.show({
          text1: "Logado com sucesso!",
          type: "success",
        });

        navigation.navigate("Tabs");
      } else {
        // Create account
        await createUserWithEmailAndPassword(auth, data.email, data.password);

        Toast.show({
          text1: "Conta criada com sucesso!",
          type: "success",
        });

        setIsLogin(true);
      }
    } catch (error) {
      Toast.show({
        text1: "Email ou senha incorreta. Tente novamente.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="h-screen">
      <View className="flex-1 items-center bg-white">
        <View className="bg-[#FBD2B6] w-full h-80 justify-center items-center overflow-hidden">
          <Image
            source={require("../../../assets/images/login.png")}
            resizeMode="contain"
          />
        </View>

        <View className="w-full flex-1 px-6 pt-3">
          <Text className="text-2xl font-bold text-[#464646] text-center">
            {isLogin ? "Ache seu Amigo!" : "Crie sua conta"}
          </Text>

          <Text className="text-lg text-center text-[#949494] mt-2">
            {isLogin
              ? "Conectando Amigos perdidos e corações em busca de um novo lar!"
              : "Preencha os dados abaixo para criar sua conta."}
          </Text>

          {/** Email input field */}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                value={value}
                placeholder="E-mail"
                error={errors.email?.message}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
              />
            )}
            name="email"
            rules={{ required: true }}
          />

          {/** Password input field */}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                value={value}
                onBlur={onBlur}
                secureTextEntry
                placeholder="Senha"
                error={errors.password?.message}
                onChangeText={onChange}
              />
            )}
            name="password"
            rules={{ required: true }}
          />

          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <View className="flex justify-center items-center">
              <TouchableOpacity
                className="bg-[#F7924A] rounded-full w-[245px] h-[50px] p-2 mt-4 flex justify-center items-center"
                onPress={handleSubmit(onSubmit)}
                disabled={loading}
              >
                <Text className="text-white font-bold text-center text-lg">
                  {isLogin ? "Entrar" : "Criar conta"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="mt-4"
                onPress={() => setIsLogin(!isLogin)}
              >
                <Text className="text-[#F7924A] text-center">
                  {isLogin
                    ? "Ainda não tem uma conta? Crie uma!"
                    : "Já tem uma conta? Faça login!"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Auth;
