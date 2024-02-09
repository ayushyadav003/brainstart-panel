import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import "./table.scss";
import { Edit, RemoveRedEye } from "@mui/icons-material";

export default function CommonTable({ head, rows, type }) {
  return (
    <TableContainer component={Paper} className="tableContainer">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {head &&
              head.map((item, i) => (
                <TableCell key={i} className="boldCell">
                  {item}
                </TableCell>
              ))}
            <TableCell className="boldCell">{"Action"}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="bodyStyle">
          {rows &&
            rows.map((row, i) => (
              <TableRow
                key={row.name}
                className={i % 2 === 0 ? "rowBackground" : ""}
              >
                {type === "students" && (
                  <>
                    <TableCell component="th" scope="row">
                      {row?.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.phone}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.class}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.batch}
                    </TableCell>
                    <TableCell
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span className="icon">
                        <RemoveRedEye fontSize="medium" />
                      </span>
                      <span className="icon">
                        <Edit fontSize="medium" />
                      </span>
                    </TableCell>
                  </>
                )}
                {type === "attendace" && (
                  <>
                    <TableCell component="th" scope="row">
                      {row?.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.class}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.batch}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ display: "flex" }}
                    >
                      {row?.record.length > 0 &&
                        row.record.map((val, i) => {
                          return (
                            <span
                              key={i}
                              className="record"
                              style={{
                                background:
                                  val === "p"
                                    ? "green"
                                    : val === "ab"
                                    ? "red"
                                    : "gray",
                              }}
                            ></span>
                          );
                        })}
                    </TableCell>
                    <TableCell>
                      <FormControl>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                        >
                          <FormControlLabel
                            value="p"
                            control={<Radio color="success" />}
                            label="P"
                          />
                          <FormControlLabel
                            value="a"
                            control={<Radio color="error" />}
                            label="A"
                          />
                          <FormControlLabel
                            value="l"
                            control={<Radio style={{ color: "gray" }} />}
                            label="L"
                          />
                        </RadioGroup>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <RemoveRedEyeIcon />
                    </TableCell>
                  </>
                )}
                {type === "accounts" && (
                  <>
                    <TableCell component="th" scope="row">
                      {row?.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.class}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.batch}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.record}
                    </TableCell>
                    {/*                     
                    <TableCell component="th" scope="row">
                      {row?.status}
                    </TableCell> */}
                    <TableCell component="th" scope="row">
                      {row?.currentMonth}
                    </TableCell>
                    <TableCell>
                      <RemoveRedEyeIcon />
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
