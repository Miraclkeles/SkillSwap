import express from 'express';
import { skillController } from './controllers/skillController';
import { profileController } from './controllers/profileController';

const router = express.Router();

router.post('/skills', skillController.createSkill);
router.get('/skills', skillController.getAllSkills);
router.get('/skills/:id', skillController.getSkillById);
router.put('/skills/:id', skillController.updateSkill);
router.delete('/skills/:id', skillController.deleteSkill);

router.post('/profiles', profileController.createProfile);
router.get('/profiles', profileController.getAllProfiles);
router.get('/profiles/:id', profilepublicController.getProfileById);
router.put('/profiles/:id', profileController.updateProfile);
router.delete('/profiles/:id', profileController.deleteProfile);

export default router;