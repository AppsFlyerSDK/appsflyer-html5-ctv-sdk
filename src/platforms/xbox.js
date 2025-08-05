import { Platform } from "./utils/types.js";
import CustomPlatform from "./custom.js";

class Xbox extends CustomPlatform {
  constructor() {
    super(Platform.Xbox);
  }
}

export default Xbox;
