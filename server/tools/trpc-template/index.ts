import { program } from "commander";

program
    .name("trpc-template")
    .description("trpc procedure template")
    .version("0.0.0")
    .command("add <type> <path>", "add trpc procedure")
    .command("rm <path>", "remove trpc procedure")
    .parse(Bun.argv);
