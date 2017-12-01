// Public Imports
import { Response, Router } from 'express';
// Route Setup
export let portal: Router = Router();
// GET
portal.get('/', GetPortalPage);
export function GetPortalPage(request: any, response: Response) {
   RenderPortalPage(response);
}
// Render
export function RenderPortalPage(response: Response) {
   var page = 'portal/portal.hbs';
   console.log('Rendering ' + page);
   response.render(page);
}