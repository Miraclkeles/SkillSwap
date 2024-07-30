import express from 'express';
import mongoose, { LeanDocument } from 'mongoose';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const skillSchema = new mongoose.Schema({
  name: String,
  level: String,
});
const Skill = mongoose.model('Skill', skillSchema);

export const createSkill = async (req: Request, res: Response) => {
  try {
    const skill = new Skill({
      name: req.body.name,
      level: req.body.level,
    });

    const newSkill = await skill.save();
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSkills = async (_: Request, res: Response) => {
  try {
    const skills: LeanDocument<any>[] = await Skill.find().lean();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSkill = async (req: Request, res: Response) => {
  try {
    const skill: LeanDocument<any> | null = await Skill.findById(req.params.id).lean();
    if (skill) {
      res.json(skill);
    } else {
      res.status(404).json({ message: 'Skill not found!' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSkill = async (req: Request, res: Response) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
    if (skill) {
      res.json(skill);
    } else {
      res.status(404).json({ message: 'Skill not found!' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSkill = async (req: Request, res: Response) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (skill) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Skill not found!' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};