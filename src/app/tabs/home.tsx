import { useEffect, useState } from "react";
import Loading from "@/src/components/loading";
import { getSession } from "@/src/data/helpers/storage";
import { Button, SafeAreaView, Text, View } from "react-native";
import { CarouselHome, MyCarousel } from "@/src/components/carousel";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const fetchSessionData = async () => {
      const { email } = await getSession();
      setUserEmail(email ?? "Usuário");
      setLoading(false);
    };

    fetchSessionData();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white w-full">
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* Saudação e Banner */}
          <View className="p-5">
            <Text className="font-bold mb-6">Olá, {userEmail}!</Text>

            {/* <View className="bg-[#F7924A] rounded-2xl w-full h-[195px]">
              <MyCarousel />
            </View> */}

            {/* <MyCarousel /> */}
          </View>

          {/* Categorias */}
          <View className="flex-row justify-around p-4 bg-gray-200">
            <Button
              title="Animais"
              onPress={() => {
                /* Navegar para a tela de animais */
              }}
            />
            <Button
              title="Próximos a você"
              onPress={() => {
                /* Navegar para a tela de animais próximos */
              }}
            />
          </View>

          {/* Cards de Anúncios */}
          {/* <ScrollView className="p-4">
          {animals.map((animal, index) => (
            <AnimalCard key={index} title={animal.title} description={animal.description} image={animal.image} />
          ))}
        </ScrollView> */}

          {/* Botão de Adicionar PET */}
          <View className="p-4">
            <Button
              title="Adicionar um novo PET"
              onPress={() => {
                /* Navegar para a tela de adicionar PET */
              }}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Home;
