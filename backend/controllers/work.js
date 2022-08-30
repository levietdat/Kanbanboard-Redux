import { Work } from "../models/work.models.js";

export const getWork = async (req, res) => {
  try {
    const data = await Work.find(); 
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const postWork = async (req, res) => {
  try {
    const newWork = req.body;
    const postNewWork = await Work(newWork);
    res.status(200).json(postNewWork);
    postNewWork.save();
  } catch (err) {
    res.status(500).send(err.message);
  }
};
export const updateWork = async (req, res) => {
  console.log("avb",req.params)
  try {
    const id = req.params.id;
    console.log(id);
    const updateWork = await Work.findOneAndUpdate({_id: id}, req.body, { new: true });
    console.log(updateWork);
    res.status(200).json(updateWork);
    updateWork.save();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteWork = async (req, res) => {
    try {
      const id = req.params.id;
      const deleteWork = await Work.findOneAndDelete({_id: id},{ new: true });
      res.status(200).json(deleteWork);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
  
