// import React from 'react';

// const TermsOfPolicy = () => {
//   return (
//     <div className="max-w-4xl">
//       <h1 className="text-3xl font-semibold mb-8">Terms of Policy</h1>

//       <div className="space-y-8">
//         <section>
//           <h2 className="text-2xl font-medium mb-4">1. WHAT IS THIS PRIVACY POLICY IS FOR?</h2>
//           <p className="text-gray-700 leading-relaxed">
//             This privacy policy ("Privacy Policy") applies to personal data that we collect from you as a user of this Site or as a membership applicant, member or customer ("you" or "your" being interpreted accordingly). It provides information on what personal data we collect, why we collect the personal data, how it is used and the lawful basis on which your personal data is processed, and what your rights are under the applicable data protection and privacy laws, including the General Data Protection Regulation ("GDPR") which will become applicable to us and you as of 25 May 2018. Personal data' as used in this Privacy Policy means any information that relates to you from which you can be identified.
//           </p>
//           <p className="text-gray-700 mt-4">
//             By using our Site or submitting your personal data you are taken to accept the terms of this Privacy Policy, so please read it carefully.
//           </p>
//         </section>

//         <section>
//           <h2 className="text-2xl font-medium mb-4">2. PERSONAL DATA WE COLLECT</h2>
//           <p className="text-gray-700 mb-4">We collect the following personal data about you:</p>
//           <ul className="space-y-4">
//             <li className="text-gray-700">
//               <span className="font-medium">Membership Application:</span> The personal details you provide when submitting a membership application. This includes your name, address, e-mail address; business address and phone number; gender and date of birth; country; a picture of yourself; information about your work and other information that you elect to provide to support your application.
//             </li>
//             <li className="text-gray-700">
//               <span className="font-medium">Reservation Information:</span> Personal data collected in relation to reservations, such as your first and last name, email address, billing and payment information (for further details please also refer to the section below headed.
//             </li>
//             <li className="text-gray-700">
//               <span className="font-medium">Log Data:</span> When you visit our Site, our servers record information ("log data"), including information that your browser automatically sends whenever you visit the Site. This log data includes your Internet Protocol ("IP") address (from which we understand the country you are connecting from at the time you visit the Site), browser type and settings, the date and time of your request.
//             </li>
//           </ul>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default TermsOfPolicy;

import React from "react";

const TermsOfPolicy = () => {
  return (
    <div className="max-w-4xl">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
        1. WHAT IS THIS PRIVACY POLICY IS FOR?
      </h2>
      <div className="space-y-4 md:space-y-6">
        <p className="text-sm md:text-base text-gray-800 leading-relaxed">
          This privacy policy ("Privacy Policy") applies to personal data that
          we collect from you as a user of this Site or as a membership
          applicant, member or customer ("you" or "your" being interpreted
          accordingly). It provides information on what personal data we
          collect, why we collect the personal data, how it is used and the
          lawful basis on which your personal data is processed, and what your
          rights are under the applicable data protection and privacy laws,
          including the General Data Protection Regulation ("GDPR") which will
          become applicable to us and you as of 25 May 2018. Personal data' as
          used in this Privacy Policy means any information that relates to you
          from which you can be identified.
        </p>
        <p className="text-sm md:text-base text-gray-800">
          By using our Site or submitting your personal data you are taken to
          accept the terms of this Privacy Policy, so please read it carefully.
        </p>
      </div>

      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 mt-8 md:mt-10">
        2. PERSONAL DATA WE COLLECT
      </h2>
      <p className="text-sm md:text-base text-gray-800 mb-4">
        We collect the following personal data about you:
      </p>
      <ul className="space-y-4 md:space-y-6 list-disc pl-5 md:pl-6">
        <li className="text-sm md:text-base text-gray-800">
          <span className="font-medium">Membership Application:</span> The
          personal details you provide when submitting business address and
          phone number; gender and date of birth; country; a picture of
          yourself; information about your work and other information that you
          elect to provide to support your application.
        </li>
        <li className="text-sm md:text-base text-gray-800">
          <span className="font-medium">Reservation Information:</span> Personal
          data collected in relation to reservations, such as your first and
          last name, email address, billing and payment information (for further
          details please also refer to the section below headed.
        </li>
        <li className="text-sm md:text-base text-gray-800">
          <span className="font-medium">Log Data:</span> When you visit our
          Site, our servers record information ("log data"), including
          information that your browser automatically sends whenever you visit
          the Site. This log data includes your Internet Protocol ("IP") address
          (from which we understand the country you are connecting from at the
          time you visit the Site), browser type and settings, the date and time
          of your request.
        </li>
      </ul>
    </div>
  );
};

export default TermsOfPolicy;
