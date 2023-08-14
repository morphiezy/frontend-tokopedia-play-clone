import { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { useValidation } from "@/hooks";
import { auth } from "@/services/user";
import {
  Grid,
  GridItem,
  Image,
  Box,
  Heading,
  Text,
  VStack,
  FormControl,
  FormHelperText,
  Center,
} from "@chakra-ui/react";
import { Input, Button, Logo } from "@/components";
import Illustration from "/images/auth-image.jpg";

function Auth() {

  const [loading, setLoading] = useState(false);

  const [
    username, 
    setUsername, 
    errorUsername, 
    validateUsername
  ] = useValidation("username");

  const [
    password, 
    setPassword, 
    errorPassword, 
    validatePassword
  ] = useValidation("password");

  const params = useParams();

  const flow = params.flow;
  const isMatching = ["register", "login"].includes(flow);

  if (!isMatching) {
    return <Navigate to="/auth/login" replace />;
  }

  const authenticating = async () => {
    const isValidUsername = !validateUsername();
    const isValidPassword = !validatePassword();

    if (isValidUsername || isValidPassword) return;

    setLoading(true);
    await auth(flow, {username, password});
    setLoading(false);
  };

  return (
    <Box
      maxW="1600px"
      w="full"
      minHeight="600px"
      h="100vh"
      mx="auto"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        w="full"
        gridTemplateColumns="minmax(400px,600px) minmax(400px,1fr)"
        gridAutoRows="auto"
      >
        <GridItem py="60px" px="80px">
          <Logo />
          <Box mt="100px">
            <Heading fontSize="22px" as="h1" color="light-gray">
              {authTextContent[flow].heading}
            </Heading>
            <Text fontSize="14px" color="stone-gray" fontWeight="medium" mt={3}>
              {authTextContent[flow].desc}
            </Text>
          </Box>
          <FormControl my="40px" isRequired>
            <VStack spacing="20px" align="stretch">
              <Box>
                <Input
                  id="username"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errorUsername && (
                  <FormHelperText fontSize="12px">
                    {errorUsername}
                  </FormHelperText>
                )}
              </Box>
              <Box>
                <Input
                  id="password"
                  placeholder="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  pr="52px"
                />
                {errorPassword && (
                  <FormHelperText fontSize="12px">
                    {errorPassword}
                  </FormHelperText>
                )}
              </Box>
              <Button onClick={authenticating} isLoading={loading}>
                {authTextContent[flow].button}
              </Button>
            </VStack>
          </FormControl>
          <Center
            h="fit-content"
            fontSize="14px"
            color="stone-gray"
            fontWeight="medium"
          >
            <Text>
              {flow === "register" ? "Already" : "Don't"} have an account ?
            </Text>
            <Text
              as={Link}
              ml="4px"
              fontWeight="bold"
              to={`/auth/${flow === "register" ? "login" : "register"}`}
              replace
            >
              {flow === "register" ? "Sign in" : "Sign up"}
            </Text>
          </Center>
        </GridItem>
        <GridItem position="relative" py="40px" pr="40px">
          <Image
            width="100%"
            height="100%"
            objectFit="cover"
            borderRadius="20px"
            src={Illustration}
            alt="illustration"
            draggable={false}
          />
        </GridItem>
      </Grid>
    </Box>
  );
}

const authTextContent = {
  register: {
    heading: "Create an Account",
    desc: (
      <span>
        Enter your username and choose your password <br />
        to setup your account.
      </span>
    ),
    button: "Sign up",
  },
  login: {
    heading: "Login Your Account",
    desc: (
      <span>
        Enter your username and password <br />
        before login.
      </span>
    ),
    button: "Sign in",
  },
};

export default Auth;
