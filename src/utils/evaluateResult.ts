interface EvalResult {
  stdout: string;
  stderr: string;
}

export function evaluateSubmission(
  result: EvalResult,
  expectedOutput: string,
): void {
  if (!result) {
    console.log("❌ No result returned from execution");
    return;
  }
  if (result.stderr === "TLE") {
    console.log("❌ Runtime error: TLE");
    return;
  }

  if (result.stderr) {
    console.log("❌ Runtime error:", result.stderr);
    return;
  }

  const normalizedStdout = result.stdout.replace(/\s+/g, "");
  const normalizedOutput = expectedOutput.replace(/\s+/g, "");

  if (normalizedStdout === normalizedOutput) {
    console.log("✅ Passed");
  } else {
    console.log(
      `❌ Failed: Expected "${expectedOutput}", got "${result.stdout.trim()}"`,
    );
  }
}
