import { Eta } from "eta";
import { join } from "path";

export const eta = new Eta({
    views: join(import.meta.dir),
    cache: true,
    cacheFilepaths: true,
});
