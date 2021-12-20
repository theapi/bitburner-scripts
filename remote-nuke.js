/** @param {NS} ns **/

function scan(ns, parent, server, list) {
  const children = ns.scan(server);
  for (let child of children) {
    if (parent == child) {
      continue;
    }
    list.push(child);

    scan(ns, server, child, list);
  }
}

function listServers(ns) {
  const list = [];
  scan(ns, '', 'home', list);
  return list;
}

export async function main(ns) {
  const args = ns.flags([["help", false]]);
  if (args.help) {
    ns.tprint("This script nukes all hosts.");
    ns.tprint(`Usage: run ${ns.getScriptName()}`);
    ns.tprint("Example:");
    ns.tprint(`> run ${ns.getScriptName()}`);
    return;
  }

  const progs = ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe",
    "HTTPWorm.exe", "SQLInject.exe"];
  const programs = progs.filter(p => ns.fileExists(p, "home"));
  ns.tprint(`${programs} available.`);

  let servers = listServers(ns);
  const boughtServers = ns.getPurchasedServers(ns);
  servers = servers.filter(s => !boughtServers.includes(s));

  for (let target of servers) {
    if (ns.hasRootAccess(target)) {
      ns.tprint(`${target} is already rooted :)`);
      continue;
    }

    ns.tprint(`Targeting: ${target}...`);
    let ports = ns.getServerNumPortsRequired(target);
    if (ports <= programs.length) {
      for (let p of programs) {
        switch (p) {
          case "BruteSSH.exe":
            ns.brutessh(target);
            break;
          case "FTPCrack.exe":
            ns.ftpcrack(target);
            break;
          case "relaySMTP.exe":
            ns.relaysmtp(target);
            break;
          case "HTTPWorm.exe":
            ns.httpworm(target);
            break;
          case "SQLInject.exe":
            ns.sqlinject(target);
            break;
          default:
            break;
        }
      }
    }
    ns.nuke(target);
    ns.tprint(`${target} just nuked :)`);
  }
}