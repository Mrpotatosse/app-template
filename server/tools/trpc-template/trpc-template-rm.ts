import { $ } from "bun";
import { Argument, program } from "commander";
import { unlinkSync } from "fs";

program
    .addArgument(new Argument("<path>", "template output path"))
    .action(async (path) => {
        unlinkSync(`${path}.ts`);
        await $`bun run build`;
    })
    .parse(Bun.argv);
