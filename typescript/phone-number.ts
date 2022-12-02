/**
 * For example, the inputs

+1 (613)-995-0253
613-995-0253
1 613 995 0253
613.995.0253
should all produce the output

6139950253
 */

export function clean(phone: string) {
  phone = phone
    .replace(/\s/g, '')
    .replace(/-/g, '')
    .replace(/\./g, '')
    .replace(/\(/g, '')
    .replace(/\)/g, '')
    .replace(/\+/g, '');
  if (/[a-z]/i.test(phone)) {
    throw new Error('Letters not permitted');
  }
  if (/[^a-z0-9]/i.test(phone)) {
    throw new Error('Punctuations not permitted');
  }
  // const matched = phone.match(/^(?:\+?1)?([2-9][0-9]{2}[2-9][0-9]{6})$/);
  // if (!matched || matched[1].length)
  const digits = phone.match(/\d/g);
  if (digits) {
    if (digits.length < 10) {
      throw new Error('Incorrect number of digits');
    }
    if (digits.length > 11) {
      throw new Error('More than 11 digits');
    }
    if (digits.length === 11 && digits[0] !== '1') {
      throw new Error('11 digits must start with 1');
    }
    if (digits.length === 11 && digits[0] === '1') {
      digits.shift(); // remove first
    }
    if (digits[0] === '0') {
      throw new Error('Area code cannot start with zero');
    }
    if (digits[0] === '1') {
      throw new Error('Area code cannot start with one');
    }
    if (digits[3] === '0') {
      throw new Error('Exchange code cannot start with zero');
    }
    if (digits[3] === '1') {
      throw new Error('Exchange code cannot start with one');
    }

    return digits.join('');
  } else {
    throw new Error('wrong format');
  }
}
