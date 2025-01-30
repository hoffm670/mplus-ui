import { CHARACTER_AND_REALM, RAIDER_LINK } from "@/domain/constants";
import { Button, CustomFlowbiteTheme, Dropdown, Label, Modal, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { navigateToCharacterScreen } from "./helper";

interface CharacterModalProps {
  region: string;
}

export const CharacterModal: FC<CharacterModalProps> = ({ region }: CharacterModalProps) => {
  const router = useRouter();

  const [showCharacterModal, setShowCharacterModal] = useState<boolean>(false);
  const [character, setCharacter] = useState<string>("");
  const [realm, setRealm] = useState<string>("");
  const [raiderLink, setRaiderLink] = useState<string>("");
  const [format, setFormat] = useState<string>(CHARACTER_AND_REALM);

  const clearForms = () => {
    setCharacter("");
    setRealm("");
    setRaiderLink("");
    setFormat(CHARACTER_AND_REALM);
  };

  const customTheme: CustomFlowbiteTheme["modal"] = {
    root: {
      show: {
        on: "flex bg-gray-900 bg-opacity-85",
      },
    },
    content: {
      inner: "relative flex max-h-[90dvh] flex-col rounded-lg bg-gray-900 border-gray-700 border-2",
    },
  };

  return (
    <div>
      <div>
        <Button
          onClick={() => {
            setShowCharacterModal(!showCharacterModal);
          }}
          color="dark"
          className="mr-10"
        >
          Check Your Character
        </Button>
      </div>
      <div>
        <Modal
          theme={customTheme}
          show={showCharacterModal}
          onClose={() => {
            setShowCharacterModal(false);
            clearForms();
          }}
          dismissible
        >
          <div className="">
            <Modal.Header className="mx-6 py-5 px-0">
              <div className="text-white">Enter Your Character</div>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-4">
                <Dropdown color="dark" label={format} dismissOnClick={true}>
                  <Dropdown.Item key={"character"} onClick={() => setFormat(CHARACTER_AND_REALM)}>
                    {CHARACTER_AND_REALM}
                  </Dropdown.Item>
                  <Dropdown.Item key={"raider"} onClick={() => setFormat(RAIDER_LINK)}>
                    {RAIDER_LINK}
                  </Dropdown.Item>
                </Dropdown>
              </div>
              {format === CHARACTER_AND_REALM ? (
                <div>
                  <div className="mb-4">
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="Character Name" className="text-white" />
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
                      <Label htmlFor="email" value="Realm" className="text-white" />
                    </div>
                    <TextInput
                      id="realm"
                      placeholder="Illidan"
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
                      <Label htmlFor="email" value="Raider.io Character URL" className="text-white" />
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
              <Modal.Footer className="py-6 px-0">
                <div>
                  <Button
                    color="dark"
                    onClick={() => {
                      navigateToCharacterScreen(router, format, region, realm, character, raiderLink);
                      setShowCharacterModal(false);
                      clearForms();
                    }}
                  >
                    Confirm
                  </Button>
                </div>
              </Modal.Footer>
            </Modal.Body>
          </div>
        </Modal>
      </div>
    </div>
  );
};
