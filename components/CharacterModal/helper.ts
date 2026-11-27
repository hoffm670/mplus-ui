import { CHARACTER_AND_REALM } from "@/domain/constants";
import { createTheme } from "flowbite-react";

export const navigateToCharacterScreen = (router, format, title, region, realm, character, raiderLink) => {
  // TODO input validation and cleanup
  realm = realm.replaceAll(" ", "");
  if (format === CHARACTER_AND_REALM) {
    router.push(`/${title}/${region}/${realm}/${character}`);
  } else {
    const route = raiderLink.split("raider.io")[1];
    const splitRoute = route.split("/");
    router.push(`/${title}/${splitRoute[2]}/${splitRoute[3]}/${splitRoute[4]}`);
  }
  return;
};

export const modalTheme = createTheme({
  root: {
    show: {
      on: "flex bg-gray-900/85",
    },
  },
  content: {
    inner: "relative flex max-h-[90dvh] flex-col rounded-lg bg-gray-900 border-gray-700 border-2",
  },
});
