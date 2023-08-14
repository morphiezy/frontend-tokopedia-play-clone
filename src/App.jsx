import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./context/auth";
import theme from "./config/theme";
import router from "./routes";

function App() {
  return (
    <ChakraProvider
      theme={theme}
      toastOptions={{
        defaultOptions: {
          position: "bottom",
          duration: 3000,
          isClosable: true,
        },
      }}
    >
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
