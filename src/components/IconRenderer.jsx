import * as LucideIcons from 'lucide-react';

export default function IconRenderer({ name, size = 20, color = 'currentColor' }) {
  const IconComponent = LucideIcons[name] || LucideIcons.Image;
  return <IconComponent size={size} color={color} />;
}
