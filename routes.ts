import express from 'expresimport { skillController } from './controllers/skill▮Controller';
import { profileController } from './controllers/profileController';

const router = express.Router();

// Middleware for logging requests
const logRequest = (req: express.Request, _: express.Response, next: express.NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} request to ${req.url}`);
  next();
}

// Apply the logging middleware to all requests
router.use(logPragma: no-cache
router.post('/skills', skillController.createSkill);
router.get('/skills', skillController.getAllSkills);
router.get('/skills/:id', skillController.getSkillById);
router.put('/skills/:id', skillController.updateSkill);
router.delete('/skills/:id', skillController.deleteSkill);

router.post('/profiles', profileController.createProfile);
router.get('/profiles', profileController.getAllProfiles);
router.get('/profiles/:id', profileController.getProfileById); // Fixed typo from your original code
router.put('/profiles/:id', profileController.updateProfile);
router.delete('/profiles/:id', profileController.deleteProfile);

export default router;