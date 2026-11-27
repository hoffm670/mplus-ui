import { CHARACTER_AND_REALM, RAIDER_LINK, TITLE_LABELS, TITLES, Title } from "@/domain/constants";
import { Button, Dropdown, DropdownItem, Label, Modal, ModalBody, ModalFooter, ModalHeader, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { modalTheme, navigateToCharacterScreen } from "./helper";

interface CharacterModalProps {
  title: Title;
  region: string;
}

export const CharacterModal: FC<CharacterModalProps> = ({ title: pageTitle, region }: CharacterModalProps) => {
  const router = useRouter();

  const [titleOverride, setTitleOverride] = useState<Title | null>(null);
  const selectedTitle = titleOverride ?? pageTitle;
  const [showCharacterModal, setShowCharacterModal] = useState<boolean>(false);
  const [character, setCharacter] = useState<string>("");
  const [realm, setRealm] = useState<string>("");
  const [raiderLink, setRaiderLink] = useState<string>("");
  const [format, setFormat] = useState<string>(CHARACTER_AND_REALM);

  const clearForms = () => {
    setTitleOverride(null);
    setCharacter("");
    setRealm("");
    setRaiderLink("");
    setFormat(CHARACTER_AND_REALM);
  };

  return (
    <div className="shrink-0">
      <Button
        onClick={() => {
          setShowCharacterModal(!showCharacterModal);
        }}
        color="dark"
        className="whitespace-nowrap shrink-0 min-w-[11.5rem]"
      >
        Check Your Character
      </Button>
      <div>
        <Modal
          theme={modalTheme}
          show={showCharacterModal}
          onClose={() => {
            setShowCharacterModal(false);
            clearForms();
          }}
          dismissible
        >
          <div className="">
            <ModalHeader className="mx-6 py-5 px-0">
              <div className="text-white">Enter Your Character</div>
            </ModalHeader>
            <ModalBody>
              <div className="mb-4">
                <Dropdown color="dark" label={TITLE_LABELS[selectedTitle]} dismissOnClick={true}>
                  {TITLES.map((titleOption) => (
                    <DropdownItem key={`modal-title-${titleOption}`} onClick={() => setTitleOverride(titleOption)}>
                      {TITLE_LABELS[titleOption]}
                    </DropdownItem>
                  ))}
                </Dropdown>
              </div>
              <div className="mb-4">
                <Dropdown color="dark" label={format} dismissOnClick={true}>
                  <DropdownItem key={"character"} onClick={() => setFormat(CHARACTER_AND_REALM)}>
                    {CHARACTER_AND_REALM}
                  </DropdownItem>
                  <DropdownItem key={"raider"} onClick={() => setFormat(RAIDER_LINK)}>
                    {RAIDER_LINK}
                  </DropdownItem>
                </Dropdown>
              </div>
              {format === CHARACTER_AND_REALM ? (
                <div>
                  <div className="mb-4">
                    <div className="mb-2 block">
                      <Label htmlFor="character" className="text-white">
                        Character Name
                      </Label>
                    </div>
                    <TextInput
                      id="character"
                      placeholder="Leeroy"
                      value={character}
                      onChange={(event) => setCharacter(event.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <div className="mb-2 block">
                      <Label htmlFor="realm" className="text-white">
                        Realm
                      </Label>
                    </div>
                    <TextInput
                      id="realm"
                      placeholder="Laughing Skull"
                      value={realm}
                      onChange={(event) => setRealm(event.target.value)}
                      required
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-4">
                    <div className="mb-2 block">
                      <Label htmlFor="raider-link" className="text-white">
                        Raider.io Character URL
                      </Label>
                    </div>
                    <TextInput
                      id="raider-link"
                      placeholder="Paste here"
                      value={raiderLink}
                      onChange={(event) => setRaiderLink(event.target.value)}
                      required
                    />
                  </div>
                </div>
              )}
              <ModalFooter className="py-6 px-0">
                <div>
                  <Button
                    color="dark"
                    onClick={() => {
                      navigateToCharacterScreen(router, format, selectedTitle, region, realm, character, raiderLink);
                      setShowCharacterModal(false);
                      clearForms();
                    }}
                  >
                    Confirm
                  </Button>
                </div>
              </ModalFooter>
            </ModalBody>
          </div>
        </Modal>
      </div>
    </div>
  );
};
