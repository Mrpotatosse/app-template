import { Argument, Option, program } from "commander";
import { Eta } from "eta";

const eta = new Eta({});

program
    .name("trpc-template")
    .description("create trpc procedure template")
    .version("0.0.0")
    .addArgument(new Argument("<dir>", "dir").choices(["api", "ws"]))
    .addArgument(new Argument("<path>", "route path"))
    .addArgument(
        new Argument("<type>", "procedure type").choices([
            "query",
            "mutation",
            "subscription",
        ])
    )
    .addOption(
        new Option("-l, --link <link>", "add link if type is subscription")
    )
    .action((dir, path, type, options) => {
        switch (type) {
            case "query":
                Bun.write(
                    `./route/${dir}/${path}.ts`,
                    eta.renderString(
                        `import { z } from "zod";
import { publicProcedure } from "~/server/lib/trpc";

const Input = z.object({});

export default publicProcedure.input(Input).query(async ({ ctx, input }) => {
    return {
        hello: "world",
    };
});`,
                        {}
                    ),
                    {
                        createPath: true,
                    }
                );
                break;
            case "mutation":
                Bun.write(
                    `./route/${dir}/${path}.ts`,
                    eta.renderString(
                        `import { z } from "zod";
import { publicProcedure } from "~/server/lib/trpc";

const Input = z.object({});

export default publicProcedure.input(Input).mutation(async ({ ctx, input }) => {
    return {
        hello: "world",
    };
});`,
                        {}
                    ),
                    {
                        createPath: true,
                    }
                );
                break;
            case "subscription":
                Bun.write(
                    `./route/${dir}/${path}.ts`,
                    eta.renderString(
                        `import { observable } from "@trpc/server/observable";
import { publicProcedure } from "~/server/lib/trpc";

export default publicProcedure.subscription(() => {
    return observable((emit) => {
        const onSend = (data: any) => {
            emit.next(data);
        };

        global.MainEventEmitter.on("<%= it.link ?? "event_name" %>", onSend);
        return () => {
            global.MainEventEmitter.off("<%= it.link ?? "event_name" %>", onSend);
        };
    });
});`,
                        options
                    ),
                    {
                        createPath: true,
                    }
                );
                break;
        }
    })
    .parse(Bun.argv);
