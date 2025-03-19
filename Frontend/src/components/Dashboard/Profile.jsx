import React, { useState } from "react";
import ProfilePicturePlaceholder from "../../assets/ProfilePicturePlaceholder.png";
import HiPencilAlt from "../../assets/HiPencilAlt.png";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Dhimas Nurhanindya Putra");
  const [email, setEmail] = useState("dhimasnurhanindyaputra@wik.com");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you can add logic to save the changes to a backend or state management
  };

  return (
    <div className="relative bg-white w-96 h-full rounded-xl shadow-lg p-6">
      <div className="flex flex-col items-center gap-y-4">
        <h2 className="text-xl font-semibold text-[#573C27]">Profile</h2>

        {/* PROFILE PICTURE */}
        <div className="relative size-72 mb-4">
          <img
            src={image || ProfilePicturePlaceholder}
            alt="Profile"
            className="w-full h-full rounded-xl object-cover"
          />
          {isEditing && (
            <label
              htmlFor="image-upload"
              className="absolute bottom-0 right-0 bg-[#C95588] rounded-md p-1 cursor-pointer">
              <img src={HiPencilAlt} alt="Edit Icon" className="size-8" />
              <input
                id="image-upload"
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>

        <div className="gap-y-1 flex min-w-64 flex-col items-center">
          {/* NAMA */}
          {isEditing ? (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mb-2 text-[#573C27] text-center w-full px-3 py-2 border rounded-sm border-[#573C27]"
                placeholder="Type your name here"
              />
              <p className="-mt-2 text-slate-500 italic">
                change your name or face image above
              </p>
            </>
          ) : (
            <h2 className="text-base text-[#573C27] font-semibold">
              {name ? (
                name
              ) : (
                <span className="text-red-500 italic text-base">
                  Please add your name
                </span>
              )}
            </h2>
          )}
          {/* EMAIL */}
          {isEditing ? null : (
            <p className="text-[#573C27] text-base">{email}</p>
          )}
        </div>
      </div>

      {/* BUTTON */}
      <button
        onClick={isEditing ? handleSave : () => setIsEditing(true)}
        className="absolute inset-x-0 bottom-10 px-4 py-2 mx-8 bg-[#C95588] text-white rounded hover:brightness-[0.95] cursor-pointer transition-all duration-300">
        {isEditing ? "Save" : "Edit"}
      </button>
    </div>
  );
};

export default Profile;
