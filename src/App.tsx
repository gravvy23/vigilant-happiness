import { Flex, Box } from "@chakra-ui/react";
import { useAppSelector } from "./hooks";
import { QuestionForm, Results, FinalScreen, Header } from "./components";

export function App() {
  const { chances } = useAppSelector((state) => state.counter);

  return (
    <Flex as="main" h="100vh">
      <Results />
      <Flex flexDir="column" w="full">
        <Header />
        <Box margin="auto">
          {chances === 0 ? <FinalScreen /> : <QuestionForm />}
        </Box>
      </Flex>
    </Flex>
  );
}
