// import React, { useState } from "react";
// import { renderCurrentListView } from "./yourAsks/CurrentList";
// import { renderArchivedListView } from "./yourAsks/ArchivedList";
// import { renderCurrentGridView } from "./yourAsks/CurrentGrid";
// import { renderArchivedGridView } from "./yourAsks/ArchivedGrid";
// import AcceptedGridCurrent from "./accepted/AcceptedGridCurrent";
// import AcceptedListCurrent from "./accepted/AcceptedListCurrent";
// import AcceptedGridArchived from "./accepted/AcceptedGridArchived";
// import AcceptedListArchived from "./accepted/AcceptedListArchived";

// const AskCard = ({ ask, view, activeTab, filter }) => {
//   const renderView = () => {
//     if (activeTab === "Your Asks") {
//       if (filter === "Current") {
//         return view === "grid"
//           ? renderCurrentGridView(ask, activeTab)
//           : renderCurrentListView(ask, activeTab);
//       } else {
//         return view === "grid"
//           ? renderArchivedGridView(ask)
//           : renderArchivedListView(ask);
//       }
//     } else {
//       if (filter === "Current") {
//         return view === "grid"
//           ? AcceptedGridCurrent(ask, activeTab)
//           : AcceptedListCurrent(ask, activeTab);
//       } else {
//         return view === "grid"
//           ? AcceptedGridArchived(ask)
//           : AcceptedListArchived(ask);
//       }
//     }
//   };

//   return renderView();
// };

// export default AskCard;

import React, { useState } from "react";
import { renderCurrentListView } from "./yourAsks/CurrentList";
import { renderArchivedListView } from "./yourAsks/ArchivedList";
import { renderCurrentGridView } from "./yourAsks/CurrentGrid";
import { renderArchivedGridView } from "./yourAsks/ArchivedGrid";
import AcceptedGridCurrent from "./accepted/AcceptedGridCurrent";
import AcceptedListCurrent from "./accepted/AcceptedListCurrent";
import AcceptedGridArchived from "./accepted/AcceptedGridArchived";
import AcceptedListArchived from "./accepted/AcceptedListArchived";

const AskCard = ({ ask, view, activeTab, filter ,dispatch}) => {
  // No changes needed to the main logic, just ensuring the components it calls are responsive
  const renderView = () => {
    if (activeTab === "Your Asks") {
      if (filter === "Current") {
        return view === "grid"
          ? renderCurrentGridView(ask, activeTab,dispatch)
          : renderCurrentListView(ask, activeTab,dispatch);
      } else {
        return view === "grid"
          ? renderArchivedGridView(ask,dispatch)
          : renderArchivedListView(ask,dispatch);
      }
    } else {
      if (filter === "Current") {
        return view === "grid"
          ? AcceptedGridCurrent(ask, activeTab,dispatch)
          : AcceptedListCurrent(ask, activeTab,dispatch);
      } else {
        return view === "grid"
          ? AcceptedGridArchived(ask,dispatch)
          : AcceptedListArchived(ask,dispatch);
      }
    }
  };

  return renderView();
};

export default AskCard;
