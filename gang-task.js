/** @param {NS} ns **/
export async function main(ns) {
	let task = ns.args[0];
	if (!task) {
		task = 'Train Combat';
	}

	const members = ns.gang.getMemberNames();

	for (let member of members) {
		ns.gang.setMemberTask(member, task);

	}
}
