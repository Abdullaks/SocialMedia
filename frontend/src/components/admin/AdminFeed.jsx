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
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers,reset} from "../../features/admin/adminSlice";

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
    console.log("users use effect");
    dispatch(getAllUsers())
    return ()=>{
      dispatch(reset())
    }
  }, [dispatch]);

  return (
    <Box flex={5} p={2}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell >Email</StyledTableCell>
              <StyledTableCell >Block/UnBlock</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody> 
            {users.map((row) => ( 
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">{row.username}</StyledTableCell>
                <StyledTableCell >{row.email}</StyledTableCell>
                <StyledTableCell ></StyledTableCell>
                <StyledTableCell ><Button
                 onClick={() => dispatch(deleteUser(row._id))}
                  variant="contained">Delete</Button></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
