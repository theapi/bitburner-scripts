/**
 * Requires Singlarity level 1.
 */

const findPath = (ns, target, serverName, serverList, ignore, isFound) => {
	ignore.push(serverName);
	let scanResults = ns.scan(serverName);
	for (let server of scanResults) {
		if (ignore.includes(server)) {
			continue;
		}
		if (server === target) {
			serverList.push(server);
			return [serverList, true];
		}
		serverList.push(server);
		[serverList, isFound] = findPath(ns, target, server, serverList, ignore, isFound);
		if (isFound) {
			return [serverList, isFound];
		}
		serverList.pop();
	}
	return [serverList, false];
}


/** @param {NS} ns **/
export async function main(ns) {
  const args = ns.flags([['help', false]]);
  const target = args._[0];
  if (args.help || !target) {
    ns.tprint("Connect to a server at any depth");
    ns.tprint(`USAGE: run ${ns.getScriptName()} SERVER`);
    ns.tprint("Example:");
    ns.tprint(`> run ${ns.getScriptName()} I.I.I.I`);
    return;
  }

  let startServer = ns.getHostname();
	let [results, isFound] = findPath(ns, target, startServer, [], [], false);
	if (!isFound) {
		ns.alert('Server not found!');
	} else {
		// ns.tprint(results.join(' --> '));
    for (let h of results) {
      ns.connect(h);
    }
	}
}
