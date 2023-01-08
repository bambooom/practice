// https://leetcode.com/problems/validate-ip-address/
// Given a string queryIP, return "IPv4" if IP is a valid IPv4 address, "IPv6" if IP is a valid IPv6 address or "Neither" if IP is not a correct IP of any type.

// A valid IPv4 address is an IP in the form "x1.x2.x3.x4" where 0 <= xi <= 255 and xi cannot contain leading zeros. For example, "192.168.1.1" and "192.168.1.0" are valid IPv4 addresses while "192.168.01.1", "192.168.1.00", and "192.168@1.1" are invalid IPv4 addresses.

// A valid IPv6 address is an IP in the form "x1:x2:x3:x4:x5:x6:x7:x8" where:

// 1 <= xi.length <= 4
// xi is a hexadecimal string which may contain digits, lowercase English letter ('a' to 'f') and upper-case English letters ('A' to 'F').
// Leading zeros are allowed in xi.

// For example, "2001:0db8:85a3:0000:0000:8a2e:0370:7334" and "2001:db8:85a3:0:0:8A2E:0370:7334" are valid IPv6 addresses, while "2001:0db8:85a3::8A2E:037j:7334" and "02001:0db8:85a3:0000:0000:8a2e:0370:7334" are invalid IPv6 addresses.

// only using regex
function validIPAddress(queryIP: string): string {
  const ipv4 = /^((\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.){4}$/;
  const ipv6 = /^([\da-f]{1,4}:){8}$/i;
  return ipv4.test(queryIP + '.')
    ? 'IPv4'
    : ipv6.test(queryIP + ':')
    ? 'IPv6'
    : 'Neither';
}

// using token
const validIPv4 = (queryIP: string): boolean => {
  const tokens = queryIP.split('.');
  if (tokens.length !== 4) {
    return false;
  }

  if (!tokens.every((token) => /^(0|[1-9]\d*)$/.test(token))) {
    return false;
  }

  const components = tokens.map((token) => parseInt(token, 10));
  if (!components.every((component) => component >= 0 && component <= 255)) {
    return false;
  }

  return true;
};

const validIPv6 = (queryIP: string): boolean => {
  const tokens = queryIP.split(':');
  if (tokens.length !== 8) {
    return false;
  }

  if (!tokens.every((token) => /^[\da-fA-F]{1,4}$/.test(token))) {
    return false;
  }

  return true;
};

const validIPAddress2 = (queryIP: string): string => {
  if (validIPv4(queryIP)) {
    return 'IPv4';
  }
  if (validIPv6(queryIP)) {
    return 'IPv6';
  }
  return 'Neither';
};
