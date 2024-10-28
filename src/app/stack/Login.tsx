import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../../../firebase.config";
import { useNavigation } from "@react-navigation/native";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "expo-router";
import styles from "../../css/login";
import Colors from "../../data/constants/Colors";
// import Home from "../tabs/Home";

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const auth = FIREBASE_AUTH;
  // const { setUser } = useUser();
  // const navigation = useNavigation();

  // Função de validação simples
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!email) {
      newErrors.email = "E-mail é obrigatório.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Por favor, insira um e-mail válido.";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Senha é obrigatória.";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const signIn = async () => {
    if (!validateForm()) return; // Validação antes de enviar
    setLoading(true);
    setErrors({}); // Limpar erros anteriores
    try {
      const user_info = await signInWithEmailAndPassword(auth, email, password);
      console.log(user_info);
      alert("Logado com sucesso!");
      // router.push({ pathname: "/Home" });
      // navigation.navigate("Home");
      navigation.navigate("Home");
    } catch (error) {
      setErrors({ general: "Erro ao fazer login. Tente novamente." });
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    if (!validateForm()) return; // Validação antes de enviar
    setLoading(true);
    setErrors({}); // Limpar erros anteriores
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Conta criada com sucesso!");
    } catch (error) {
      setErrors({ general: "Erro ao criar conta. Tente novamente." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.containerMain}>
      <Image
        source={require("../../../assets/images/login.png")}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.containerForm}>
        <Text style={styles.title}>Pronto para fazer um novo amigo?</Text>
        <Text style={styles.subtitle}>
          Vamos adotar um animalzinho e fazer ele feliz novamente!
        </Text>

        <TextInput
          style={[styles.input, errors.email && styles.errorInput]}
          placeholder="Digite seu e-mail"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />

        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TextInput
          style={[styles.input, errors.password && styles.errorInput]}
          placeholder="Digite sua senha"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />

        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}

        {errors.general && (
          <Text style={styles.generalError}>{errors.general}</Text>
        )}

        {loading ? (
          <ActivityIndicator size="large" color={Colors.PRIMARY} />
        ) : (
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={signIn}
              disabled={loading}
            >
              <Text style={[styles.textButton, styles.secondaryText]}>
                Login
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={signUp}
              disabled={loading}
            >
              <Text style={[styles.textButton, styles.primaryText]}>
                Criar conta
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}
