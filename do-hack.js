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
		await ns.hack(target);
		const money = ns.getServerMoneyAvailable(target);
		const moneyFmt = new Intl.NumberFormat().format(money);
		ns.print(`Money on server: \$${moneyFmt}`);
	}
}
