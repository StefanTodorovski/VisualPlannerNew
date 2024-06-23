import React from "react";
import HeaderSmall from "../components/headerSmall/HeaderSmall";
import Footer from "../components/footer/Footer";
import EditProfileForm from "../components/editProfileForm/EditProfileForm";
import "../components/editProfileForm/EditProfileForm.css";

const EditProfilePage = ({ user }) => {
  return (
    <div>
      <HeaderSmall />
      <div className="edit-profile-container">
        <EditProfileForm user={user} />
      </div>
      {/*<Footer />*/}
    </div>
  );
};

export default EditProfilePage;
