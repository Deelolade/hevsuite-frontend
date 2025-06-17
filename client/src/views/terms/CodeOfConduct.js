import { motion } from "framer-motion";

const highlight = (text, query) => {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-yellow-200">
        {part}
      </mark>
    ) : (
      part
    )
  );
};

const CodeOfConduct = ({ policyData, searchQuery }) => {
  return (
    <motion.div className="max-w-4xl">
      {policyData.content.map((item, index) => (
        <div key={index} id={`section-${index}`}>
          <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6">
            {highlight(item.title, searchQuery)}
          </h2>
          <div className="space-y-4 md:space-y-6">
            <p className="text-base md:text-lg text-black leading-relaxed">
              {highlight(item.content, searchQuery)}
            </p>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default CodeOfConduct;
