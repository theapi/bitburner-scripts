/** @param {NS} ns **/
export async function main(ns) {
	const args = ns.flags([['help', false]]);
	if (args.help) {
		ns.tprint("This script will send logs for analysis to a real remote server.");
		ns.tprint(`USAGE: run ${ns.getScriptName()}`);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()}`);
		return;
	}


	while (true) {
    const player = ns.getPlayer();

    await ns.wget(
      `https://192.168.0.2:8000/player?h=${player.hacking}&m=${player.money}&w=${player.workRepGained}`,
      "junk.txt"
    );
    await ns.sleep(60000);
	}
}
