import {Platform} from './utils/types.js';
import CustomPlatform from './custom.js';

class Vidaa extends CustomPlatform {
  constructor(){
    super(Platform.Vidaa);
  }
}

export default Vidaa;