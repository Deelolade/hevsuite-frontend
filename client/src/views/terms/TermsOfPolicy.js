import React from "react";
import { motion } from 'framer-motion';

const highlight = (text, query) => {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-yellow-200">{part}</mark>
    ) : (
      part
    )
  );
};

const TermsOfPolicy = ({ searchQuery }) => {
  return (
    <motion.div className="max-w-4xl">
      <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6">
        {highlight("1. WHAT IS THIS PRIVACY POLICY IS FOR?", searchQuery)}
      </h2>
      <div className="space-y-4 md:space-y-6">
        <p className="text-base md:text-lg text-black leading-relaxed">
          {highlight(
            `This privacy policy ("Privacy Policy") applies to personal data that
          we collect from you as a user of this Site or as a membership
          applicant, member or customer ("you" or "your" being interpreted
          accordingly). It provides information on what personal data we
          collect, why we collect the personal data, how it is used and the
          lawful basis on which your personal data is processed, and what your
          rights are under the applicable data protection and privacy laws,
          including the General Data Protection Regulation ("GDPR") which will
          become applicable to us and you as of 25 May 2018. Personal data' as
          used in this Privacy Policy means any information that relates to you
          from which you can be identified.`, searchQuery)}
        </p>
        <p className="text-base md:text-lg text-black">
          {highlight(
            `By using our Site or submitting your personal data you are taken to
          accept the terms of this Privacy Policy, so please read it carefully.`,
            searchQuery
          )}
        </p>
      </div>

      <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 mt-8 md:mt-10">
        {highlight("2. PERSONAL DATA WE COLLECT", searchQuery)}
      </h2>
      <p className="text-base md:text-lg text-black mb-4">
        {highlight("We collect the following personal data about you:", searchQuery)}
      </p>
      <ul className="space-y-4 md:space-y-6 list-disc pl-5 md:pl-6">
        <li className="text-base md:text-lg text-black">
          <span className="font-medium">Membership Application:</span>{" "}
          {highlight(
            "The personal details you provide when submitting business address and phone number; gender and date of birth; country; a picture of yourself; information about your work and other information that you elect to provide to support your application.",
            searchQuery
          )}
        </li>
        <li className="text-base md:text-lg text-black">
          <span className="font-medium">Reservation Information:</span>{" "}
          {highlight(
            "Personal data collected in relation to reservations, such as your first and last name, email address, billing and payment information (for further details please also refer to the section below headed.",
            searchQuery
          )}
        </li>
        <li className="text-base md:text-lg text-black">
          <span className="font-medium">Log Data:</span>{" "}
          {highlight(
            `When you visit our
          Site, our servers record information ("log data"), including
          information that your browser automatically sends whenever you visit
          the Site. This log data includes your Internet Protocol ("IP") address
          (from which we understand the country you are connecting from at the
          time you visit the Site), browser type and settings, the date and time
          of your request.`,
            searchQuery
          )}
        </li>
      </ul>
    </motion.div>
  );
};

export default TermsOfPolicy;
