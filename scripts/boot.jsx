/* Boot flow: spinner (≈5s) → Terms → main app */

function BootSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-white">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-[#e0eaf9]"></div>
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#0000C5]/40"
          style={{ animation: 'enspin 1s linear infinite' }}
        ></div>
      </div>
      <p
        className="mt-8 text-[15px] text-[rgba(130,135,176,0.95)] text-center max-w-[420px] px-6"
        style={{ lineHeight: '1.55' }}
      >
        Brewing your ennablAI workspace — good things take a couple of minutes…
      </p>
      <style>{`
        @keyframes enspin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

const EULA_BODY = [
  { type: 'h', text: 'END USER LICENSE AGREEMENT' },
  {
    type: 'p',
    text:
      'This End-User License Agreement (the **"EULA"**) is an agreement between (a) your legal entity and its subsidiaries and affiliates (collectively, **"Agency"** or **"you"**) and (b) Ennabl, Inc. (**"Ennabl"** or **"we"**), and governs your use of the Ennabl Offerings (as defined below). BY ACCESSING AND/OR USING THE ENNABL OFFERINGS YOU AGREE TO BE BOUND BY THE TERMS OF THIS EULA.',
  },
  {
    type: 'p',
    text:
      '**1. License.** Subject to the terms and conditions of this EULA, Ennabl grants to you a limited, revocable, non-exclusive, non-transferable right and license, to access and use the Ennabl Offerings in accordance with the terms of this EULA solely for your internal business purposes. You will use commercially reasonable efforts to prevent unauthorized access to, or use of, the Ennabl Offerings, and agree to notify Ennabl promptly of any such unauthorized use that becomes known to you. Ennabl or its licensors own all right, title and interest in and to the Ennabl Offerings, including all copyright, patent and other intellectual property or other proprietary rights in the Ennabl Offerings. No title to or ownership of the Ennabl Offerings or any associated intellectual property or proprietary rights are transferred to you by these terms.',
  },
  {
    type: 'p',
    text:
      '**2. Restrictions.** Section 1 states the entirety of your rights with respect to the Ennabl Offerings, and we reserve all rights not expressly granted to you in this EULA. Without limiting the foregoing, you will not do, or authorize or permit any third party to do, any of the following: (a) reverse engineer, decompile, disassemble or otherwise attempt to discover the source code, object code or underlying structure, ideas or algorithms of the Ennabl Offerings; (b) modify, translate, or create derivative works based on the Ennabl Offerings; (c) use the Ennabl Offerings for timesharing or service bureau purposes or otherwise for the benefit of a third party; or (d) remove any proprietary notices or labels.',
  },
  {
    type: 'p',
    text:
      '**3. Data.** You retain all rights, title and interest in and to your data. You grant Ennabl a limited license to host, copy, process, transmit and display your data solely as necessary to provide the Ennabl Offerings to you and to improve the services in accordance with our privacy policy and applicable agreements.',
  },
  {
    type: 'p',
    text:
      '**4. Confidentiality.** Each party agrees that all code, inventions, know-how, business, technical and financial information disclosed by such party constitute the confidential property of the disclosing party, provided that it is identified as confidential at the time of disclosure or should be reasonably known by the receiving party to be confidential or proprietary.',
  },
];

function renderEulaInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/);
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-[#1e1e1e]">
          {p.slice(2, -2)}
        </strong>
      );
    }
    return <React.Fragment key={i}>{p}</React.Fragment>;
  });
}

function TermsScreen({ onAccept }) {
  return (
    <div className="flex flex-col h-full w-full" style={{ background: '#f7f9fd' }}>
      {/* Top bar — thin divider like the wireframe */}
      <div className="h-12 shrink-0 border-b border-[#e0eaf9] bg-white" />

      {/* Body */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-[920px] mx-auto px-8 pt-10 pb-6">
          <h1 className="text-[28px] font-semibold text-[#1e1e1e] leading-9 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-[15px] text-[rgba(130,135,176,0.95)] mt-1.5">Version 2026-05</p>

          <div
            className="mt-7 bg-white border border-[#e0eaf9] rounded-[14px] px-12 py-10 max-h-[58vh] overflow-auto"
            style={{ scrollbarGutter: 'stable' }}
          >
            <div className="flex flex-col gap-5 text-[15px] leading-[1.7] text-[#1e1e1e] max-w-[720px] mx-auto">
              {EULA_BODY.map((b, i) =>
                b.type === 'h' ? (
                  <h2 key={i} className="text-[15px] font-semibold text-[#1e1e1e]">
                    {b.text}
                  </h2>
                ) : (
                  <p key={i}>{renderEulaInline(b.text)}</p>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="shrink-0 bg-white border-t border-[#e0eaf9]">
        <div className="max-w-[920px] mx-auto px-8 py-4 flex items-center justify-between gap-4">
          <p className="text-[13px] text-[rgba(130,135,176,0.95)]">
            By clicking "Accept", you agree to the terms of service above.
          </p>
          <button
            onClick={onAccept}
            className="bg-[#0000C5] hover:bg-[#000093] text-white text-sm font-medium h-10 px-5 rounded-lg transition-colors"
          >
            Accept &amp; Continue
          </button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { BootSpinner, TermsScreen });
