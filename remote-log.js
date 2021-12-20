/** @param {NS} ns **/

// Send to external logger for analysis.
async function remoteLog(ns, action, target, value) {

	await ns.wget(
		`https://192.168.0.2:8080/${action}/${target}/${value}`,
		"junk.txt"
	);

	const v = ns.getServerSecurityLevel(target);
	const vFmt = new Intl.NumberFormat().format(v);
	ns.print(`Security of server: ${vFmt}`);

	const money = ns.getServerMoneyAvailable(target);
	const moneyFmt = new Intl.NumberFormat().format(money);
	ns.print(`Money on server: \$${moneyFmt}`);

}

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

    // ns.print(player);
    await ns.wget(
      `https://192.168.0.2:8080/player/hacking/${player.hacking}`,
      "junk.txt"
    );
    await ns.wget(
      `https://192.168.0.2:8080/player/money/${player.money}`,
      "junk.txt"
    );

    await ns.sleep(60000);
	}
}
