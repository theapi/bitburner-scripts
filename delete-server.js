

/** @param {NS} ns **/
export async function main(ns) {
	const args = ns.flags([['help', false]]);
	const server = args._[0];
	if (args.help || !server) {
		ns.tprint("Delete a server.");
		ns.tprint(`USAGE: run ${ns.getScriptName()} SERVER`);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()} pserv-0`);
		return;
	}

  ns.deleteServer(server);
}
