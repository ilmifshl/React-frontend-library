import { Table, TableHeader, TableBody, TableCell, TableRow, getKeyValue, TableColumn } from "@nextui-org/react";

const TransactionTable = ({ data }) => {
  // Check if data is defined before mapping
  const tableData = data?.map((transaction) => {
    const { id, member, transaction_detail, return_date } = transaction;
    const { name } = member;
    const { book } = transaction_detail[0];
    const { title } = book;

    
    return {
      id,
      memberName: name,
      bookTitle: title,
      borrowDate: new Date(transaction.created_at).toLocaleDateString(),
      returnDate: return_date
        ? new Date(return_date).toLocaleDateString()
        : "Not returned yet",
      status: return_date ? "Completed" : "Pending",
    };
  });
  const columns= [
    {
      key: "memberName",
      label: "NAME",
    },
    {
      key: "bookTitle",
      label: "BOOK",
    },
    {
      key: "borrowDate",
      label: "BORROW DATE",
    },
    {
      key: "returnDate",
      label: "RETURN DATE",
    },
    {
      key: "status",
      label: "STATUS",
    },
  ];

  return (
    <Table className="min-w-full border border-gray-300">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={tableData}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TransactionTable;
