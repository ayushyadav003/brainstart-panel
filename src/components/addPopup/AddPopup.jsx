import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Dialog from "@mui/material/Dialog";
import "./addPopup.scss";
import { Autocomplete, Button, InputAdornment, TextField } from "@mui/material";
import { Close, CurrencyRupee } from "@mui/icons-material";

export default function AddPopup({
  type,
  open,
  setOpen,
  handleAddBatchSubmit,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  const submitForm = (e) => {
    e.preventDefault();
    handleAddBatchSubmit();
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={false}>
      <Close
        style={{
          position: "absolute",
          right: "25px",
          top: "15px",
          cursor: "pointer",
        }}
        onClick={handleClose}
      />
      <form onSubmit={submitForm}>
        {type === "class" && (
          <div className="popupBox">
            <h2>Add New Class</h2>
            <TextField placeholder="Title" className="field" fullWidth />
            <Autocomplete
              multiple
              options={[]}
              fullWidth
              getOptionLabel={(option) => option.title}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} placeholder="Add students" />
              )}
            />
            <Button variant="contained" className="submitBtn" type="submit">
              Add
            </Button>
          </div>
        )}
        {type === "batch" && (
          <div className="popupBox">
            <h2>Add New Batch</h2>
            <TextField
              placeholder="Title"
              name="title"
              className="field"
              fullWidth
            />
            <TextField
              placeholder="Fee"
              className="field"
              fullWidth
              name="fee"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CurrencyRupee />
                  </InputAdornment>
                ),
              }}
            />
            <div className="timeWrapper">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimePicker"]}>
                  <TimePicker label="From time" />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimePicker"]}>
                  <TimePicker label="To time" />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={[]}
              fullWidth
              getOptionLabel={(option) => option.title}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} placeholder="Add students" />
              )}
            />
            <Button variant="contained" className="submitBtn" type="submit">
              Add
            </Button>
          </div>
        )}

        {type === "students" && (
          <div className="popupBox">
            <h2>Add New Student</h2>
            <div className="subSection">
              <TextField placeholder="Fullname" className="field" fullWidth />
              <TextField placeholder="username" className="field" fullWidth />
            </div>
            <div className="subSection">
              <TextField placeholder="Phone" className="field" fullWidth />
              <TextField placeholder="Email" className="field" fullWidth />
            </div>
            <div className="subSection">
              <Autocomplete
                multiple
                id="tags-outlined"
                options={[]}
                fullWidth
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select Class" />
                )}
              />
              <Autocomplete
                multiple
                id="tags-outlined"
                options={[]}
                fullWidth
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select Batch" />
                )}
              />
            </div>
            <Button variant="contained" className="submitBtn">
              Add
            </Button>
          </div>
        )}
      </form>
    </Dialog>
  );
}
