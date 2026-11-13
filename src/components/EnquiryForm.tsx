"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import IntlTelInput from "@intl-tel-input/react";
import "intl-tel-input/styles";
import Reveal from "./Reveal";
import TraceButton from "./TraceButton";
import Curtain from "./Curtain";
import { ChevronDownIcon } from "./Icons";
import { BROCHURE_REQUEST_EVENT, THANK_YOU_BROCHURE_URL, unlockBrochure } from "@/lib/brochure";

const purposes = ["Site Visit", "Brochure Download", "General Enquiry"];

// Sobha field: 56px tall, 7px radius, 27px side padding, 15px medium text.
const field =
  "h-14 w-full rounded-[7px] border border-field bg-white/60 px-[18px] text-[15px] lg:px-[27px] font-medium leading-[22.5px] text-ink placeholder:text-muted outline-none transition-[border-color,box-shadow] duration-150 ease-in-out focus:border-brand wide:h-[72px] wide:text-[21px] wide:leading-[31px]";

type SelectProps = {
  name: string;
  label: string;
  options: string[];
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
};

function Select({ name, label, options, required, value, onChange }: SelectProps) {
  return (
    <div className="relative">
      <select
        name={name}
        aria-label={label}
        required={required}
        {...(onChange ? { value, onChange: (e) => onChange(e.target.value) } : { defaultValue: "" })}
        className={`${field} appearance-none pr-[57px]`}
      >
        <option value="">{label}</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-6 top-1/2 size-4 -translate-y-1/2 text-ink/60" />
    </div>
  );
}

export default function EnquiryForm() {
  const router = useRouter();
  const [purpose, setPurpose] = useState("");
  const [phoneValid, setPhoneValid] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "leaving">("idle");

  // A "Brochure" link opens this form with Purpose preset: same page via an event, other pages via ?brochure=1.
  useEffect(() => {
    const onRequest = () => setPurpose("Brochure Download");
    const fromLink = new URLSearchParams(window.location.search).get("brochure") === "1";
    const timer = fromLink ? setTimeout(onRequest, 0) : undefined;
    window.addEventListener(BROCHURE_REQUEST_EVENT, onRequest);
    return () => {
      clearTimeout(timer);
      window.removeEventListener(BROCHURE_REQUEST_EVENT, onRequest);
    };
  }, []);

  // TODO: connect to the client's CRM. Post from a server action / route handler so no keys reach the browser.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!phoneValid) {
      setPhoneError(true);
      return;
    }
    const wantsBrochure = purpose === "Brochure Download";
    unlockBrochure(); // the brochure itself is only offered on the thank-you page

    // Submit transition: brief "Sending" on the button, then the curtain rises and we go to the thank-you page.
    setStatus("sending");
    setTimeout(() => setStatus("leaving"), 500);
    setTimeout(() => router.push(wantsBrochure ? THANK_YOU_BROCHURE_URL : "/thank-you"), 1300);
  };

  return (
    <section id="enquire" className="relative z-10 scroll-mt-16 bg-blush pb-[50px] pt-[60px] lg:pt-[90px]">
      <Curtain show={status === "leaving"} />
      <div className="mx-auto w-full max-w-[1033px] px-4 lg:px-3">
        <div className="grid lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-5">
            <h2 className="mb-[34px] text-center font-serif text-[42px] font-light italic leading-[50px] text-brand lg:text-left lg:text-[52px] lg:leading-[62px] wide:text-[73px] wide:leading-[87px]">
              <span className="font-sans text-[18px] font-light not-italic leading-[21px] tracking-[2.7px] text-ink lg:text-[24px] lg:leading-[29px] lg:tracking-[3.6px] wide:text-[34px] wide:leading-[41px] wide:tracking-[5px]">
                WE&apos;D LOVE TO
              </span>
              <br />
              Hear from you
            </h2>
          </div>

          <Reveal className="min-w-0 lg:col-span-7">
            <form onSubmit={onSubmit} className="lg:mt-[30px]">
              <input name="fullName" required placeholder="Full Name *" aria-label="Full name" autoComplete="name" className={`${field} mb-6`} />

              {/* Flag + dial code picker with a searchable country list (intl-tel-input, same library as Sobha) */}
              <div className="fc-phone mb-6">
                <IntlTelInput
                  initialCountry="in"
                  countryOrder={["in", "ae", "us", "gb", "sg", "au", "ca", "sa", "qa"]}
                  separateDialCode
                  countrySearch
                  showFlags
                  placeholderNumberPolicy="OFF"
                  loadUtils={() => import("intl-tel-input/utils")}
                  onChangeValidity={(valid) => {
                    setPhoneValid(valid);
                    setPhoneError(false);
                  }}
                  inputProps={{
                    name: "phone",
                    required: true,
                    placeholder: "Your Number *",
                    "aria-label": "Your number",
                    autoComplete: "tel-national",
                    className: field,
                  }}
                />
                {phoneError && <p className="mt-1.5 text-[13px] font-medium leading-[19.5px] text-[#d40000] wide:text-[18px] wide:leading-[27px]">Invalid phone number</p>}
              </div>

              <input name="email" type="email" required placeholder="Email *" aria-label="Email" autoComplete="email" className={`${field} mb-6`} />

              <div className="mb-6 grid gap-6 sm:grid-cols-2">
                <Select name="facing" label="- Plot Facing -" options={["East Facing", "West Facing"]} />
                <Select name="purpose" label="- Purpose * -" options={purposes} required value={purpose} onChange={setPurpose} />
              </div>

              <label className="mb-6 flex items-start text-[13px] font-normal leading-5 text-ink/80 wide:text-[18px] wide:leading-[28px]">
                <input type="checkbox" required className="mr-2.5 mt-px size-[19px] shrink-0 accent-brand" />
                <span>
                  I authorise Globus Developers and its representatives to contact me via call, SMS, WhatsApp or email
                  about Fourcrest Mansions. This consent overrides any registration on the DND/NDNC list. *
                </span>
              </label>

              <TraceButton type="submit" disabled={status !== "idle"} className="h-[49px] min-w-[160px] text-[14px] tracking-[2.5px] wide:text-[20px] wide:tracking-[3.5px]">
                {status === "idle" ? (
                  "Submit"
                ) : (
                  <span className="inline-flex items-center gap-2.5">
                    <span className="size-3.5 animate-spin rounded-full border-[1.5px] border-brand border-t-transparent" />
                    Sending
                  </span>
                )}
              </TraceButton>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
