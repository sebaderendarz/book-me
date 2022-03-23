import { useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BarberListItem from "./BarberListItem";
import ImageWithCustomizableText from "./ImageWithCustomizableText";

const rows = [
  {
    id: 1,
    address: "st. Solna 24",
    barberName: "Naughty Alice",
    city: "Warsaw",
    price: "50.00",
    thumbnail: "https://source.unsplash.com/random/?pretty+girl",
    updatedAt: "2020-03-18T08:26:30+0000",
  },
  {
    id: 2,
    address: "st. Solna 24",
    barberName: "Dirty Joey",
    city: "Warsaw",
    price: "70.00",
    thumbnail: "https://source.unsplash.com/random/?young+man",
    updatedAt: "2021-03-18T08:26:30+0000",
  },
  {
    id: 3,
    address: "st. Solna 24",
    barberName: "Sneaky Martin",
    city: "Warsaw",
    price: "90.00",
    thumbnail: "https://source.unsplash.com/random/?guy",
    updatedAt: "2022-03-18T08:26:30+0000",
  },
];

const notFoundImageData = {
  title: "Results not found...",
  description:
    "Please adjust searching criteria. Provide more precise hairdresser name, city where you would like to book a visit or hair salon address. ",
  image: "https://source.unsplash.com/random/?hairdresser",
  imageText: "Results not found.",
};

function comparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0], "updated");
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function BarberList(props) {
  const { searchPhrase } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleClick = (event, name) => {
    console.log("handleClick - " + name);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return rows && rows.length > 0 ? (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table aria-labelledby="tableTitle" size="medium">
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      tabIndex={-1}
                      key={row.id}
                    >
                      <BarberListItem {...row} />
                    </TableRow>
                  );
                })}
              {/*TODO remove next 9 lines? CHeck comment above the const emptyRows =*/}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 20 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[1, 2, 5, 10, 25, 50]}
          component="div"
          count={rows.length}
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
