import api from "../../lib/axios";

export const updateProfileApi = async ({profilePicture,name,email}) => {

    
  const response = await api.put(
    "profile/",
    {profilePicture,name,email}
  );
  return response.data;
};

export const addProfilePictureApi = async (profile) => {
  const formData = new FormData();
  formData.append("profilePicture", profile);

  const response = await api.post(
    "profile/picture",
    formData
  );
  return response.data;
};

export const deleteProfilePictureApi = async () => {
  const response = await api.delete("profile/picture");
  return response.data;
};
