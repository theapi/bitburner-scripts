/** @param {NS} ns **/
export async function main(ns) {
	const args = ns.flags([['help', false]]);
	const target = args._[0];
	if (args.help || !target) {
		ns.tprint("This script will generate money by hacking a target server.");
		ns.tprint(`USAGE: run ${ns.getScriptName()} SERVER_NAME`);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()} n00dles`);
		return;
	}


	while (true) {
		await ns.weaken(target);
		const value = ns.getServerSecurityLevel(target);
		await ns.wget(
			`https://192.168.0.2:8080/grow/${target}/${value}`,
			"junk.txt"
		);
	}
}
