import React, { useEffect, useState } from "react";
import HeroPages from "../components/HeroPages";
import Footer from "../components/Footer";
import axios from "axios";
import { useAuth } from "../components/cotext/auth";
import { IconQuote } from "@tabler/icons-react";

export default function Notification() {
  const [auth, setauth] = useAuth();
  const [notification, setnotification] = useState([]);
  const fetchAllNotifications = async () => {
    try {
      const { data } = await axios.post(
        "/api/v1/auth/allnotification",
        {
          userId: auth?.user?._id,
        }
      );
      let notificationArray = data?.notification ;
      notificationArray = notificationArray.reverse();
      setnotification(notificationArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllNotifications();
  }, []);
  return (
    <>
      <section className="models-section">
        <HeroPages name="ALL Notificatons" />
        <div className="models-container"></div>
        <div style={{ width: "80%", margin: "0 auto", flex: 1 }}>
        <h2>

          Notifications
        </h2>
          <div>
            {notification?.map((n, i) => {
              return (
                <div
                  className="all-testimonials__box"
                  style={{
                    padding: "15px 15px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }} 
                >
                  <p>{i + 1 + ") " + n?.message}</p>
                </div>
              );
            })}
          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
