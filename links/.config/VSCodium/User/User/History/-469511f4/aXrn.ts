#! /usr/bin/env bun
import yargs from "yargs-parser";

const args = yargs(Bun.argv.slice(2));

console.log(args);
