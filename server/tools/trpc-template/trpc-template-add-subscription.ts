import { $ } from "bun";
import { Argument, Option, program } from "commander";
import { eta } from "~/server/templates";

program
    .addArgument(new Argument("<path>", "template output path"))
    .addOption(
        new Option(
            "-e, --event <event>",
            "create an event"
        ).makeOptionMandatory(true)
    )
    .action(async (path, options) => {
        await Bun.write(
            `${path}.ts`,
            eta.render("./trpc-subscription", {
                eventName: options.event,
            })
        );
        await $`bun run build`;
    })
    .parse(Bun.argv);
