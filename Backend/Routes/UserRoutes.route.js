import express from "express";

import { SaveUserDataToDB } from "../Controllers/User.js";
export const router = express.Router();

router.post("/save_user_data", SaveUserDataToDB);


