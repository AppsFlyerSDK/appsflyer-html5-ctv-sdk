import {Platform} from '../types/types.js';
import CustomPlatform from './custom.js';

class Vizio extends CustomPlatform {
  constructor(){
    super(Platform.Smartcast);
  }
}

export default Vizio;