import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import axios from "../../api/axios";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import AdminLayout from "../../layouts/AdminLayout";
import DashboardTable from "../../components/DashboardTable";
import UseAuth from "../../context/AuthContext";

const Transactions = () => {
  const { user } = UseAuth();
  const [transactions, setTransactions] = React.useState([]);
  const [books, setBooks] = React.useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("blur");
  const [usersWithRoleOne, setUsersWithRoleOne] = React.useState([]);
  const [selectedUserId, setSelectedUserId] = React.useState(null);
  const [selectedBookId, setSelectedBookId] = React.useState(null);

  // Fungsi untuk mengambil transaksi dari server
  const fetchTransactions = async () => {
    try {
      const response = await axios.get("/transactions");
      if (response.status === 200) {
        setTransactions(response.data.data);
        console.log(response.data.data); // Log transactions
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  React.useEffect(() => {
    // Memanggil fungsi fetchTransactions saat komponen dimuat
    fetchTransactions();
  }, []);

  React.useEffect(() => {
    const fetchUsersWithRoleOne = async () => {
      try {
        const response = await axios.get("/users");
        if (response.status === 200) {
          setUsersWithRoleOne(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching users with role 1:", error);
      }
    };

    fetchUsersWithRoleOne();
  }, []);

  React.useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("/book");
        if (response.status === 200) {
          setBooks(response.data.books);
          console.log(response.data); // Log Books
        }
      } catch (error) {
        console.error("Error fetching Books:", error);
      }
    };

    fetchBooks();
  }, []);

  const openModal = () => {
    setBackdrop("blur");
    onOpen();
  };

  const handleBorrow = async () => {
    try {
      // console.log(selectedUserId.target.value, selectedBookId)
      // Check if both user and book are selected
      if (!selectedUserId || !selectedBookId) {
        console.error("Please select a user and a book.");

        return;
      }

      const response = await axios.post("/transaction", {
        member_id: selectedUserId.target.value,
        librarian_id: user.id,
        transaction_details: [
          {
            book_id: selectedBookId.target.value,
            quantity: 1,
          },
        ],
        return_date: null,
      });

      if (response.status === 200) {
        console.log("Transaction successful:", response.data);
      }
    } catch (error) {
      console.error("Error borrowing book:", error.response);
    } finally {
      fetchTransactions();
      onClose();
    }
  };

  return (
    <>
      <AdminLayout />
      <div className="py-4 pl-4 pr-6 xl:ml-80">
        <div className="mb-4 flex justify-end">
          <Button
            variant="flat"
            color="warning"
            onPress={openModal}
            className="capitalize bg-[#122850] text-white font-medium text-md hover:bg-[#152849]"
          >
            Pinjam
          </Button>
        </div>
        <DashboardTable data={transactions} />
      </div>
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Peminjaman
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col flex-wrap md:flex-nowrap gap-4">
                  <Select
                    items={usersWithRoleOne}
                    value={selectedUserId}
                    onChange={(selectedKey) => {
                      console.log(selectedKey);
                      setSelectedUserId((selectedKey)); // Add this line
                    }}
                    label="User"
                    placeholder="Select a user"
                  >
                    {(user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    )}
                  </Select>
                </div>
                <div className="flex w-full flex-col flex-wrap md:flex-nowrap gap-4 mb-6">
                  <Select
                    items={books}
                    value={selectedBookId}
                    onChange={(selectedKey) => {
                      console.log(selectedKey);
                      setSelectedBookId(
                        selectedKey
                      );
                    }}
                    label="Book"
                    placeholder="Select a Book"
                  >
                    {(book) => (
                      <SelectItem key={book.id.toString()} value={book.id}>
                        {book.title}
                      </SelectItem>
                    )}
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Batal
                </Button>
                <Button color="primary" onPress={handleBorrow}>
                  Pinjam
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Transactions;
