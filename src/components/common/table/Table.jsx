/* eslint-disable react/prop-types */
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
import { Block, Delete, Edit } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

export default function CommonTable({ head, rows, type, onEdit, onDelete }) {
  console.log(rows);

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
        <TableBody>
          {rows.length > 0 &&
            rows.map((row, i) => (
              <TableRow key={i}>
                {type === "students" && (
                  <>
                    <TableCell component="th" scope="row">
                      {i + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.fullName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.email || "--"}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.phone || "--"}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.classes?.title}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.batches.length > 0 &&
                        row?.batches?.map((batch, i) => (
                          <span key={i}>{batch?.title}</span>
                        ))}
                    </TableCell>
                    <TableCell
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span className="icon">
                        <Edit fontSize="small" onClick={onEdit} />
                      </span>
                      <span className="icon">
                        <Delete
                          fontSize="small"
                          onClick={() => onDelete(row)}
                        />
                      </span>
                    </TableCell>
                  </>
                )}
                {type === "teachers" && (
                  <>
                    <TableCell component="th" scope="row">
                      {i + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.fullName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.email || "--"}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.phone || "--"}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.classes?.title}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.batches.length > 0 &&
                        row?.batches?.map((batch, i) => (
                          <span key={i}>{batch?.title}</span>
                        ))}
                    </TableCell>
                    <TableCell
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span className="icon">
                        <Edit fontSize="small" onClick={onEdit} />
                      </span>
                      <span className="icon">
                        <Delete
                          fontSize="small"
                          onClick={() => onDelete(row)}
                        />
                      </span>
                    </TableCell>
                  </>
                )}
                {type === "attendance" && (
                  <>
                    <TableCell component="th" scope="row">
                      {i + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.fullName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.classes?.title}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.batches.length > 0 &&
                        row?.batches?.map((batch, i) => (
                          <span key={i}>{batch?.title}</span>
                        ))}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.attendance?.length > 0 &&
                        row?.attendance?.slice(0, -1).map((attendance) => {
                          const status = attendance?.batch[0]?.status;
                          return (
                            <span
                              key={attendance._id}
                              className="attendanceStatus"
                              style={{
                                backgroundColor:
                                  status === "ab"
                                    ? "#ec5d77"
                                    : status === "p"
                                    ? "#79B791"
                                    : "gray",
                              }}
                            >
                              {status}
                            </span>
                          );
                        })}
                    </TableCell>

                    <TableCell>
                      <FormControl>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          style={{ display: "flex", alignItems: "center" }}
                          onChange={(e) => onEdit(e.target.value, row?._id)}
                          defaultValue={
                            row?.attendance[row?.attendance.length - 1]
                              ?.batch[0]?.status
                          }
                        >
                          <FormControlLabel
                            value="p"
                            control={<Radio color="success" />}
                            label="P"
                          />
                          <FormControlLabel
                            value="ab"
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
                {type === "support" && (
                  <>
                    <TableCell component="th" scope="row">
                      {row?.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.title}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.desc}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.createdAt}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <span
                        style={{
                          background:
                            row?.status === "Resolved" ? "#809a7a" : "#ec5d77",
                          color: "#fff",
                          borderRadius: "15px",
                          padding: "5px 10px",
                        }}
                      >
                        {row?.status}
                      </span>
                    </TableCell>
                    <TableCell
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span className="icon">
                        <Tooltip title="Edit Ticket">
                          <Edit fontSize="small" onClick={onEdit} />
                        </Tooltip>
                      </span>
                      <span className="icon">
                        <Tooltip title="Close Ticket">
                          <Block fontSize="small" onClick={onDelete} />
                        </Tooltip>
                      </span>
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
