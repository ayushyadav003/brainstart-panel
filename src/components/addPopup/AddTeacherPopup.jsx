import * as Yup from "yup"; // Import Yup for validation
import Dialog from "@mui/material/Dialog";
import "./addPopup.scss";
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  // CircularProgress,
  InputAdornment,
  Switch,
  TextField,
} from "@mui/material";
import { Close, CurrencyRupee } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { apiConfig } from "../../services/ApiConfig";
import { useSelector } from "react-redux";
import { ApiWithToken } from "../../services/ApiWithToken";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function AddPopup({ open, setOpen, onSubmit }) {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [batches, setBatches] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = async (data) => {
    setLoading(true);
    await onSubmit(data, reset);
    setLoading(false);
  };

  const getAllClasses = async () => {
    try {
      const apiOPtions = {
        method: "GET",
        url: apiConfig.class,
        params: { institute: currentUser?._id },
      };
      const response = await ApiWithToken(apiOPtions);

      if (response?.statusCode === 200) {
        setClasses(response?.classes);
      }
    } catch (error) {
      // toast.warning(error?.response?.data?.message);
    }
  };
  const getAllBatches = async () => {
    try {
      const apiOPtions = {
        method: "GET",
        url: apiConfig.batch,
        params: {
          institute: currentUser?._id,
          classId: selectedClass?._id,
        },
      };
      const response = await ApiWithToken(apiOPtions);

      if (response?.statusCode === 200) {
        setBatches(response?.batches);
      }
    } catch (error) {
      // toast.warning(error?.response?.data?.message)
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedClass) {
      getAllBatches();
    }
  }, [selectedClass]);

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
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="popupBox">
          <h2>Add New Teacher</h2>
          <div className="subSection">
            <TextField
              placeholder="Full Name"
              {...register("ownerName")}
              required
              className="field"
              fullWidth
            />

            <TextField
              placeholder="Phone"
              {...register("phone")}
              className="field"
              required
              fullWidth
            />
          </div>
          <div className="subSection">
            <TextField
              placeholder="Email"
              required
              {...register("email")}
              className="field"
              fullWidth
            />
          </div>
          <Button variant="contained" className="submitBtn" type="submit">
            Add
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
