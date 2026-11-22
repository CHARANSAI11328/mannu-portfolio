const fs = require('fs');

function patchFile(filePath, from, to) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(from)) {
      content = content.replaceAll(from, to);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Patched:', filePath);
    } else {
      console.log('Target not found in:', filePath);
    }
  }
}

patchFile(
  'node_modules/next/dist/build/webpack/plugins/next-trace-entrypoints-plugin.js',
  "e.code === 'EINVAL' || e.code === 'ENOENT' || e.code === 'UNKNOWN'",
  "e.code === 'EINVAL' || e.code === 'ENOENT' || e.code === 'UNKNOWN' || e.code === 'EISDIR'"
);

patchFile(
  'node_modules/next/dist/build/collect-build-traces.js',
  "e.code === 'EINVAL' || e.code === 'ENOENT' || e.code === 'UNKNOWN'",
  "e.code === 'EINVAL' || e.code === 'ENOENT' || e.code === 'UNKNOWN' || e.code === 'EISDIR'"
);

patchFile(
  'node_modules/next/dist/compiled/@vercel/nft/index.js',
  'e.code!=="EINVAL"&&e.code!=="ENOENT"&&e.code!=="UNKNOWN"',
  'e.code!=="EINVAL"&&e.code!=="ENOENT"&&e.code!=="UNKNOWN"&&e.code!=="EISDIR"'
);
