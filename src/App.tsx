import { Flex, Box } from "@chakra-ui/react";
import { useAppSelector } from "./hooks";
import { QuestionForm, Results, FinalScreen } from "./components";

function App() {
  const { chances } = useAppSelector((state) => state.counter);

  return (
    <Flex as="main" w="100vw" h="100vh">
      <Box bg="gray.200" h="full" p="8" minW="60">
        <Results />
      </Box>
      <Box margin="auto">
        {chances === 0 ? <FinalScreen /> : <QuestionForm />}
      </Box>
    </Flex>
  );
}

export default App;
