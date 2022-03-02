/** @param {NS} ns **/
export async function main(ns) {
	let info = ns.gang.getGangInformation();
	let loop = true;
	ns.tprint(info);
	ns.disableLog("sleep");
	while (loop) {
		info = ns.gang.getGangInformation();
		if (info.territory >= 0.9999) {
			ns.gang.setTerritoryWarfare(false);
			loop = false;
			const members = ns.gang.getMemberNames();

			for (let member of members) {
				ns.gang.setMemberTask(member, 'Train Combat');

			}
		}
		await ns.sleep(30000);
	}
}
