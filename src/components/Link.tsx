import React from "react";
import type { ReactNode } from "react";

import { chakra } from "@chakra-ui/react";
import type { StyleProps } from "@chakra-ui/react";

type Props = StyleProps & {
  href: string;
  children: ReactNode;
  target?: string;
  isExternal?: boolean;
};

const StyledLink = chakra("a");

const Link = ({ href, children, target, ...props }: Props) => {
  return (
    <StyledLink
      fontSize="14px"
      color="scienceBlue"
      {...props}
      cursor="pointer"
      _hover={{ textDecoration: "underline" }}
    >
      {children}
    </StyledLink>
  );
};

export default Link;
