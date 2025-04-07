import React from "react";

interface IconButtonProps {
  icon: string;
  label: string;
}

export const IconButton: React.FC<IconButtonProps> = ({ icon, label }) => {
  return (
    <button
      className="icon-button"
      aria-label={label}
      dangerouslySetInnerHTML={{ __html: icon }}
    />
  );
};
