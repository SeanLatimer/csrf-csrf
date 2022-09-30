import { doubleCsrf } from "../src/index.js";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { doubleCsrf as doubleCsrfCjs } from "../lib/index.cjs";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { doubleCsrf as doubleCsrfESM } from "../lib/index.module";
import { createTestSuite } from "./testsuite.js";

const tests = [
  { name: "Source", doubleCsrf: doubleCsrf },
  { name: "ES Module", doubleCsrf: doubleCsrfESM },
  { name: "CommonJS", doubleCsrf: doubleCsrfCjs },
];

const CSRF_SECRET = () => "test secret thing please never really do this";

tests.forEach(({ name, doubleCsrf }) => {
  describe(name, () => {
    createTestSuite("csrf-csrf unsigned", doubleCsrf, {
      getSecret: CSRF_SECRET,
    });
    createTestSuite("csrf-csrf signed", doubleCsrf, {
      getSecret: CSRF_SECRET,
      cookieOptions: { signed: true },
    });
    createTestSuite("csrf-csrf signed with custom options", doubleCsrf, {
      getSecret: CSRF_SECRET,
      cookieOptions: { signed: true, sameSite: "strict" },
      size: 128,
      cookieName: "__Host.test-the-thing.token",
    });
  });
});
