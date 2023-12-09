import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import AdminLayout from "../../layouts/AdminLayout";
import React from "react";
import axios from "../../api/axios";

const Book = () => {
    const [books, setBooks] = React.useState([]);

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
    
    console.log(books);
    
    const tableData = books.map((book) => {
      const { id, title, author, quantity } = book;
    
      return {
        id,
        title,
        author,
        quantity,
      };
    });
    

  const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "title",
      label: "TITLE",
    },
    {
      key: "author",
      label: "AUTHOR",
    },
    {
      key: "quantity",
      label: "QUANTITY",
    },
  ];

  return (
    <>
      <AdminLayout />
      <div className="py-4 pl-4 pr-6 xl:ml-80">
        <Table aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={tableData}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Book;
