// abcdefghijklmnopqrstuvwxyz => reverse

export function encode(plainText: string): string {
  const orig = 'abcdefghijklmnopqrstuvwxyz';
  const alphabets: { [key: string]: number } = orig
    .split('')
    .reduce((acc: { [key: string]: number }, cur, idx) => {
      acc[cur] = idx;
      return acc;
    }, {});

  let cipherText = '';
  let cipherLen = 0;
  plainText = plainText.toLowerCase();
  for (let i = 0; i < plainText.length; i++) {
    if (alphabets[plainText[i]] > -1) {
      cipherText += orig[25 - alphabets[plainText[i]]];
      cipherLen++;
      if (cipherLen % 5 === 0) {
        cipherText += ' ';
      }
    } else if (/\d/.test(plainText[i])) {
      cipherText += plainText[i];
      cipherLen++;
      if (cipherLen % 5 === 0) {
        cipherText += ' ';
      }
    }
  }

  return cipherText.trim();
}

export function decode(cipherText: string): string {
  const orig = 'abcdefghijklmnopqrstuvwxyz';
  const alphabets: { [key: string]: number } = orig
    .split('')
    .reduce((acc: { [key: string]: number }, cur, idx) => {
      acc[cur] = idx;
      return acc;
    }, {});

  let plainText = '';
  for (let i = 0; i < cipherText.length; i++) {
    if (alphabets[cipherText[i]] > -1) {
      plainText += orig[25 - alphabets[cipherText[i]]];
    } else if (/\d/.test(cipherText[i])) {
      plainText += cipherText[i];
    }
  }
  return plainText;
}

// ============================ others solution

const ALPHA = 'abcdefghijklmnopqrstuvwxyz';
export function encode2(plainText: string): string {
  return transcode(plainText).reduce(
    (s, c, i) => (s += i === 0 || i % 5 ? c : ' ' + c),
    '',
  );
}
export function decode2(cipherText: string): string {
  return transcode(cipherText).join('');
}
function transcode(text: string): string[] {
  return Array.from(text.replace(/\W/g, '').toLowerCase()).map((c) =>
    c.match(/\d/) ? c : ALPHA.charAt(25 - ALPHA.indexOf(c)),
  );
}
