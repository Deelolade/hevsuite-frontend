import { useState, useEffect } from "react";
import Event from "./Event";
// Placeholder imports for new tab components
import YourEvents from "./YourEvents";
import PendingApproval from "./PendingApproval";
import OutstandingPayments from "./OutstandingPayments";
import AffiliatePartners from "./AffiliatePartners";
import Profile from "../../components/Profile"
import { BiSearch } from "react-icons/bi"
import axios from 'axios';
import { base_url } from '../../constants/axiosConfig';

const tabList = [
  { label: "All Events", key: "all" },
  { label: "Your Events", key: "your" },
  { label: "Pending Approval", key: "Pending" },
  { label: "Outstanding Payments", key: "outstanding" },
  { label: "Affiliate Partners", key: "affiliate" },
];

export default function Events() {
  const [activeTab, setActiveTab] = useState("all");
  const [userPermissions, setUserPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get user role from localStorage
  const userRole = JSON.parse(localStorage.getItem('admin'))?.role;

  // Fetch user permissions
  useEffect(() => {
    const fetchRolesAndPermissions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${base_url}/api/permissions`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        // Find the user's role and get its permissions
        const userRoleData = response.data.find(role => role.role === userRole);

        if (userRoleData) {
          setUserPermissions(userRoleData.permissions);
          
          // Set default active tab based on permissions
          if (userRoleData.permissions.includes("Event Management (Your events)")) {
            setActiveTab("your");
          } else if (userRoleData.permissions.includes("Event Management (Payment and Partners)")) {
            setActiveTab("outstanding");
          }
        } else {
          // If no specific role found, set default permissions for superadmin
          if (userRole === 'superadmin') {
            setUserPermissions([]);
          } else {
            setUserPermissions([]);
          }
        }
      } catch (error) {
        console.error('Error fetching roles:', error);
        setUserPermissions([]);
      } finally {
        setLoading(false);
      }
    };

    if (userRole) {
      fetchRolesAndPermissions();
    } else {
      setUserPermissions([]);
      setLoading(false);
    }
  }, [userRole]);

  // Filter tabs based on permissions
  const getFilteredTabs = () => {
    if (userPermissions.includes("Event Management (Your events)")) {
      return tabList.filter(tab => tab.key === "your");
    } else if (userPermissions.includes("Event Management (Payment and Partners)")) {
      return tabList.filter(tab => ["outstanding", "affiliate"].includes(tab.key));
    } else if (userPermissions.includes("Events Management")) {
      // If user has "Events Management" but not specific permissions, exclude "Your Events" tab
      return tabList.filter(tab => tab.key !== "your");
    } else {
      // If no specific permissions or superadmin, show all tabs
      return tabList;
    }
  };

  const filteredTabs = getFilteredTabs();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="p-2 md:p-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1 w-full max-w-2xl mx-auto px-0 md:px-8">
          <div className="relative w-full">
            <BiSearch className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-gray-400 text-lg hidden md:flex" />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full px-10 md:px-8 py-2.5 rounded-full border border-gray-400 focus:outline-none text-sm"
            />
          </div>
        </div>
        <div className="w-full md:w-auto flex justify-end">
          <Profile />
        </div>
      </div>
      <div className="mb-6 border-b border-gray-200 px-2 md:px-0">
        <nav className="flex flex-row space-x-2 md:space-x-8 overflow-x-auto overflow-y-hidden scrollbar-hide" aria-label="Tabs">
          {filteredTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 -mb-px border-b-2 font-medium text-sm focus:outline-none transition-colors duration-200 whitespace-nowrap ${
                activeTab === tab.key
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="px-0 md:px-0">
        {activeTab === "all" && <Event />}
        {activeTab === "your" && <YourEvents />}
        {activeTab === "Pending" && <PendingApproval />}
        {activeTab === "outstanding" && <OutstandingPayments />}
        {activeTab === "affiliate" && <AffiliatePartners />}
      </div>
    </div>
  );
} 