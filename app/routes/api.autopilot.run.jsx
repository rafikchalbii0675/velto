import { json } from "@remix-run/node";
import { runScheduledAutopilot } from "~/models/scheduler.server";

export async function loader() {
  const results = await runScheduledAutopilot();
  return json({ results });
}
