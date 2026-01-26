import { useState } from 'react';

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white shadow-sm flex items-center justify-between px-4 h-14">
        <button
          onClick={() => setIsOpen(true)}
          className="text-2xl"
          aria-label="Open menu"
        >
          ☰
        </button>
        <span className="font-semibold">Moments</span>
      </header>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:static z-50
          h-full w-64 bg-white shadow-md
          flex flex-col p-6
          transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">🎡</h1>
          <button
            className="md:hidden text-xl"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-4">
          <button className="text-gray-700 hover:text-black font-medium text-left">
            Moments
          </button>
          <button className="relative group text-gray-700 font-medium text-left overflow-hidden rounded-md">
            <span className="block transition-opacity duration-200 group-hover:opacity-30">
              Account
            </span>

            <span className="pointer-events-none absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-start px-2">
              <span className="text-white text-xs font-semibold tracking-wide uppercase bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
                Coming soon
              </span>
            </span>
          </button>
        </nav>
      </aside>
    </>
  );
};
