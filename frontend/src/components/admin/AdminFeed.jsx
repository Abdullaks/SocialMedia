import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  blockUser,
  deleteUser,
  getAllUsers,
  reset,
  unBlockUser,
} from "../../features/admin/adminSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AdminTable() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  React.useEffect(() => {
    dispatch(getAllUsers());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);
  return (
    <Box flex={5} p={2}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Block/UnBlock</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row, i) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell>{i + 1}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.username}
                </StyledTableCell>
                <StyledTableCell>{row.email}</StyledTableCell>
                <StyledTableCell>
                  {row.isBlock ? (
                    <Button
                      style={{ backgroundColor: "green", color: "white" }}
                      onClick={() => {
                        dispatch(unBlockUser(row._id));
                        dispatch(getAllUsers());
                      }}
                      variant="contained"
                    >
                      UnBlock
                    </Button>
                  ) : (
                    <Button
                      style={{ backgroundColor: "red", color: "white" }}
                      onClick={() => {
                        dispatch(blockUser(row._id));
                        dispatch(getAllUsers());
                      }}
                      variant="contained"
                    >
                      Block
                    </Button>
                  )}
                </StyledTableCell>
                <StyledTableCell>
                  <Button
                    style={{ backgroundColor: "red", color: "white" }}
                    onClick={() => dispatch(deleteUser(row._id))}
                    variant="contained"
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
