import { Router } from 'express';
import { Response } from 'express';
// Routes
import { portal, GetPortalPage } from './portal';

export let router: Router = Router();

router.get('/', (req: any, res: Response) => {
   GetPortalPage(req, res);
});
router.use('/portal', portal);