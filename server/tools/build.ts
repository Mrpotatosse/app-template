import { $ } from "bun";

await $`bun build ./tools/trpc-template/executable.ts --outfile ./tools/cli/trpc-template --compile`;
