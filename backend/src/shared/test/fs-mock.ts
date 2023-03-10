import path from 'path';

const fs = jest.genMockFromModule('fs');
let mockFiles = Object.create(null);
// example of newMockFiles
// { "./testFolder/file1.txt": "This is the file content"
function __createMockFiles(newMockFiles: any) {
  mockFiles = Object.create(null);
  for (const file in newMockFiles) {
    const dir = path.dirname(file);
    if (!mockFiles[dir]) {
      mockFiles[dir] = [];
    }
    mockFiles[dir].push(path.basename(file));
    mockFiles[dir][path.basename(file)] = newMockFiles[file];
  }
}
function existsSync(pathToDirectory: any) {
  return mockFiles[pathToDirectory];
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
fs.existsSync = existsSync;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
fs.__createMockFiles = __createMockFiles;

export { fs };
