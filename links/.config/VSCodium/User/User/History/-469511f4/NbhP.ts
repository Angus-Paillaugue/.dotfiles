#! /usr/bin/env bun
import { parseArgs } from "util";

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    test: {
      type: 'string',
    },
  },
  strict: true,
  allowPositionals: true,
});

console.log(Bun.argv);
