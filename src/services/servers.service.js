import Server from "../schema/server.schema";

import proxyList from "../data/proxies";
import softwareList from "../data/softwares";
import versionList from "../data/versions";

const results = {
  total: 0,
  byVersions: {},
  byProxies: {},
  byStandalone: {},
};

function sortJson(json) {
  return Object.keys(json)
    .map((key) => {
      const value = json[key];
      return { name: key, count: value };
    })
    .sort((a, b) => {
      return (a.count < b.count) ? 1 : -1;
    });
}

async function countByVersions() {
  const servers = await Server.find();
  const versions = {};

  for (let server of servers) {
    if (!proxyList.includes(server.software)) {
      for (let version of server.versions || []) {
        if (versions[version] == null) {
          versions[version] = 1;
        } else {
          versions[version]++;
        }
      }
    }
  }

  return sortJson(versions);
}

async function countByProxies() {
  const servers = await Server.find();
  const softwares = {};

  for (let server of servers) {
    if (proxyList.includes(server.software)) {
      if (softwares[server.software] == null) {
        softwares[server.software] = 1;
      } else {
        softwares[server.software]++;
      }
    }
  }

  return sortJson(softwares);
}

async function countByStandalone() {
  const servers = await Server.find();
  const softwares = {};

  for (let server of servers) {
    if (softwareList.includes(server.software)) {
      if (softwares[server.software] == null) {
        softwares[server.software] = 1;
      } else {
        softwares[server.software]++;
      }
    }
  }

  return sortJson(softwares);
}

async function countTotal() {
  return await Server.find().countDocuments();
}

export async function updateResults() {
  const byVersions = await countByVersions();
  const byProxies = await countByProxies();
  const byStandalone = await countByStandalone();
  const total = await countTotal();

  results.byProxies = byProxies;
  results.byStandalone = byStandalone;
  results.byVersions = byVersions;
  results.total = total;
}

export function getResults() {
  return results;
}
