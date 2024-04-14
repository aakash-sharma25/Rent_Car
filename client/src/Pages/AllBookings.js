import React, { useEffect, useState } from "react";
import HeroPages from "../components/HeroPages";
import Footer from "../components/Footer";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AllBookings() {
  const navigate = useNavigate();
  const columns = [
    {
      name: "Name",
      selector: (row) => row.userName,
      // sortable: true,
    },
    {
      name: "Booking Date",
      selector: (row) => row.bookingDate,
      sortable: true,
    },
    {
      name: "Timing From",
      selector: (row) => row.timingFrom,
      // sortable: true,
    },
    {
      name: "Return Date",
      selector: (row) => row.returnDate,
      sortable: true,
    },
    {
      name: "Timing To",
      selector: (row) => row.timingTo,
      // sortable: true,
    },
    // {
    //   name: "totalHours",
    //   selector: (row) => row.totalHours,
    // sortable: true,
    // },
    {
      name: "Total Amount",
      selector: (row) => row.totalAmount,
      // sortable: true,
    },
    {
      name: "Is Approved",
      selector: (row) => row.isApproved,
      // sortable: true,
    },
    // {
    // 	name: 'isApproved',
    // 	selector: row => row.isApproved,
    // sortable: true,
    // },
    {
      name: "Action",
      selector: (row) => (
        <div style={{ display: "flex", gap: 3 }}>
          {row.isApproved === "false" ? (
            <button
              onClick={(e) => {
                verifyBooking(row);
              }}
            >
              Verify
            </button>
          ) : (
            "-"
          )}
          <button
            onClick={(e) => {
              navigate(`/admin-viewBooking/${row?._id}`);
            }}
          >
            View
          </button>
          {/*   <button onClick={()=>console.log(row.isReturned==="false")}>hello</button> */}
        </div>
      ),
      // sortable: true,
    },
  ];
  const [data, setdata] = useState([]);

  const verifyBooking = async (id) => {
    try {
      const { data } = await axios.post(
        "/api/v1/auth/verifybooking",
        {
          bookingId: id,
        }
      );
      fetchBookings();
    } catch (error) {
      console.log(error);
    }
  };
  const fetchBookings = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/auth/allbooking"
      );
      setdata(data?.bookings);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBookings();
  }, []);
  return (
    <>
      <section className="models-section">
        <HeroPages name="ALL Bookings" />
        <div className="models-container"></div>
        <div style={{ width: "80%", margin: "0 auto", flex: 1 }}>
          All booking
          {data && <DataTable columns={columns} data={data} />}
        </div>

        <Footer />
      </section>
    </>
  );
}
