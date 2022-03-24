import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BarberListItem from "./BarberListItem";
import ImageWithCustomizableText from "./ImageWithCustomizableText";
import useAxios from "../utils/useAxios";

const notFoundImageData = {
  title: "Results not found...",
  description:
    "Please adjust searching criteria. Provide more precise hairdresser name, city where you would like to book a visit or hair salon address. ",
  image: "https://source.unsplash.com/random/?hairdresser",
  imageText: "Results not found.",
};

// TODO fix <div> cannot be a child of tr/td warning in the browser console

export default function BarberList(props) {
  const { searchPhrase } = props;
  const [numOfResults, setNumOfResults] = useState(0);
  const [page, setPage] = useState(0);
  const [results, setResults] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const api = useAxios();

  useEffect(() => {
    setPage(0);
    sendRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchPhrase, rowsPerPage]);

  useEffect(() => {
    sendRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const sendRequest = () => {
    api
      .get(
        `/barber/service_offers/?page_size=${rowsPerPage}&page=${
          page + 1
        }&search=${searchPhrase}`
      )
      .then((res) => {
        setNumOfResults(res.data.count);
        setResults(res.data.results);
      })
      .catch((error) => {
        setNumOfResults(0);
        setResults([]);
      });
  };

  const handleClick = (event, name) => {
    console.log("handleClick - " + name);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return results && results.length > 0 ? (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table aria-labelledby="tableTitle" size="medium">
            <TableBody>
              {results.map((result) => {
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, result.id)}
                    tabIndex={-1}
                    key={result.id}
                  >
                    <BarberListItem {...result} />
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={numOfResults}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  ) : (
    <ImageWithCustomizableText data={notFoundImageData} />
  );
}
