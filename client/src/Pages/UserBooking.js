import React, { useEffect, useState } from "react";
import HeroPages from "../components/HeroPages";
import Footer from "../components/Footer";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useAuth } from "../components/cotext/auth";

const columns = [
  {
    name: "Name",
    selector: (row) => row.userName,
    sortable: true,
  },
  {
    name: "Booking Date",
    selector: (row) => row.bookingDate,
    sortable: true,
  },
  {
    name: "Timing From",
    selector: (row) => row.timingFrom,
    sortable: true,
  },
  {
    name: "Return Date",
    selector: (row) => row.returnDate,
    sortable: true,
  },
  {
    name: "timing To",
    selector: (row) => row.timingTo,
    sortable: true,
  },
  // {
  // 	name: 'totalHours',
  // 	selector: row => row.totalHours,
  // 	sortable: true,
  // },
  {
    name: "Total Amount",
    selector: (row) => row.totalAmount,
    sortable: true,
  },
  {
    name: "Is Approved",
    selector: (row) => (row.isApproved === "true" ? "YES" : "NO"),
    sortable: true,
  },
  // {
  // 	name: 'isApproved',
  // 	selector: row => row.isApproved,
  // 	sortable: true,
  // },
  // {
  // 	name: 'Action',
  // 	selector: row => <div> <button onClick={()=>console.log(row)}>hello</button> </div>,
  // 	sortable: true,
  // },
];
export default function UserBooking() {
  const [data, setdata] = useState([]);
  const [auth, setauth] = useAuth();
  const fetchUserBooking = async () => {
    try {
      const { data } = await axios.post(
        "/api/v1/auth/userbooking",
        {
          userId: auth?.user?._id,
        }
      );
      console.log(data.bookings);
      setdata(data?.bookings);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserBooking();
  }, [auth]);
  return (
    <>
      <section className="models-section">
        <HeroPages name="ALL Bookings" />
        <div className="models-container"></div>
        <div style={{ width: "80%", margin: "0 auto", flex: 1 }}>
          <h1>All Booking</h1>
          <DataTable columns={columns} data={data} />
        </div>

        <Footer />
      </section>
    </>
  );
}
