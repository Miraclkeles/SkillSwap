import express, { Request, Response, NextFunction } from 'express';
import { skillController } from './controllers/skillController';
import { profileController } from './controllers/profileController';

const router = express.Router();

// Middleware for logging requests
const logRequest = (req: express.Request, _: express.Response, next: express.NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} request to ${req.url}`);
  next();
};

// Error handling middleware
const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`[Error] ${err.message}`);
  res.status(500).send({error: err.message});
};

// Wrap function for catching errors in async functions
const catchErrors = (fn: Function) => {
  return function(req: Request, res: Response, next: NextFunction) {
    return fn(req, res, next).catch(next);
  };
};

// Apply the logging middleware to all requests
router.use(logRequest);

// Skills routes with error handling
router.post('/skills', catchErrors(skillController.createSkill));
router.get('/skills', catchErrors(skillService.getAllSkills));
router.get('/skills/:id', catchErrors(skillController.getSkillById));
router.put('/skills/:id', catchErrors(skillController.updateSkill));
router.delete('/skills/:id', catchErrors(skillController.deleteSkill));

// Profiles routes with error handling
router.post('/profiles', catchErrors(profileController.createProfile));
router.get('/profiles', catchErrors(profileController.getAllProfiles));
router.get('/profiles/:id', catchErrors(profileController.getProfileById));
router.put('/profiles/:id', catchErrors(profileController.updateProfile));
router.delete('/profiles/:id', catchErrors(profileService.deleteProfile));

// Use the error handling middleware after all other middleware and routes
router.use(handleError);

export default router;