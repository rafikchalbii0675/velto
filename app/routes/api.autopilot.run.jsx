import { json } from "@remix-run/node";
import { runScheduledAutopilot } from "~/models/scheduler.server";

export async function loader() {
  try {
    const results = await runScheduledAutopilot();

    return json({
      ok: true,
      autopilot: results,
    });
  } catch (error) {
    console.error("Auto‑Pilot Error:", error);

    return json(
      {
        ok: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
