import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Field {
  label: string;
  type: string;
  placeholder: string;
  name: string;
}

interface AuthCardProps {
  title: string;
  subtitle: string;
  buttonText: string;
  fields: Field[];
  linkText: string;
  linkHref: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: { [key: string]: string };
}

export default function AuthCard({
  title,
  subtitle,
  buttonText,
  fields,
  linkText,
  linkHref,
  handleChange,
  errors = {},
}: AuthCardProps) {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="flex items-center flex-col border border-[#27272A] rounded-2xl p-8 w-[26rem] h-auto">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-base mt-1 text-gray-400">{subtitle}</p>

        {fields.map((field, index) => (
          <div key={index} className="flex flex-col mt-4 w-full">
            <label className="text-sm font-medium">{field.label}</label>
            <Input
              type={field.type}
              placeholder={field.placeholder}
              name={field.name}
              className={`mt-2 ${errors[field.name] ? "border-red-500" : ""}`}
              onChange={handleChange}
            />
            {errors[field.name] && (
              <span className="text-red-500 text-xs">{errors[field.name]}</span>
            )}
          </div>
        ))}

        <Button className="mt-6 w-full text-white">{buttonText}</Button>

        <div className="flex items-center justify-center mt-5">
          <p className="text-sm">
            {linkText}{" "}
            <a href={linkHref} className="underline underline-offset-4 cursor-pointer ml-1 font-medium">
              Clique aqui
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
