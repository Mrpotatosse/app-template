import { $ } from "bun";
import { Argument, Option, program } from "commander";
import { basename, dirname, join } from "path";
import { eta } from "~/server/templates";

program
    .addArgument(new Argument("<path>", "template output path"))
    .addOption(new Option("-e, --event", "create an event"))
    .action(async (path, options) => {
        await Bun.write(`${path}.ts`, eta.render("./trpc-mutation", {}));

        if (options.event) {
            const dir = dirname(path);
            const name = basename(path);

            await Bun.write(
                `${join(
                    dir,
                    `on${name && name[0].toUpperCase() + name.slice(1)}`
                )}.ts`,
                eta.render("./trpc-subscription", {
                    eventName: path,
                })
            );
        }

        await $`bun run build`;
    })
    .parse(Bun.argv);
