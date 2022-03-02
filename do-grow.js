/** @param {NS} ns **/
export async function main(ns) {
	const args = ns.flags([['help', false]]);
	const target = args._[0];
	if (args.help || !target) {
		ns.tprint("Grow a server.");
		ns.tprint(`USAGE: run ${ns.getScriptName()} SERVER_NAME `);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()} n00dles`);
		return;
	}

	await ns.grow(target);
}
