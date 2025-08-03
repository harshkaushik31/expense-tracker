import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Sidebar = () => {

  const navigate = useNavigate()
  const location = useLocation();
  const [image, setImage] = useState(null);
  const { user, axios, fetchUser, setUser, logout  } = useAppContext();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-gray-500">Please log in to access the sidebar</p>
      </div>
    );
  }

  const menuLinks = [
    { name: "Home", path: "/home" },
    { name: "Income", path: "/income" },
    { name: "Expenses", path: "/expenses" },
  ];



  const updateImage = async() => {
    // TODO: add function to update user image
    try {
      const formData = new FormData();
      formData.append("image", image);
      const { data } = await axios.post('/api/v1/user/update-image', formData)

      if (data.success) {
        fetchUser();
        setImage(null);
        alert("Image updated successfully");
      }else{
        console.log("Image update failed:", data.message);
      }


    } catch (error) {
      console.error("Error updating image:", error);
      alert("Failed to update image. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r text-sm">
      {/* User Profile */}
      <div className="flex items-center flex-col">
        <img
          src={
            image
              ? URL.createObjectURL(image)
              : user?.image ||
                "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300"
          }
          className="h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto"
          alt="User avatar"
        />

        <input
          type="file"
          id="upload-image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="hidden"
        />

        <label
          htmlFor="upload-image"
          className="mt-4 bg-violet-600 text-white px-4 py-1 rounded-sm cursor-pointer text-sm"
        >
          Upload Image
        </label>
        {image && (
          <button
            onClick={updateImage}
            className="absolute top-0 right-0 flex p-2 gap-1 bg-primary/10 text-primary cursor-pointer"
          >
            Save
          </button>
        )}
        <p className="mt-2 text-sm max-md:hidden">{user.name}</p>
      </div>

      <div className="flex flex-col w-full items-stretch">
        {menuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={({ isActive }) =>
              `w-full mt-2 px-4 py-2 text-left ${
                isActive ? "bg-violet-200" : ""
              } hover:bg-violet-100`
            }
          >
            {link.name}
          </NavLink>
        ))}
        <button
          onClick={() => {
            {/*TODO: do this using backend api */}
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate('/')
          }}
          className="w-full mt-2 px-4 py-2 text-left text-red-500 hover:bg-red-100"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
