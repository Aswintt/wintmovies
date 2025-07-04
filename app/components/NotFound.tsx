import React from "react";

interface Prop {
  text?: string;
}
const NotFound: React.FC<Prop> = ({ text = "Movie not found." }) => {
  return (
    <div className="text-white text-center py-53 bg-[#121212]">{text}</div>
  );
};

export default NotFound;
