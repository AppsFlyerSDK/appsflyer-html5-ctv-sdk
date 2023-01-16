export class Auth {
  constructor() {
    this.generateSignature = async function(key, message) {
        const getUtf8Bytes = (str) => new Uint8Array(
            [...unescape(encodeURIComponent(str))].map((c) => c.charCodeAt(0)),
        );

        const keyBytes = getUtf8Bytes(key);
        const messageBytes = getUtf8Bytes(message);

        const cryptoKey = await crypto.subtle.importKey(
            'raw', keyBytes, {name: 'HMAC', hash: 'SHA-256'},
            true, ['sign'],
        );
        const sig = await crypto.subtle.sign('HMAC', cryptoKey, messageBytes);

        // to lowercase hexits
        let result;
        if (!String.prototype.padStart) {
          result = [...new Uint8Array(sig)].map((b) => this.padStart(b.toString(16), 2, '0')).join('');
        }else{ 
          result = await [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('');
        }      
        return result;
    };

    this.padStart = (strInput, targetLength,padString) => {
        targetLength = targetLength>>0; //truncate if number or convert non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));

        if (strInput.length > targetLength) {
            return String(strInput);
        }
        else {
            targetLength = targetLength-strInput.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
            }
            return String(padString.slice(0,targetLength) + String(strInput));
        }
    };
  }
  

}
