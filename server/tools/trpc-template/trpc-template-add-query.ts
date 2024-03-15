import { $ } from "bun";
import { Argument, Option, program } from "commander";
import { join } from "path";
import { eta } from "~/server/templates";

program
    .addArgument(new Argument("<path>", "template output path"))
    .addOption(new Option("--extension", "file extension").default("ts"))
    .addOption(new Option("--dir", "output directory").default("./route/"))
    .action(async (path, options) => {
        const procedurePath = join(options.dir, `${path}.${options.extension}`);
        await Bun.write(procedurePath, eta.render("./trpc-query", {}));
        await $`bun run build`;
    })
    .parse(Bun.argv);
