import { Command } from "commander";
import axios from "axios";

const program = new Command();
program.version("0.1.0");

program
  .command("login")
  .description("Login to the environment manager")
  .action(() => {
    console.log("Login feature coming soon!");
  });

program
  .command("pull <project>")
  .description("Pull variables for a project")
  .action((project) => {
    console.log(`Pulling variables for project: ${project}`);
  });

program
  .command("push <project>")
  .description("Push variables for a project")
  .action((project) => {
    console.log(`Pushing variables for project: ${project}`);
  });

program.parse(process.argv);
