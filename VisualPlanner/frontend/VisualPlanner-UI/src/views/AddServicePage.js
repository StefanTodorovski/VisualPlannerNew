import React from "react";
import "../components/addServiceForm/addServiceForm.css";
import AddServiceForm from "../components/addServiceForm/addServiceForm";
import HeaderSmall from "../components/headerSmall/HeaderSmall";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App({ activityTypes, petTypes, userId, user, refreshUserPosts }) {
  return (
    <div className="app-container">
      <HeaderSmall user={user} />
      <div className="content-container">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AddServiceForm
            activityTypes={activityTypes}
            petTypes={petTypes}
            userId={userId}
            refreshUserPosts={refreshUserPosts}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
}

export default App;
