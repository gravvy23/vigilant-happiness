import { Flex, Box } from "@chakra-ui/react";
import { QuestionForm } from "./QuestionForm";
import { Results } from "./Results";

function App() {
  return (
    <Flex as="main" w="100vw" h="100vh">
      <Box bg="gray.200" h="full" p="8" minW="60">
        <Results />
      </Box>
      <Box margin="auto">
        <QuestionForm />
      </Box>
    </Flex>
  );
}

export default App;
