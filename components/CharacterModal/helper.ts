import { CHARACTER_AND_REALM } from "@/domain/constants";

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
