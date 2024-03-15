import { $ } from "bun";
import { Argument, Option, program } from "commander";
import { unlinkSync } from "fs";
import { join } from "path";

program
    .addArgument(new Argument("<path>", "template output path"))
    .addOption(new Option("--extension", "file extension").default("ts"))
    .addOption(new Option("--dir", "output directory").default("./route/"))
    .action(async (path, options) => {
        const procedurePath = join(options.dir, `${path}.${options.extension}`);
        unlinkSync(procedurePath);
        await $`bun run build`;
    })
    .parse(Bun.argv);
