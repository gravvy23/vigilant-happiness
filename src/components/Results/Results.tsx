import { Flex, Box, Heading, useColorMode } from "@chakra-ui/react";
import { useAppSelector } from "../../hooks";

export function Results() {
  const { colorMode } = useColorMode();
  const { points, chances } = useAppSelector((state) => state.counter);

  return (
    <Box
      bg={colorMode === "light" ? "gray.200" : "gray.600"}
      h="full"
      p="8"
      minW="60"
    >
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
