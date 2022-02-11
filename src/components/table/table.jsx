import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from "./table.module.css";
import CountUp from "react-countup";
import { FormControl,NativeSelect } from '@mui/material';

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
  '&:nth-of-type(odd)': {
    backgroundColor: "#f3f2f8",
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables({data,handletypeChange}) {
  const [rows,setRows]=React.useState([]);

  React.useEffect(function(){
    setRows(data.map(function(item){
      return {country:item.country,val:item.val};
    }));

  },[data]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell colSpan={2}>Countries with most <FormControl className={styles.formControl}>
              <NativeSelect defaultValue="active cases" className={styles.select} onChange={function(event){
                handletypeChange(event.target.value);
              }}>
                <option value="active cases">active cases</option>
                <option value="total cases">total cases</option>
                <option value="today cases">new cases</option>
                <option value="recoveries">recoveries</option>
                <option value="recoveries today">recoveries today</option>
                <option value="deaths">deaths</option>
                <option value="deaths today">deaths today</option>
              </NativeSelect></FormControl></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.country}
              </StyledTableCell>
              <StyledTableCell align="right"><CountUp 
                        start={0}
                        end={row.val}
                        duration={2.5}
                        separator=","
                    /></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}