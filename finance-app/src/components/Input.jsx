export default function Input({ label, type = 'text', placeholder, value, onChange, icon }) {
    return (
        <div className="mb-4">
            {label && (
                <label className="block text-textTitle text-xs font-medium mb-2">
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-textSecondary">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    className={`w-full bg-inputBg border border-transparent text-textMain text-sm rounded-md focus:ring-2 focus:ring-primary focus:border-transparent block py-3.5 placeholder-gray-600 transition-all focus:outline-none ${icon ? 'pl-10' : 'p-3'}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}
