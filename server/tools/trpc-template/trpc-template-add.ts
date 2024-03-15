import { program } from "commander";

program
    .command("query <path>", "add trpc procedure")
    .command("mutation <path>", "add trpc procedure")
    .command("subscription <path>", "add trpc procedure")
    .parse(Bun.argv);
