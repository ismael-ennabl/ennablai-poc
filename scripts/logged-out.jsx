/* Logged-out home: marketing-style top bar + minimal chat composer */

function LoggedOutHome({ onLogin, onSignup }) {
  const [message, setMessage] = React.useState('');

  // Sending while logged out bounces back into the auth'd app
  const send = () => {
    if (!message.trim()) return;
    onLogin();
  };

  return (
    <div
      className="flex flex-col h-full w-full"
      data-screen-label="Logged out"
      style={{ background: '#f7f9fd' }}
    >
      {/* Top bar */}
      <header className="h-16 shrink-0 border-b border-[#e0eaf9] bg-white flex items-center justify-between px-6">
        <img src="assets/logo.svg" alt="ennabl AI" className="h-5" />
        <div className="flex items-center gap-3">
          <button
            onClick={onLogin}
            className="text-sm font-medium text-[#1e1e1e] hover:text-[#0000C5] px-3 h-9 rounded-lg transition-colors"
          >
            Log in
          </button>
          <button
            onClick={onSignup}
            className="text-sm font-medium text-white bg-[#0000C5] hover:bg-[#000093] px-4 h-9 rounded-lg transition-colors"
          >
            Sign up
          </button>
        </div>
      </header>

      {/* Centered chat */}
      <div className="flex-1 flex items-center justify-center px-6 min-h-0">
        <div className="w-full max-w-[720px] flex flex-col items-center">
          <h1 className="text-[28px] font-semibold text-[#1e1e1e] tracking-tight mb-7">
            What can I help you with?
          </h1>

          <div className="w-full">
            <Composer
              message={message}
              setMessage={setMessage}
              onSend={send}
              placeholder="Message Ennabl AI…"
              autoFocus
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="shrink-0 pb-8 px-6">
        <p className="text-center text-[13px] text-[rgba(130,135,176,0.95)] leading-[1.5]">
          By messaging Ennabl AI, an AI chatbot, you agree to our{' '}
          <button onClick={onLogin} className="underline hover:text-[#0000C5] transition-colors">
            Terms
          </button>{' '}
          and have read our{' '}
          <button onClick={onLogin} className="underline hover:text-[#0000C5] transition-colors">
            Privacy Policy
          </button>
          .{' '}
          <button onClick={onLogin} className="underline hover:text-[#0000C5] transition-colors">
            See Cookie Preferences
          </button>
          .
        </p>
      </footer>
    </div>
  );
}

Object.assign(window, { LoggedOutHome });
