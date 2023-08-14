import { Image } from "@chakra-ui/react";
import FallbackImg from "/images/fallback-avatar.jpg";

export default function Avatar(props) {
  return (
    <Image
      fallbackSrc={FallbackImg}
      borderRadius="full"
      objectFit="cover"
      {...props}
    />
  );
}
