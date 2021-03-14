const idRegex = /1(\.[1-9]+)*$/;
const parentIdRegex = /(1(\.[1-9]+)*)\.[1-9]+$/;

function extract(ancestryEntry, entryData, key) {
  if (!(key in entryData))
    throw Error(`Entry:

${ancestryEntry}

must have a '${key}' defined`);
  const val = entryData[key];
  delete entryData[key];
  return val;
}

function parseAncestryEntry(ancestryEntry) {
  if (ancestryEntry.trim().length === 0)
    return null;

  const entryData = {};
  const lines = ancestryEntry.trim().split('\n');

  if (lines.length === 0)
    return null;

  lines
    .map(line => line.split('='))
    .forEach(def => {
      if (def.length !== 2)
        throw Error(`Malformed line "${def.join('=')}" in entry:

${ancestryEntry}

The expected format is: property=value`);
      if (def[0] in entryData)
        throw Error(`Entry:

${ancestryEntry}

has a duplicate property ${def[0]}'`);
      entryData[def[0]] = (def[1] || '').trim();
    });
  const id = extract(ancestryEntry, entryData, 'id');
  const name = extract(ancestryEntry, entryData, 'name');
  if (!id.match(idRegex))
    throw Error(`id must match pattern "${idRegex}" (eg: 1.2.1),
but instead ${id} was found`);
  const matches = id.match(parentIdRegex);
  const parentId = (matches && matches.length > 1) ? matches[1] : null;
  return {id, parentId, data: {name, attributes: entryData, children: []}};
}

export function parseAncestryNotation(text) {
  const nodeMap = {};
  text.replace('\r', '')
    .split('\n\n')
    .map(parseAncestryEntry)
    .filter(entry => entry != null)
    .forEach(entry => {
      if (entry.id in nodeMap)
        throw Error(`Duplicate id found: ${entry.id}`);
      nodeMap[entry.id] = entry;
    });
  let tree = null;
  Object.values(nodeMap)
    .forEach(entry => {
      if (entry.parentId) {
        if (!(entry.parentId in nodeMap))
          throw Error(`Found an entry with 'id=${entry.id}' but no parent exists with 'id=${entry.parentId}'`);
        nodeMap[entry.parentId].data.children.push(entry.data);
      } else {
        if (entry.id !== '1')
          throw Error(`The original ancestor must have an id=1 .
          All other entries must be descendents (eg. 1.1, 1.2, 1.2.1, etc).
          But an entry was found with 'id=${entry.id}'`);
        tree = entry.data;
      }
    });
  if (tree === null)
    throw Error('At least one entry must exist with id=1 to represent the original ancestor.');
  return tree;
}

function printAncestryEntry(entry) {
  return `id=${entry.id}
name=${entry.node.name}
${entry.node.attributes ? Object.entries(entry.node.attributes)
    .map(attr => attr.join('=') + '\n')
    .join('') : ''}`;
}

function* bfs(tree) {
  const frontier = [{id: '1', node: tree}];
  while (frontier.length > 0) {
    const entry = frontier.shift();
    yield entry;
    if (entry.node.children) {
      entry.node.children.forEach((child, childI) => {
        frontier.push({id: `${entry.id}.${childI + 1}`, node: child});
      });
    }
  }
}

export function printAncestryNotation(tree) {
  return [...bfs(tree)].map(printAncestryEntry).join('\n');
}
