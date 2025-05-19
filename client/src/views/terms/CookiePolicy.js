import React from "react";

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

const CookiePolicy = ({ searchQuery }) => {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-semibold mb-8">
        {highlight("Cookie Policy", searchQuery)}
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl md:text-3xl font-medium mb-4 font-sans">
            {highlight("COOKIES: WHAT THEY ARE AND HOW TO REMOVE THEM", searchQuery)}
          </h2>
          <p className="text-black text-base md:text-lg leading-relaxed">
            {highlight(`Most web sites you visit will use cookies to improve your user
            experience by enabling that website to 'remember' you, either for
            the duration of your visit (using a 'session cookie') or for repeat
            visits (using a 'persistent cookie'). All very confusing we know.
            But cookies have been around for years and are part of what makes
            web sites work.`, searchQuery)}
          </p>
          <p className="text-black text-base md:text-lg mt-4">
            {highlight(`Cookies do lots of different jobs, like letting you navigate between
            pages efficiently, storing your preferences, and generally improving
            your experience of a website.`, searchQuery)}
          </p>
          <p className="text-black text-base md:text-lg mt-4">
            {highlight(`Cookies make the interaction between you and the website faster and
            easier. If a website doesn't use cookies, it will think you are a
            new visitor every time you move to a new page on the site – for
            example, when you enter your login details and move to another page,
            it won't recognize you and it won't be able to keep you logged in.`, searchQuery)}
          </p>
          <p className="text-black text-base md:text-lg mt-4">
            {highlight(`Cookies may be set by the website you are visiting ('first party
            cookies') or they may be set by other websites who run content on
            the page you are viewing ('third party cookies').`, searchQuery)}
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-3xl font-medium mb-4 font-sans">
            {highlight("WHAT IS IN A COOKIE?", searchQuery)}
          </h2>
          <p className="text-black text-base md:text-lg leading-relaxed">
            {highlight(`A cookie is a simple text file that is stored on your computer or
            mobile device by a website's server and only that server will be
            able to retrieve or read the contents of that cookie.`, searchQuery)}
          </p>
          <p className="text-black text-base md:text-lg mt-4">
            {highlight(`Each cookie is unique to your web browser. It will contain some
            anonymous information such as a unique identifier and the site name
            and some digits and numbers. It allows a website to remember things
            like your preferences or what's in your shopping basket. It doesn't
            store your name, address or inside leg measurement.`, searchQuery)}
          </p>
        </section>
      </div>
    </div>
  );
};

export default CookiePolicy;
