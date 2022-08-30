import express from "express";
import { deleteWork, getWork, postWork, updateWork } from "../controllers/work.js";
const router = express.Router();


router.get('/',getWork)

router.post('/',postWork)

router.put('/:id',updateWork)

router.delete('/:id',deleteWork)

export default router