import { useRouter } from "next/navigation";
import { BROCHURE_URL } from "./site";

/*
  Brochure gate.
  Every "Brochure" call-to-action goes to the enquiry form with Purpose set to "Brochure Download"
  (scrolling there on the home page, or opening /?brochure=1#enquire from other pages).
  After submitting, the visitor lands on the thank-you page, which is the only place the PDF downloads.
  unlockBrochure() records the submit so /thank-you can't be opened directly without filling the form.

  Note: the PDF still sits in /public, so someone who knows the exact URL can open it.
  Fully locking the file needs the form to post to a server first (see the TODO in EnquiryForm).
*/

const STORAGE_KEY = "fc-brochure-unlocked";
export const BROCHURE_REQUEST_EVENT = "fc:brochure-request";

export function isBrochureUnlocked() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function unlockBrochure() {
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // storage blocked (private mode): the visitor can still use the download button shown after submitting
  }
}

export function downloadBrochure() {
  const a = document.createElement("a");
  a.href = BROCHURE_URL;
  a.download = "Fourcrest-Mansions-Brochure.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export const THANK_YOU_BROCHURE_URL = "/thank-you?brochure=1";
export const BROCHURE_FORM_URL = "/?brochure=1#enquire";

export function useRequestBrochure() {
  const router = useRouter();
  return () => {
    const form = document.getElementById("enquire");
    if (!form) {
      router.push(BROCHURE_FORM_URL); // e.g. from the thank-you page
      return;
    }
    window.dispatchEvent(new Event(BROCHURE_REQUEST_EVENT));
    form.scrollIntoView({ behavior: "smooth" });
  };
}
