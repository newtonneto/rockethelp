import { useState } from "react";
import { Alert } from "react-native";
import { VStack } from "native-base";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

import Button from "../../components/Button";
import Header from "../../components/Header";
import Input from "../../components/Input";

const Register = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [patrimony, setPatrimony] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const navigation = useNavigation();

  const handleNewOrderRegister = () => {
    if (!patrimony || !description) {
      return Alert.alert("Registrar", "Preencha todos os campos.");
    }

    setIsLoading(true);

    firestore()
      .collection("orders")
      .add({
        patrimony,
        description,
        status: "open",
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert("Solicitação", "Solicitação registrada com sucesso.");
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);

        return Alert.alert(
          "Solicitação",
          "Não foi possível registrar o pedido."
        );
      });
  };

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Nova solicitação" />
      <Input
        placeholder="Número do patrimônio"
        mt={4}
        isDisabled={isLoading}
        onChangeText={setPatrimony}
      />
      <Input
        placeholder="Descrição do problema"
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
        isDisabled={isLoading}
        onChangeText={setDescription}
      />
      <Button
        title="Cadastrar"
        mt={5}
        isLoading={isLoading}
        onPress={handleNewOrderRegister}
      />
    </VStack>
  );
};

export default Register;
