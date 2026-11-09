
"use client";

import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch,useSelector } from "react-redux";
import {  useRouter } from "next/navigation";

import {
  faUser,
  faEnvelope,
  faCamera,
  faPlus,
  faTrash,
  faEdit,
  faSave,
  faXmark,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import {updateProfile,addProfilePicture,deleteProfilePicture} from "../../Redux/profile/profileThunk";

export default function ProfilePage() {
  const fileInputRef = useRef(null);
  const dispatch=useDispatch()
  const router=useRouter()


   const {  user
  } = useSelector(
      (state) => state.auth
    );
  

  const { 
  profile,  
  profileLoading,
  profilePictureLoading,
  deleteProfilePictureLoading
 } = useSelector(
    (state) => state.profile
  );

 const currentProfile = profile || user || {};

const [formData, setFormData] = useState({
  name: "",
  email: "",
  profilePicture:"",
});

const [previewImage, setPreviewImage] = useState("");
const [isEditing, setIsEditing] = useState(false);
const [message, setMessage] = useState("");


const showMessage = (text) => {
  setMessage(text);

  setTimeout(() => {
    setMessage("");
  }, 3000);
};

useEffect(() => {
  setFormData({
    name: currentProfile.name || "",
    email: currentProfile.email || "",
  });

  setPreviewImage(currentProfile?.profilePicture || "");
}, [
  currentProfile.name,
  currentProfile.email,
  currentProfile.profilePicture,
]);


const hasProfileImage = Boolean(
  isEditing
    ? previewImage
    : currentProfile?.profilePicture
);

  // Open image picker
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // Handle selected image
 const handleImageChange = async (e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    showMessage("Please select a valid image.");
    e.target.value = "";
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    showMessage("Image size must be less than 5MB.");
    e.target.value = "";
    return;
  }


  try {
    if (isEditing) {
      // Preview only. Upload when Update Profile is clicked.
      const imageUrl = URL.createObjectURL(file);

      setFormData((prev) => ({
        ...prev,
        profilePicture: file,
      }));

      setPreviewImage(imageUrl);
    } else {
      // Add/update picture immediately.
      const result = await dispatch(
        addProfilePicture(file)
      ).unwrap();

      showMessage(
        result?.message || "Profile picture updated successfully."
      );
    }
  } catch (error) {
    showMessage(
      typeof error === "string"
        ? error
        : "Unable to upload profile picture."
    );
  } finally {
    e.target.value = "";
  }
};



  // Handle name/email changes
  const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  // Save profile
 const handleSave = async () => {
  if (!formData.name.trim() || !formData.email.trim()) {
    showMessage("Name and email are required.");
    return;
  }

  if (formData.name.trim()==currentProfile?.name && formData.email.trim()==currentProfile?.email && !formData.profilePicture) {
    showMessage("you should have to edit something");
    return;
  }

  try {
    // First update name and email.
    await dispatch(
      updateProfile({
        name: formData.name.trim(),
        email: formData.email.trim(),
      })
    ).unwrap();

    // Upload picture only if a new file was selected.
    if (formData.profilePicture instanceof File) {
      await dispatch(
        addProfilePicture(formData.profilePicture)
      ).unwrap();
    }

    setIsEditing(false);
    showMessage("Profile updated successfully.");
  } catch (error) {
    showMessage(
      typeof error === "string"
        ? error
        : "Unable to update profile."
    );
  }
};

const handleEdit = () => {
  setFormData({
    name: currentProfile.name || "",
    email: currentProfile.email || "",
    profilePicture: null,
  });

  setPreviewImage(currentProfile.profilePicture || "");
  setIsEditing(true);
};

const handleCancel = () => {
  setFormData({
    name: currentProfile.name || "",
    email: currentProfile.email || "",
    profilePicture: null,
  });

  setPreviewImage(currentProfile.profilePicture || "");
  setIsEditing(false);
};
  // Delete profile image
const handleDeleteImage = async () => {

  try {
    const result = await dispatch(
      deleteProfilePicture()
    ).unwrap();

    setPreviewImage("");

    showMessage(
      result?.message || "Profile picture deleted successfully."
    );
  } catch (error) {
    showMessage(
      typeof error === "string"
        ? error
        : "Unable to delete profile picture."
    );
  }
};
  // Clean up temporary image previews
  useEffect(() => {
    return () => {
      if (previewImage?.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-[#1D4ED8]">
            ACCOUNT SETTINGS
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#111827]">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-[#64748B]">
            Manage your personal information and profile picture.
          </p>
        </div>



        {/* Profile Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
    
        <button
        type="button"
        onClick={() => router.push("/dashboard")}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        Back
      </button>

          {/* Profile Picture */}
          <div className="flex flex-col items-center text-center">

           
         


            <div className="relative">
              <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-blue-100 bg-blue-50 text-5xl text-blue-600">
                {hasProfileImage ? (
                  <img
                    src={
                      isEditing
                        ? previewImage
                        : currentProfile?.profilePicture
                    }
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FontAwesomeIcon icon={faUser} />
                )}
              </div>

              {isEditing && (
                <button
                  type="button"
                  onClick={handleImageClick}
                  className="absolute bottom-1 right-1 cursor-pointer flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-[#1D4ED8] text-white shadow-sm hover:bg-blue-800"
                  title="Change profile picture"
                >
                  <FontAwesomeIcon icon={faCamera} />
                </button>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleImageChange}
              className="hidden"
            />

            {/* Profile Picture Actions */}
            {!isEditing && (
              <div className="mt-5 flex flex-wrap justify-center gap-3">

                {!currentProfile?.profilePicture ? (
                 <button
                    type="button"
                    onClick={handleImageClick}
                    disabled={profilePictureLoading}
                    className="flex items-center gap-2 rounded-xl bg-[#1D4ED8] px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {profilePictureLoading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faPlus} />
                        Add Profile Picture
                      </>
                    )}
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleImageClick}
                      disabled={profilePictureLoading}
                      className="flex items-center gap-2 rounded-xl bg-blue-700 hover:bg-blue-800 px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      { profilePictureLoading ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faSave} />
                          Update Profile
                        </>
                      )}
                    </button>
                    

                    <button
                      type="button"
                      onClick={handleDeleteImage}
                       disabled={deleteProfilePictureLoading}
                      className="flex items-center gap-2 rounded-xl border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      

                      {deleteProfilePictureLoading ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                          deleting ...
                        </>
                      ) : (
                        <>
                         <FontAwesomeIcon icon={faTrash} />
                         Delete Picture
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="mt-8 border-t border-gray-100 pt-8">

            {!isEditing ? (
              <>
                {/* View Profile Information */}
                <div className="space-y-5">

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Full Name
                    </label>

                    <button
                      type="button"
                      onClick={handleEdit}
                      className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-left hover:border-blue-400"
                    >
                      <span className="flex items-center gap-3 text-sm text-gray-700">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="text-gray-400"
                        />
                        {user?.name || "Enter Your Name"}
                      </span>

                      <FontAwesomeIcon
                        icon={faEdit}
                        className="text-gray-400"
                      />
                    </button>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Email Address
                    </label>

                    <button
                      type="button"
                      onClick={handleEdit}
                      className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-left hover:border-blue-400"
                    >
                      <span className="flex items-center gap-3 text-sm text-gray-700" >
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className="text-gray-400"
                        />
                        {user?.email || "Enter Your Email"}
                      </span>

                      <FontAwesomeIcon
                        icon={faEdit}
                        className="text-gray-400"
                      />
                    </button>
                  </div>

                </div>

                {/* Edit Profile Button */}
                <button
                  type="button"
                  onClick={handleEdit}
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1D4ED8] px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
                >
                  <FontAwesomeIcon icon={faEdit} />
                  Edit Profile
                </button>
              </>
            ) : (
              <>
                {/* Edit Profile Form */}
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-[#111827]">
                    Update Profile
                  </h2>

                  <p className="mt-1 text-sm text-[#64748B]">
                    Update your name, email and profile picture.
                  </p>
                </div>

                <div className="space-y-5">

                  {/* Name */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Full Name
                    </label>

                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Email Address
                    </label>

                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Profile Picture
                    </label>

                    <button
                      type="button"
                      onClick={handleImageClick}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-[#F8FAFC] px-4 py-5 text-sm font-medium text-gray-600 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
                    >
                      <FontAwesomeIcon icon={faCamera} />
                      {previewImage
                        ? "Choose Another Image"
                        : "Upload Profile Picture"}
                    </button>

                    <p className="mt-2 text-xs text-gray-400">
                      JPG, PNG or WebP. Maximum size: 5MB.
                    </p>
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="mt-7 flex flex-wrap justify-end gap-3">

                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={profileLoading || profilePictureLoading}
                    className="flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                  >
                    <FontAwesomeIcon icon={faXmark} />
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={profileLoading}
                    className="flex items-center gap-2 rounded-xl bg-[#1D4ED8] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
                  >
                    { profileLoading ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faSave} />
                          Update Profile
                        </>
                      )}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Feedback */}
          {message && (
            <p className="mt-5 text-center text-sm text-blue-700">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
