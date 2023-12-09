import DashboardNavbar from "../../components/DashboardNavbar";
import DashboardTable from "../../components/DashboardTable";
import AdminLayout from "../../layouts/AdminLayout";
import DashboardCard from "../../components/DashboardCard";
import { RiBook2Fill } from "react-icons/ri";
import { GrTransaction } from "react-icons/gr";
import { useEffect, useState } from "react";
import axios from "../../api/axios";

const AdminDashboard = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("/transactions");
      if (response.status === 200) {
        setTransactions(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Calculate the total number of books
  const totalBooks = transactions.reduce((acc, transaction) => {
    return acc + transaction.transaction_detail.length;
  }, 0);

  // Calculate the number of ongoing transactions
  const ongoingTransactions = transactions.filter(
    (transaction) => transaction.return_date === null
  ).length;

  // Calculate the number of completed transactions
  const completedTransactions = transactions.length - ongoingTransactions;

  return (
    <>
      <AdminLayout />
      <div className="py-4 pl-4 pr-6 xl:ml-80">
        <DashboardNavbar />
        <div className="mb-4 grid gap-y-10 gap-x-20 md:grid-cols-3 xl:grid-cols-3 xl:mt-8">
          <DashboardCard
            icon={<RiBook2Fill />}
            title="Total Buku"
            value={totalBooks}
          />
          <DashboardCard
            icon={<GrTransaction />}
            title="Transaksi Sedang Berjalan"
            value={ongoingTransactions}
          />
          <DashboardCard
            icon={<GrTransaction />}
            title="Transaksi Selesai"
            value={completedTransactions}
          />
        </div>
        <DashboardTable data={transactions} />
      </div>
    </>
  );
};

export default AdminDashboard;
