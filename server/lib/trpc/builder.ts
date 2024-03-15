import { readdirSync } from "node:fs";
import { join } from "path";
import { eta } from "~/server/templates";

export type BuildOptions = {
    inputPath: string;
    inputAlias?: string;
    outputPath: string;

    routerName: string;
};

export function routerBuild({
    inputPath,
    inputAlias,
    outputPath,
    routerName,
}: BuildOptions) {
    const files = readdirSync(inputPath, {
        recursive: true,
        withFileTypes: true,
    })
        .filter(
            (file) =>
                file.isFile() &&
                file.name.endsWith(".ts") &&
                !file.name.endsWith(".test.ts")
        )
        .sort((f1, f2) => f1.name.localeCompare(f2.name));

    return Bun.write(
        outputPath,
        eta.render("./router", {
            routerName,
            routes: files.map((file) => {
                const name = file.name.slice(0, file.name.indexOf(".ts"));

                return {
                    name,
                    nameHash: `file${new Bun.CryptoHasher("md5")
                        .update(name)
                        .digest("hex")}`,
                    path: join(inputAlias ?? inputPath, name),
                };
            }),
        })
    );
}
