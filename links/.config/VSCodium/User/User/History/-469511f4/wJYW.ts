#! /usr/bin/env bun
import { parseArgs } from "util";

const { args } = parseArgs({
  args: Bun.argv,
  options: {
    test: {
      type: 'string',
    },
  },
  strict: true,
  allowPositionals: true,
});

console.log(args);
