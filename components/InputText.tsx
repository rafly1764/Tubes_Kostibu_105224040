interface InputProps {
  label: string;
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function InputText({ label, type, id, value, onChange, error }: InputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none ${
          error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-emerald-200 focus:border-emerald-500'
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}