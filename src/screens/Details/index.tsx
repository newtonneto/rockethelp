import { VStack, Text } from "native-base";
import { useRoute } from "@react-navigation/native";

import Header from "../../components/Header";

type RouteParams = {
  orderId: string;
};

const Details = () => {
  const route = useRoute();
  const { orderId } = route.params as RouteParams;

  return (
    <VStack flex={1} bg="gray.700">
      <Header title="Solicitação" />
      <Text color="white">{orderId}</Text>
    </VStack>
  );
};

export default Details;
