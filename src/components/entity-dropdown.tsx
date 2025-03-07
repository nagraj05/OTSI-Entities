import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface EntityDropdownProps {
  label: string;
  placeholder: string;
  options: { key: number; name: string }[];
  value: number | null;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function EntityDropdown({ 
  label, 
  placeholder, 
  options, 
  value, 
  onChange,
  disabled = false
}: EntityDropdownProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Select 
        value={value?.toString() || ""} 
        onValueChange={(val) => onChange(parseInt(val))}
        disabled={disabled || options.length === 0}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.key} value={option.key.toString()}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
} 