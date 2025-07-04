// app/search/page.tsx
import { redirect } from "next/navigation";

export default function RedirectSearch() {
  redirect("/"); // or whatever default query you want
}
