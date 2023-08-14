import { Link } from "react-router-dom";
import { Image } from "@chakra-ui/react";
import TokplayLogo from "/images/tokplay-logo.svg";

export default function Logo(props) {
  return (
    <Link to="/">
      <Image w={140} src={TokplayLogo} alt="tokopedia play logo" {...props} />
    </Link>
  );
}
