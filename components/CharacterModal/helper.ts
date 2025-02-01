import { CHARACTER_AND_REALM } from "@/domain/constants";
import { CustomFlowbiteTheme } from "flowbite-react";

export const navigateToCharacterScreen = (router, format, region, realm, character, raiderLink) => {
  // TODO input validation and cleanup
  realm = realm.replaceAll(" ", "");
  if (format === CHARACTER_AND_REALM) {
    router.push(`/${region}/${realm}/${character}`);
  } else {
    const route = raiderLink.split("raider.io")[1];
    const splitRoute = route.split("/");
    router.push(`/${splitRoute[2]}/${splitRoute[3]}/${splitRoute[4]}`);
  }
  return;
};

export const modalTheme: CustomFlowbiteTheme["modal"] = {
  root: {
    show: {
      on: "flex bg-gray-900 bg-opacity-85",
    },
  },
  content: {
    inner: "relative flex max-h-[90dvh] flex-col rounded-lg bg-gray-900 border-gray-700 border-2",
  },
};
