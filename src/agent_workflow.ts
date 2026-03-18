import { OpenAI } from 'openai';

interface WorkflowStep {
  name: string;
  description: string;
  execute: (input: any) => Promise<any>;
}

class AgenticWorkflow {
  private openai: OpenAI;
  private steps: WorkflowStep[] = [];

  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }

  addStep(step: WorkflowStep) {
    this.steps.push(step);
  }

  async run(initialInput: any) {
    let currentInput = initialInput;
    for (const step of this.steps) {
      console.log(`Executing step: ${step.name}`);
      currentInput = await step.execute(currentInput);
    }
    return currentInput;
  }
}

async function main() {
  const workflow = new AgenticWorkflow(process.env.OPENAI_API_KEY!);
  workflow.addStep({
    name: 'Fetch Data',
    description: 'Retrieves raw data for processing',
    execute: async (input) => `Processed: ${input}`
  });
  const result = await workflow.run('Sample Data');
  console.log(`Final Result: ${result}`);
}

main().catch(console.error);
