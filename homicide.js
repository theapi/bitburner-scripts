/** @param {NS} ns **/
export async function main(ns) {
	const target = -54000;
	let karma = 0;
	let run = true;
	//let tmp = ns.commitCrime('homicide');
	//ns.tprint(`tmp: ${tmp}`);
	while (run && karma > target) {
		let start = new Date().getTime();
		//ns.tprint(`start: ${start}`);
		//let t = 2000;
		let t = ns.commitCrime('homicide');
		// allow time to stop the crime
		let now = new Date().getTime();
		while (now - start < t - 500) {
			//ns.tprint(`diff: ${now - start}`);

			if (!ns.isBusy()) {
				run = false;
			}
			await ns.sleep(500);
			now = new Date().getTime();
			//ns.tprint(`now: ${now}`);
		}
		while (ns.isBusy()) {
			await ns.sleep(500);
		}


		karma = ns.heart.break();
	}

	ns.tprint(`karma: ${karma}`);
}