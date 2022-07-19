import React, { useState } from "react";
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

import Logo from "../../assets/logo_secondary.svg";
import Filter from "../../components/Filter";
import Order from "../../components/Order";
import { OrderModel } from "../../interfaces/order-model";
import Button from "../../components/Button";

const Home = () => {
  const navigation = useNavigation();
  const [statusSelected, setSelectedStatus] = useState<"open" | "closed">(
    "open"
  );
  const [orders, setOrders] = useState<OrderModel[]>([
    {
      id: "1",
      patrimony: "123456",
      when: "18/07/2022 às 10:00",
      status: "open",
    },
    {
      id: "2",
      patrimony: "123456",
      when: "18/07/2022 às 10:00",
      status: "closed",
    },
    {
      id: "3",
      patrimony: "123456",
      when: "18/07/2022 às 10:00",
      status: "open",
    },
    {
      id: "4",
      patrimony: "123456",
      when: "18/07/2022 às 10:00",
      status: "open",
    },
    {
      id: "5",
      patrimony: "123456",
      when: "18/07/2022 às 10:00",
      status: "closed",
    },
    {
      id: "6",
      patrimony: "123456",
      when: "18/07/2022 às 10:00",
      status: "open",
    },
  ]);
  const { colors } = useTheme();

  const handleNewOrder = () => {
    navigation.navigate("register");
  };

  const handleOpenDetails = (orderId: string) => {
    navigation.navigate("details", { orderId: orderId });
  };

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
        <IconButton icon={<SignOut size={26} color={colors.gray[300]} />} />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">Meus chamados</Heading>
          <Text color="gray.200">3</Text>
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

        <Button title="Nova solicitação" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
};

export default Home;
