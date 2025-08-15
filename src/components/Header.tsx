//import './Header.scss';

function Header() {
  return (
    <div
      className="h-[clamp(5.25rem,0.75rem+7vw+5vh,6.25rem)] md:h-28 relative
        bottom-4 md:bottom-7"
    >
      <header
        className="rounded-full bg-white h-[clamp(3.5rem,0.75rem+7vw,3.75rem)]
          shadow-lg flex justify-between items-center mt-10 md:mt-12
          px-[clamp(1.25rem,6.75vw,2rem)] sticky top-8 md:top-12"
      >
        <span
          className="font-extrabold tracking-[-0.075em]
            text-[clamp(2.25rem,0.5rem+7vw,2.5rem)] text-navy-900"
        >
          DUPRn't
        </span>
      </header>
    </div>
  );
}

export default Header;
