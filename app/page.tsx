import { redirect } from "next/navigation";

// Root path always resolves to the default tab so the site has one
// canonical entry point while still exposing shareable /software and /art
// routes for client-side tab navigation.
export default function RootPage() {
  redirect("/software");
}
