/** @param {NS} ns **/
export async function main(ns) {
	const exclude1 = ns.args[0];
	const exclude2 = ns.args[1];
	const members = ns.gang.getMemberNames();

	for (let member of members) {
		if (exclude1 != member && exclude2 != member) {
			ns.gang.ascendMember(member);
		}
	}
}
