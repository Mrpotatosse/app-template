import { $ } from "bun";

await $`bun build tools/trpc-template/index.ts --outfile tools/cli/trpc-template --compile`;
