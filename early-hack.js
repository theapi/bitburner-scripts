async function remoteLog(ns, action, target, value) {

	await ns.wget(
		`https://192.168.0.2:8080/${action}/${target}/${value}`,
		"junk.txt"
	);

}

/** @param {NS} ns **/
export async function main(ns) {
	let target = "n00dles";
	let moneyThresh = ns.getServerMaxMoney(target) * 0.50;
	let securityThresh = ns.getServerMinSecurityLevel(target) + 10;

	if (ns.fileExists("BruteSSH.exe", "home")) {
		ns.brutessh(target);
	}

	ns.nuke(target);

	let weaken = 0;
	let grow = 0;
	while (true) {
		if (ns.getServerSecurityLevel(target) > securityThresh) {
			await ns.weaken(target);
			const v = ns.getServerSecurityLevel(target);
			if (v != weaken) {
				await remoteLog(ns, "weaken", target, v);
			}
			weaken = v;
		} else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
			await ns.grow(target);
			const v = ns.getServerMoneyAvailable(target);
			if (v != grow) {
				await remoteLog(ns, "grow", target, v);
			}
			grow = v;
		} else {
			const v = await ns.hack(target);
			await remoteLog(ns, "hack", target, v);
		}
	}

}