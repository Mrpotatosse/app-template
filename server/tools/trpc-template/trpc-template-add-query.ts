import { $ } from "bun";
import { Argument, program } from "commander";
import { eta } from "~/server/templates";

program
    .addArgument(new Argument("<path>", "template output path"))
    .action(async (path) => {
        await Bun.write(`${path}.ts`, eta.render("./trpc-query", {}));
        await $`bun run build`;
    })
    .parse(Bun.argv);
