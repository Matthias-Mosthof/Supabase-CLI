import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Database } from "./types.ts";

console.log("Hello from `resend` function!");

type PostRecord = Database["public"]["Tables"]["posts"]["Row"];
interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  record: null | PostRecord;
  schema: "public";
  old_record: null | PostRecord;
}

serve(async (req) => {
  const payload: WebhookPayload = await req.json();
  const newPost = payload.record;
  const deletedPost = payload.old_record;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
    },
    body: JSON.stringify({
      from: "Urlaubsgesellschaft <info@urlaubsgesellschaft.de>",
      to: [deletedPost?.email ?? newPost?.email],
      subject: deletedPost
        ? "Post gelöshct"
        : "Post erstellt",
      html: deletedPost
        ? `Hey ${deletedPost.name}, Post wurde gelöscht! Deine Email ${deletedPost?.email}`
        : `Hey ${newPost?.name} Post wurde erstellt! Deine Email ${newPost?.email}`,
    }),
  });

  const data = await res.json();
  console.log({ data });

  return new Response("ok");
});
