// import React, { useState } from "react";
// import NavigationTabs from "./components/NavigationTabs";
// import PaymentMethodSection from "./sections/PaymentMethodSection";
// import EmailNotificationSection from "./sections/EmailNotificationSection";
// import DeleteMembershipSection from "./sections/DeleteMembershipSection";

// const Settings = () => {
//   const [activeTab, setActiveTab] = useState("Payment Method");

//   return (
//     <div className="p-6 text-black">
//       <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

//       {activeTab === "Payment Method" && <PaymentMethodSection />}
//       {activeTab === "Email Notification" && <EmailNotificationSection />}
//       {activeTab === "Delete Membership" && <DeleteMembershipSection />}
//     </div>
//   );
// };

// export default Settings;

import React, { useState } from "react";
import NavigationTabs from "./components/NavigationTabs";
import PaymentMethodSection from "./sections/PaymentMethodSection";
import EmailNotificationSection from "./sections/EmailNotificationSection";
import DeleteMembershipSection from "./sections/DeleteMembershipSection";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Payment Method");

  return (
    <div className="p-3 sm:p-4 md:p-6 text-black">
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "Payment Method" && <PaymentMethodSection />}
      {activeTab === "Email Notification" && <EmailNotificationSection />}
      {activeTab === "Delete Membership" && <DeleteMembershipSection />}
    </div>
  );
};

export default Settings;
