/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog("sleep");
	while (true) {
		if (ns.hacknet.numHashes() > 4) {
			ns.hacknet.spendHashes("Sell for Money");
		}
		await ns.sleep(100);
	}
}
