import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import LoginForm from "../auth/LoginForm";
import RegisForm from "../auth/RegisForm";

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoginForm, setIsLoginForm] = useState(true);

  const openLoginForm = () => {
    setIsLoginForm(true);
    onOpen();
  };

  const openRegisForm = () => {
    setIsLoginForm(false);
    onOpen();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          variant="flat"
          color="transparent"
          onPress={openLoginForm}
          className={`capitalize ${isLoginForm ? "text-blue-500" : ""}`}
        >
          Masuk
        </Button>
        <Button
          variant="flat"
          color="primary"
          onPress={openRegisForm}
          className={`capitalize ${!isLoginForm ? "text-blue-500" : ""}`}
        >
          Daftar
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="3xl"
        backdrop="blur"
        placement="center"
      >
        <ModalContent>
              <ModalBody>
                {isLoginForm ? <LoginForm onClose={onClose} /> : <RegisForm onClose={onClose} />}
              </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
