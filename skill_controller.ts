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

// Basic in-memory cache
const cache: Record<string, any> = {};

export const createSkill = async (req: Request, res: Response) => {
  try {
    const skill = new Skill({
      name: req.body.name,
      level: req.body.level,
    });

    const newSkill = await skill.save();

    // Invalidate cache as new skill is added
    cache['allSkills'] = undefined;

    res.status(201).json(newSkill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSkills = async (_: Request, res: Response) => {
  try {
    // Use cache if available
    if (cache['allSkills']) {
      return res.status(200).json(cache['allSkills']);
    }

    const skills: LeanDocument<any>[] = await Skill.find().lean();

    // Update cache
    cache['allSkills'] = skills;

    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSkill = async (req: Request, res: Response) => {
  try {
    // Check cache first
    if (cache[`skill_${req.params.id}`]) {
      return res.json(cache[`skill_${req.params.id}`]);
    }

    const skill: LeanDocument<any> | null = await Skill.findById(req.params.id).lean();
    if (skill) {
      // Update cache
      cache[`skill_${req.params.id}`] = skill;

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
      // Update cache with new data
      cache[`skill_${req.params.id}`] = skill;
      // Also invalidate the allSkills cache to reflect update
      cache['allSkills'] = undefined;

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
      // Invalidate caches as skill is deleted
      cache[`skill_${req.params.id}`] = undefined;
      cache['allSkills'] = undefined;

      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Skill not found!' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};