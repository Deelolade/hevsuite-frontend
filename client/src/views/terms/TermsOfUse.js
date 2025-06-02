import React from 'react';
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
const TermsOfUse = ({ searchQuery}) => {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-semibold mb-8">
        {highlight('Terms of Use', searchQuery)}
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-3xl font-medium mb-4">
            {highlight('1. CONTENT ON THIS SITE', searchQuery)}
          </h2>
          <p className="text-black text-base sm:text-lg leading-relaxed">
            {highlight(
              'Your use of this Site and any content, including without limit, any data, logo, graphics, photographs, images, animations, software, apps, forms, video, music and other audio/visual materials that you access ("Content") is subject to these Terms. Any Content that you access on this Site is either owned by us (or third parties who licence such Content to us) and is made available only for your own personal use and on the condition that you must not republish, post, transmit, upload, copy, edit, adapt, distribute any Content without our prior written permission.',
              searchQuery
            )}
          </p>
          <p className="text-black mt-4 text-base sm:text-lg">
            {highlight(
              'To the maximum extent legally permitted, you cannot link to or use or extract data from this Site or any part of the Site or Content for any commercial purpose or use our Trade Marks in a way that suggests that your business has any endorsement from or affiliation to us without our prior written permission (at our sole discretion).',
              searchQuery
            )}
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-medium mb-4">
            {highlight('2. LINKS TO OTHER WEBSITES', searchQuery)}
          </h2>
          <p className="text-black leading-relaxed text-base sm:text-lg">
            {highlight(
              'This Site may link to third party websites from time to time. These links are provided for your convenience only. We do not control third party websites and are not responsible for their contents or how they operate. Where this Site includes any links to third party websites, this does not imply any endorsement by us of the third party website and you acknowledge that (to the maximum extent legally permitted and unless we state otherwise) we shall not be liable in respect of your use of those third party websites or any purchase you make through them.',
              searchQuery
            )}
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-medium mb-4">
            {highlight('3. YOUR USE OF THIS SITE', searchQuery)}
          </h2>
          <p className="text-black leading-relaxed text-base sm:text-lg">
            {highlight(
              'You must only use this Site for legal purposes in accordance with these Terms and are prohibited from using our Site to engage in any fraudulent activity or in a manner that infringes our intellectual property rights or those of any third party. Your use of our Site is subject to our other rules and other policies or guidelines that we may communicate to you from time to time.',
              searchQuery
            )}
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-medium mb-4">
            {highlight('4. INVALIDITY & WAIVER', searchQuery)}
          </h2>
          <p className="text-black leading-relaxed text-base sm:text-lg">
            {highlight(
              'If any of these Terms is found by a court or a regulator to be invalid or unenforceable, the other provisions shall continue to apply to the maximum extent legally permitted. No waiver by us of any of these Terms (which must be in writing by us and a waiver of non-enforcement) shall not be construed as a waiver of any subsequent breach.',
              searchQuery
            )}
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-medium mb-4">
            {highlight('5. GOVERNING LAW', searchQuery)}
          </h2>
          <p className="text-black leading-relaxed text-base sm:text-lg">
            {highlight(
              'In the event of any dispute between you and us concerning these Terms, the laws of England and Wales will apply. If you wish to take court proceedings against us, you should do so within England and Wales, except to the extent that applicable law in your country of residence requires mandatory application of another law and/or jurisdiction and such requirement cannot be derogated from by contract, in which case such law and/or jurisdiction shall apply, as far as legally required.',
              searchQuery
            )}
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfUse;
