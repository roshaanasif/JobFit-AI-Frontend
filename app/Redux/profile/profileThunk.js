
import { createAsyncThunk } from "@reduxjs/toolkit";
import {updateProfileApi,addProfilePictureApi,deleteProfilePictureApi } from "./profileServices";

export const updateProfile = createAsyncThunk(
  "profile/update",
  async ({profilePicture,name,email}, thunkAPI) => {
    try {
      return await updateProfileApi({profilePicture,name,email});

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "update profile failed"
      );
    }
  }
);
export const addProfilePicture = createAsyncThunk(
  "profile/addPicture",
  async (profile, thunkAPI) => {
    try {
      return await addProfilePictureApi(profile);

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "add profile picture failed"
      );
    }
  }
);
export const deleteProfilePicture = createAsyncThunk(
  "profile/deletePicture",
  async (_, thunkAPI) => {
    try {
      return await deleteProfilePictureApi();

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "delete profile picture failed"
      );
    }
  }
);