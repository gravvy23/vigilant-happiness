import { Flex, IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex w="full" p="4" justifyContent="flex-end">
      <IconButton
        onClick={toggleColorMode}
        aria-label="Switch mode"
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      />
    </Flex>
  );
}
