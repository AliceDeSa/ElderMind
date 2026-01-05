export default function Button({ children, onClick, type = 'button', variant = 'primary', className = '' }) {
    const baseStyles = "w-full font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-primary hover:bg-primaryHover text-white shadow-lg shadow-purple-500/20",
        outline: "bg-transparent border border-border text-textMain hover:bg-border hover:text-white",
        ghost: "bg-transparent text-primary hover:text-primaryHover hover:bg-white/5",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
}
