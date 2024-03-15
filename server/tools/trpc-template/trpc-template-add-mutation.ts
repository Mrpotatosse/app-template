import { $ } from "bun";
import { Argument, Option, program } from "commander";
import { basename, dirname, join } from "path";
import { eta } from "~/server/templates";

program
    .addArgument(new Argument("<path>", "template output path"))
    .addOption(new Option("--event", "create an event"))
    .addOption(new Option("--extension", "file extension").default("ts"))
    .addOption(new Option("--dir", "output directory").default("./route/"))
    .action(async (path, options) => {
        const procedurePath = join(options.dir, `${path}.${options.extension}`);
        await Bun.write(procedurePath, eta.render("./trpc-mutation", {}));
        if (options.event) {
            const dir = dirname(procedurePath);
            const name = basename(procedurePath);
            await Bun.write(
                `${join(
                    dir,
                    `on${name && name[0].toUpperCase() + name.slice(1)}`
                )}`,
                eta.render("./trpc-subscription", {
                    eventName: path,
                })
            );
        }
        await $`bun run build`;
    })
    .parse(Bun.argv);
