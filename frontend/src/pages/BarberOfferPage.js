import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import BarberOfferDescription from "../components/BarberOfferDescription";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useAxios from "../utils/useAxios";

// Ideas how to implement baber ordering:
// 1. Display hours only for one day + use datepicker to display other days.
//   Display fully booked list of times when barber not avail.

// What about barber unavailabilities? Barber orders are fetched from websocket, but unavailabilites
// may change on fly too. Maybe send both informations via websocket in one notification?
// Other way would be to rend request to barber unavailabilites endpoint each time websocket message
// comes to FE, but in this case it would look like the break of the websocket logic at all...

// TODO adjust data returned in response from barber/service_offer/id endpoint.
// 1. Full link to the image.
// 2. Enum values, not key names.

// const offerDetails = {
//   id: 1,
//   address: "st. Solna 24",
//   barber_name: "Naughty Alice",
//   city: "Warsaw",
//   price: "50.00",
//   thumbnail: "https://source.unsplash.com/random/?hairdresser",
//   specialization: "Women",
//   open_hours: "10AM-6PM",
//   working_days: "Monday-Sunday",
//   description:
//     "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
// };

const { REACT_APP_WS_BASE_URL } = process.env;
const WEBSOCKET_API_URL = `${REACT_APP_WS_BASE_URL}websockets`;

const theme = createTheme();

export default function BarberOfferPage() {
  const { offer_id } = useParams();
  const [absences, setAbsences] = useState([]);
  const [offerDetails, setOfferDetails] = useState(null);
  const [orders, setOrders] = useState([]);
  const api = useAxios();
  const navigate = useNavigate();
  const absenceWs = useRef(null);
  const ordersWs = useRef(null);

  useEffect(() => {
    validateOfferIdParam();
    getServiceOfferDetails();
    connectToAbsenceWebsocket();
    connectToOrdersWebsocket();

    const absenceWsCurrent = absenceWs.current;
    const ordersWsCurrent = ordersWs.current;
    return () => {
      absenceWsCurrent.close();
      ordersWsCurrent.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateOfferIdParam = () => {
    if (!isOfferIdPositiveInt()) {
      navigate("/not_found");
    }
  };

  const isOfferIdPositiveInt = () =>
    !isNaN(offer_id) &&
    // eslint-disable-next-line eqeqeq
    parseInt(Number(offer_id)) == offer_id &&
    !isNaN(parseInt(offer_id, 10)) &&
    parseInt(offer_id, 10) > 0;

  const getServiceOfferDetails = () => {
    api
      .get(`/barber/service_offer/${offer_id}/`)
      .then((res) => {
        setOfferDetails(res.data);
      })
      .catch(() => {
        navigate("/not_found");
      });
  };

  const connectToAbsenceWebsocket = () => {
    absenceWs.current = new WebSocket(
      `${WEBSOCKET_API_URL}/service_unavailabilities/${offer_id}/`
    );
    absenceWs.current.onmessage = (e) => {
      const message = JSON.parse(e.data);
      setAbsences(message ? message : []);
    };
  };

  const connectToOrdersWebsocket = () => {
    ordersWs.current = new WebSocket(
      `${WEBSOCKET_API_URL}/service_orders/${offer_id}/`
    );
    ordersWs.current.onmessage = (e) => {
      const message = JSON.parse(e.data);
      setOrders(message ? message : []);
    };
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth="lg"
        sx={{
          bgcolor: "white",
          boxShadow: "0px 0px 2px 0px rgb(0 0 0 / 20%)",
          minHeight: "100vh",
        }}
      >
        <Header accountType={"CUSTOMER"} />
        <main>
          {offerDetails ? (
            <BarberOfferDescription offerDetails={offerDetails} />
          ) : null}
        </main>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}
