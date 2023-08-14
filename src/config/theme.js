import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        background: "deep-black",
      },
    },
  },
  fonts: {
    body: `'Inter', sans-serif`,
  },
  colors: {
    "light-gray": "#F8F8F8",
    "stone-gray": "#7C7B80",
    "deep-black": "#0E1217",
    "tokped-green": "#41B549",
    "deep-indigo": "#22252D",
  },
});

export default theme;
