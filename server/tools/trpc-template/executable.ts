import { $ } from "bun";

await $`bun run ./tools/trpc-template/index.ts ${Bun.argv.slice(2)}`;
