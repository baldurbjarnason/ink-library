import { Application } from 'stimulus';
import controllers from 'stimulus-controllers';
 
// Files named along this pattern `[identifier]_controller.js` should be auto imported

const application = Application.start();
application.load(controllers);