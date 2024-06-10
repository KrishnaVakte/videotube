export default function IconBtn({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      className={`flex items-center ${
        outline ? "border border-purple bg-transparent" : "bg-purple"
      } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-5 ${customClasses}`}
      type={type}
    >
      {children ? (
        <>
          <span className={`${outline && "text-purple"}`}>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  );
}
