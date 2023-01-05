import path from 'path';

const fs = jest.createMockFromModule('fs');

// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `fs` APIs are used.
let mockFiles = Object.create(null);
function __setMockFiles(newMockFiles: any) {
  mockFiles = Object.create(null);
  for (const file in newMockFiles) {
    const dir = path.dirname(file);

    if (!mockFiles[dir]) {
      mockFiles[dir] = [];
    }
    mockFiles[dir].push(path.basename(file));
  }
}

// A custom version of `readdirSync` that reads from the special mocked out
// file list set via __setMockFiles
function readdirSync(directoryPath: string) {
  return mockFiles[directoryPath] || [];
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
fs.__setMockFiles = __setMockFiles;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
fs.readdirSync = readdirSync;

export { fs };
