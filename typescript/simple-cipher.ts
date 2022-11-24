export class SimpleCipher {
  key: string;
  static characters = 'abcdefghijklmnopqrstuvwxyz';

  constructor(key = '') {
    this.key = key || SimpleCipher.generateKey();
  }

  public static generateKey(): string {
    let result = '';
    for (let i = 0; i < 100; i++) {
      result += this.characters.charAt(Math.floor(Math.random() * 26));
    }
    return result;
  }

  private transcode(c: string, k: string, isEncoding = true): string {
    const shift = SimpleCipher.characters.indexOf(k);
    const idx =
      (SimpleCipher.characters.indexOf(c) + shift * (isEncoding ? 1 : -1)) % 26;
    return SimpleCipher.characters[idx < 0 ? idx + 26 : idx];
  }

  encode(plainText: string): string {
    let cipherText = '';
    for (let i = 0; i < plainText.length; i++) {
      const keyIdx = i > this.key.length - 1 ? i % this.key.length : i;
      cipherText += this.transcode(plainText[i], this.key[keyIdx]);
    }
    return cipherText;
  }

  decode(cipherText: string): string {
    let plainText = '';
    for (let i = 0; i < cipherText.length; i++) {
      const keyIdx = i > this.key.length - 1 ? i % this.key.length : i;
      plainText += this.transcode(cipherText[i], this.key[keyIdx], false);
    }
    return plainText;
  }
}

const simpleCipher = new SimpleCipher('abd');
// console.log(simpleCipher.key.substring(0, 10));
const plaintext = 'iamapandabear';
const cipher = simpleCipher.encode(plaintext);
console.log('encoded: ', cipher);
// const rever = simpleCipher.decode(cipher);
// console.log('decoded: ', rever);
