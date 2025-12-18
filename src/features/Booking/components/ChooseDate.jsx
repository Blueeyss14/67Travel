import colors from "../../../res/colors";
import dayjs from "dayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TextField } from "@mui/material";

const ChooseDate = ({ selectedDate, setSelectedDate }) => {
  
  const handleDateChange = (newValue) => {
    if (newValue) {
      const formatted = dayjs(newValue).format("YYYY-MM-DD HH:mm:ss");
      setSelectedDate(formatted);
    } else {
      setSelectedDate(null);
    }
  };

  return (
    <div className="w-full mb-5">
      <h1
        style={{ color: colors.primary }}
        className="font-bold text-[1rem] mb-5"
      >
        Tanggal dan Waktu
      </h1>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Pilih tanggal dan waktu"
          value={selectedDate ? dayjs(selectedDate) : null}
          onChange={handleDateChange}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />
          )}
        />
      </LocalizationProvider>

      {selectedDate && (
        <p className="text-xs mt-2 text-gray-600">
          Dipilih: {dayjs(selectedDate).format("DD/MM/YYYY HH:mm")}
        </p>
      )}
    </div>
  );
};

export default ChooseDate;