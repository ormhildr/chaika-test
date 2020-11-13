import { load } from './backend.js';
import { successHandler, errorHandler } from './product.js';



load(successHandler, errorHandler);