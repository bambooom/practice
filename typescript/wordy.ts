export const answer = (question: string): number => {
  const numbersRe = /-?\d+/;
  const operatorRe = /plus|minus|multiplied|divided/;
  const operatorFormat =
    /-?\d+(?:\s(?:plus|minus|multiplied by|divided by)\s-?\d+)+\?$/;
  const Q = 'What is';

  if (
    !question.startsWith(Q) ||
    (numbersRe.test(question) &&
      /-?\d+\s[a-z]+/.test(question) &&
      !operatorRe.test(question))
  ) {
    throw new Error('Unknown operation');
  }
  if (
    question.startsWith(Q) &&
    (!numbersRe.test(question) ||
      (operatorRe.test(question) && !operatorFormat.test(question)))
  ) {
    throw new Error('Syntax error');
  }
  if (!operatorRe.test(question)) {
    const n = question.match(/-?\d+/);
    return n ? Number(n[0]) : 0;
  }
  const ops = question.match(
    /(-?\d+)((?:\s(?:plus|minus|multiplied by|divided by)\s-?\d+)+)/,
  ) as RegExpMatchArray;
  const res = Number(ops[1]);
  const others = [
    ...ops[2]
      .trim()
      .matchAll(/(plus|minus|multiplied by|divided by)\s(-?\d+)/g),
  ];

  return others.reduce((acc, cur) => {
    if (cur[1] === 'plus') {
      return acc + Number(cur[2]);
    } else if (cur[1] === 'minus') {
      return acc - Number(cur[2]);
    } else if (cur[1] === 'multiplied by') {
      return acc * Number(cur[2]);
    } else {
      return acc / Number(cur[2]);
    }
  }, res);
};

console.log(answer('What is 1 plus 1?'));

// ======================================== other solution

const mathOperations = {
  plus: (a: number, b: number) => a + b,
  minus: (a: number, b: number) => a - b,
  multiply: (a: number, b: number) => a * b,
  divide: (a: number, b: number) => a / b,
  raise: (a: number, b: number) => a ** b,
};
const checkIsOperation = (
  input: string,
): input is keyof typeof mathOperations => input in mathOperations;

export const answer2 = (input: string): number | never => {
  if (!/^What is/.test(input)) throw 'Unknown operation';
  if (!/^What is .+\?$/.test(input)) throw 'Syntax error';
  const query = input
    .replace(/^What is (.+)\?$/, '$1')
    .replace(/multiplied by/g, 'multiply')
    .replace(/divided by/g, 'divide')
    .replace(/raised to the (\d+)th power/g, 'raise $1')
    .split(' ');
  let mathOperation = mathOperations.plus;
  let res = 0;
  let isMathOperationExpected = false;
  for (const q of query) {
    const isQNumber = !Number.isNaN(parseInt(q));
    const isQMathOp = checkIsOperation(q);
    if (isMathOperationExpected) {
      if (isQNumber) throw 'Syntax error';
      if (!isQMathOp) throw 'Unknown operation';
      mathOperation = mathOperations[q as keyof typeof mathOperations];
    } else if (!isMathOperationExpected) {
      if (isQMathOp) throw 'Syntax error';
      res = mathOperation(res, parseInt(q));
    }
    isMathOperationExpected = !isMathOperationExpected;
  }
  if (!isMathOperationExpected) {
    throw 'Syntax error';
  }
  return res;
};

// ================================= another solution

enum Type {
  NUM = 'number',
  OP = 'operation',
}
type CalcFunction = (a: number, b: number) => number;
type Token = {
  type: Type;
  value?: number;
  fn?: CalcFunction;
};
class QuestionLexer {
  private words: string[];
  constructor(question: string) {
    this.words = question.trim().toLowerCase().replace(/\?$/, '').split(/\s+/);
    const prefix = `${this.words.shift()} ${this.words.shift()}`;
    if (prefix !== 'what is') throw new Error('Unknown operation');
  }
  next(): Token | undefined {
    let word = this.words.shift();
    if (word === undefined) return;
    const num = parseInt(word, 10);
    if (!isNaN(num)) return { type: Type.NUM, value: num };
    if (['multiplied', 'divided'].includes(word)) word += this.words.shift();
    switch (word) {
      case 'plus':
        return { type: Type.OP, fn: (a, b) => a + b };
        break;
      case 'minus':
        return { type: Type.OP, fn: (a, b) => a - b };
        break;
      case 'multipliedby':
        return { type: Type.OP, fn: (a, b) => a * b };
        break;
      case 'dividedby':
        return { type: Type.OP, fn: (a, b) => a / b };
        break;
      default:
        throw new Error('Unknown operation');
        break;
    }
  }
}
export const answer3 = (question: string): number => {
  const tokens = new QuestionLexer(question);
  let expected: Type = Type.NUM;
  let currentOp: CalcFunction = (_, b) => b;
  let result = -42;
  let token: Token | undefined;
  while ((token = tokens.next())) {
    if (token.type !== expected) throw new Error('Syntax error');
    switch (token.type) {
      case Type.NUM:
        result = currentOp(result, token.value!);
        expected = Type.OP;
        break;
      case Type.OP:
        currentOp = token.fn!;
        expected = Type.NUM;
        break;
    }
  }
  if (expected === Type.NUM) throw new Error('Syntax error');
  return result;
};
