import { useEffect, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $enquiry } from '@/stores/ui';
import { enquiryPaths, interests } from '@/content/site-config';
import type { EnquiryPath } from '@/content/types';

type Field = 'name' | 'email' | 'message';

const errors: Record<Field, string> = {
  name: 'Add your name so we know who to reply to.',
  email: 'Enter an email address like name@company.com.',
  message: 'Add a line or two about what you have in mind.',
};

/** Builds a mailto: draft in the visitor's email app. No data leaves the browser. */
export default function EnquiryForm({ email }: { email: string }) {
  const [path, setPath] = useState<EnquiryPath>('attend');
  const [interest, setInterest] = useState<string>(enquiryPaths.attend.interest);
  const [values, setValues] = useState<Record<Field, string>>({ name: '', email: '', message: '' });
  const [bad, setBad] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState('Opens your email app with your enquiry ready to send.');
  const refs = { name: useRef<HTMLInputElement>(null), email: useRef<HTMLInputElement>(null), message: useRef<HTMLTextAreaElement>(null) };

  // Links elsewhere on the page (event cards, services, "ways to participate") prefill the form
  const prefill = useStore($enquiry);
  useEffect(() => {
    if (!prefill.nonce) return;
    if (prefill.path) choosePath(prefill.path);
    if (prefill.interest) setInterest(prefill.interest);
    if (prefill.message) setValues((v) => ({ ...v, message: prefill.message! }));
  }, [prefill]);

  const choosePath = (p: EnquiryPath) => {
    setPath(p);
    setInterest(enquiryPaths[p].interest);
  };

  const validate = (f: Field) => {
    const ok = refs[f].current?.checkValidity() ?? true;
    setBad((b) => ({ ...b, [f]: !ok }));
    return ok;
  };

  const onSubmit = (e: { preventDefault(): void }) => {
    e.preventDefault();
    const failed = (Object.keys(refs) as Field[]).filter((f) => !validate(f));
    if (failed.length) {
      refs[failed[0]].current?.focus();
      return;
    }
    const body = `Hello Aayera,\n\n${values.message}\n\nName: ${values.name}\nEmail: ${values.email}`;
    location.href = `mailto:${email}?subject=${encodeURIComponent('Enquiry: ' + interest)}&body=${encodeURIComponent(body)}`;
    setStatus(`Your draft should now be open in your email app. If it didn't open, email ${email} directly.`);
  };

  const fieldProps = (f: Field) => ({
    id: `f-${f}`,
    name: f,
    required: true,
    value: values[f],
    'aria-invalid': bad[f] || undefined,
    'aria-describedby': bad[f] ? `f-${f}-err` : undefined,
    onChange: (e: { target: { value: string } }) => {
      setValues((v) => ({ ...v, [f]: e.target.value }));
      if (bad[f]) queueMicrotask(() => validate(f));
    },
    onBlur: () => values[f] && validate(f),
  });

  return (
    <form id="enquiry" noValidate data-r style={{ '--d': 1 } as React.CSSProperties} onSubmit={onSubmit}>
      <fieldset>
        <legend>What brings you here?</legend>
        <div className="paths">
          {(Object.keys(enquiryPaths) as EnquiryPath[]).map((p) => (
            <label key={p}>
              <input type="radio" name="path" value={p} checked={path === p} onChange={() => choosePath(p)} />
              {enquiryPaths[p].label}
            </label>
          ))}
        </div>
        <p className="path-note" aria-live="polite">{enquiryPaths[path].note}</p>
      </fieldset>

      <div className="fields">
        <div className={bad.name ? 'field bad' : 'field'}>
          <label htmlFor="f-name">Your name</label>
          <input ref={refs.name} autoComplete="name" {...fieldProps('name')} />
          <span className="err" id="f-name-err">{errors.name}</span>
        </div>
        <div className={bad.email ? 'field bad' : 'field'}>
          <label htmlFor="f-email">Work email</label>
          <input ref={refs.email} type="email" autoComplete="email" {...fieldProps('email')} />
          <span className="err" id="f-email-err">{errors.email}</span>
        </div>
        <div className="field full">
          <label htmlFor="interest">I'm interested in</label>
          <select id="interest" name="interest" value={interest} onChange={(e) => setInterest(e.target.value)}>
            {interests.map((i) => <option key={i}>{i}</option>)}
          </select>
        </div>
        <div className={bad.message ? 'field full bad' : 'field full'}>
          <label htmlFor="f-message">Tell us a little more</label>
          <textarea ref={refs.message} {...fieldProps('message')} />
          <span className="err" id="f-message-err">{errors.message}</span>
        </div>
      </div>

      <div className="form-foot">
        <button className="btn" type="submit">
          Start a conversation <svg aria-hidden="true"><use href="#arrow" /></svg>
        </button>
        <p className="form-status" aria-live="polite">{status}</p>
      </div>
    </form>
  );
}
