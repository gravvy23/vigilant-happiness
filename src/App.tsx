import { Flex, Box, Heading, Input, Button } from "@chakra-ui/react";
import { useGetQuestionsQuery } from "./services/quiz";

function App() {
  const { data } = useGetQuestionsQuery();

  console.log(data);
  return (
    <Flex as="main" w="100vw" h="100vh">
      <Box bg="gray.200" h="full" p="8" minW="60">
        <Flex justifyContent="space-between" my="2">
          <Heading size="sm" fontWeight="normal">
            score:
          </Heading>
          <Heading size="sm">0</Heading>
        </Flex>
        <Flex justifyContent="space-between" my="2">
          <Heading size="sm" fontWeight="normal">
            chances:
          </Heading>
          <Heading size="sm">0</Heading>
        </Flex>
      </Box>
      <Box margin="auto">
        <Flex flexDir="column" alignItems="center">
          <Heading>question?</Heading>
          <Flex m="2">
            <Input size="lg" w="container.sm" m="2" />
            <Button size="lg" m="2">
              Submit
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}

export default App;
