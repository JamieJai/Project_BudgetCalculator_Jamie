function Button({ title, children, ...props }) {
  return (
    <button
      className="flex items-center gap-2 bg-slate-600 rounded-md px-2 py-1 text-white hover:text-slate-200 hover:bg-slate-900 shadow-md"
      {...props}
    >
      {title}
      <span>{children}</span>
    </button>
  );
}

export default Button;
