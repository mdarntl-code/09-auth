import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Page Not Found | NoteHub",
    description: "Sorry, the page you are looking for does not exist in the NoteHub system.",
    openGraph:{
        title: "404 — Page Not Found",
        description: "Oops! We couldn't find the page you were looking for.",
        url: "https://notehub.com/404",
        images: [
            {
              url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            },
          ],
    }
}

function NotFound(){
    return <><h1>404 - Page not found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <Link href="/">Back home</Link>
    </>
}

export default NotFound;