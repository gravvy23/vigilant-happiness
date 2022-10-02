import { Flex, Box, Heading } from "@chakra-ui/react";
import { useAppSelector } from "../../hooks";

export function Results() {
  const { points, chances } = useAppSelector((state) => state.counter);

  return (
    <Box>
      <Flex justifyContent="space-between" my="2">
        <Heading size="sm" fontWeight="normal">
          score:
        </Heading>
        <Heading size="sm">{points}</Heading>
      </Flex>
      <Flex justifyContent="space-between" my="2">
        <Heading size="sm" fontWeight="normal">
          chances:
        </Heading>
        <Heading size="sm">{chances}</Heading>
      </Flex>
    </Box>
  );
}
