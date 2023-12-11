import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Database } from "./types.ts";

console.log("Hello from `resend` function!");

type MessageRecord = Database["public"]["Tables"]["messages"]["Row"];
interface WebhookPayload {
  type: "INSERT";
  table: string;
  record: null | MessageRecord;
  schema: "public";
  old_record: null | MessageRecord;
}

serve(async (req) => {
  const payload: WebhookPayload = await req.json();
  const newMessage = payload.record;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
    },
    body: JSON.stringify({
      from: "Urlaubsgesellschaft <info@urlaubsgesellschaft.de>",
      to: [newMessage?.toEmail],
      subject: 'Du hast eine neue Nachricht erhalten!',
      reply_to: newMessage?.fromEmail,
      html: `Hallo ${newMessage?.toName}! Neue Nachricht von ${newMessage?.fromName}: ${newMessage?.text}`
    }),
  });


  const data = await res.json();
  console.log({ data });

  return new Response("ok");
});
