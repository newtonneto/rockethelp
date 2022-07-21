import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import {
  HStack,
  IconButton,
  VStack,
  useTheme,
  Text,
  Heading,
  FlatList,
  Center,
} from "native-base";
import { SignOut, ChatTeardropText } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import Logo from "../../assets/logo_secondary.svg";
import Filter from "../../components/Filter";
import Order from "../../components/Order";
import { OrderModel } from "../../interfaces/order-model";
import Button from "../../components/Button";
import firestoreDateFormat from "../../utils/firestoreDateFormat";
import Loading from "../../components/Loading";

const Home = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [statusSelected, setSelectedStatus] = useState<"open" | "closed">(
    "open"
  );
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const { colors } = useTheme();

  const handleNewOrder = () => {
    navigation.navigate("register");
  };

  const handleOpenDetails = (orderId: string) => {
    navigation.navigate("details", { orderId: orderId });
  };

  const handleLogout = () => {
    auth()
      .signOut()
      .catch((error) => {
        console.log(error);

        return Alert.alert("Sair", "Não foi possível sair.");
      });
  };

  useEffect(() => {
    setIsLoading(true);

    const subscriber = firestore()
      .collection("orders")
      .where("status", "==", statusSelected)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((item) => {
          const { patrimony, description, status, created_at } = item.data();

          return {
            id: item.id,
            patrimony,
            description,
            status,
            when: firestoreDateFormat(created_at),
          };
        });

        setOrders(data);
        setIsLoading(false);
      });

    return subscriber;
  }, [statusSelected]);

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />
        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}
          onPress={handleLogout}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">Solicitações</Heading>
          <Text color="gray.200">{orders.length}</Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="em andamento"
            onPress={() => setSelectedStatus("open")}
            isActive={statusSelected === "open"}
          />
          <Filter
            type="closed"
            title="finalizados"
            onPress={() => setSelectedStatus("closed")}
            isActive={statusSelected === "closed"}
          />
        </HStack>

        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Order data={item} onPress={() => handleOpenDetails(item.id)} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={() => (
              <Center>
                <ChatTeardropText color={colors.gray[300]} size={40} />
                <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                  Você ainda não possui {"\n"}
                  solicitações{" "}
                  {statusSelected === "open" ? "em andamento" : "finalizados"}
                </Text>
              </Center>
            )}
          />
        )}

        <Button title="Nova solicitação" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
};

export default Home;
