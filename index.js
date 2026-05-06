import "dotenv/config";
import { OpenAI } from "openai";
import ora from "ora";
import chalk from "chalk";
import path from 'path';
import { tool_map } from "./tools.js";

const client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY?.trim(),
});

const SYSTEM_PROMPT = `
You are 'SST-Architect-Ultra'. MISSION: Build a pixel-perfect Scaler clone FAST.

REQUIRED UI COMPONENTS:
- NAV BAR: Sticky glassmorphism nav with 'SCALER' logo (Left) and links (Right: Courses, About, Community).
- HERO SECTION: Centered title "Master In-Demand Tech Skills" (#00236E, 800 weight, 4rem).
- BUTTONS: Blue "Explore Courses" and Outline "View Demo".
- FOOTER: 4-Column Dark Navy (#001A40) grid with links.

STRICT JSON FORMAT:
Respond ONLY with a JSON object. Ensure HTML content uses \\n for newlines.
{
  "step": "THINK" | "TOOL" | "OUTPUT",
  "content": "Reasoning about layout",
  "tool": "setupProject" | "writeFile" | "openInBrowser",
  "args": { "folderPath": "./scaler_output", "filePath": "index.html", "content": "PERFECT_HTML_CODE" }
}`;

async function runAgent() {
    const outputDir = path.join(process.cwd(), 'scaler_output');
    let messages = [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: "Build the Scaler clone with a proper Nav Bar and high-fidelity Hero section now." }
    ];

    console.clear();
    console.log(chalk.bgBlue.white.bold(" 🚀 SST-ARCHITECT ") + chalk.blue(" | Final High-Fidelity Build\n"));

    while (true) {
        const spinner = ora({ text: "Agent Thinking...", color: 'blue' }).start();
        
        try {
            const completion = await client.chat.completions.create({
                model: "openai/gpt-4o-mini",
                messages: messages,
                temperature: 0, 
            });

            spinner.stop();
            const raw = completion.choices[0].message.content;
            
            // Bulletproof JSON Extraction
            const start = raw.indexOf('{');
            const end = raw.lastIndexOf('}');
            const action = JSON.parse(raw.substring(start, end + 1));
            
            messages.push({ role: "assistant", content: JSON.stringify(action) });

            if (action.step === "THINK") {
                console.log(chalk.yellow(`💡 THINK: ${action.content}`));
            } 
            else if (action.step === "TOOL") {
                console.log(chalk.magenta(`🛠️ ACTION: ${action.tool}`));
                let args = action.args || {};
                
                if (["writeFile", "openInBrowser"].includes(action.tool)) {
                    args.filePath = path.join(outputDir, args.filePath || "index.html");
                }
                if (action.tool === "setupProject") args.folderPath = outputDir;

                const result = await tool_map[action.tool](args);
                console.log(chalk.cyan(`👀 OBSERVE: ${result}`));
                messages.push({ role: "user", content: `OBSERVATION: ${result}` });
            } 
            else {
                console.log(chalk.green.bold("\n🏆 ASSIGNMENT COMPLETE - Site is live!\n"));
                break;
            }
        } catch (error) {
            spinner.stop();
            messages.push({ role: "user", content: "Invalid JSON. Please return ONLY the JSON object with perfect escaping." });
        }
    }
}
runAgent();