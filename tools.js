import fs from 'fs-extra';
import { exec } from 'child_process';
import path from 'path';

export const tool_map = {
    setupProject: async ({ folderPath }) => {
        if (fs.existsSync(folderPath)) fs.removeSync(folderPath);
        await fs.ensureDir(folderPath);
        return `SUCCESS: Environment ready.`;
    },
    writeFile: async ({ filePath, content }) => {
        await fs.outputFile(filePath, content);
        return `SUCCESS: High-fidelity index.html generated.`;
    },
    openInBrowser: async ({ filePath }) => {
        exec(`open "${path.resolve(filePath)}"`);
        return `SUCCESS: Browser launched!`;
    }
};