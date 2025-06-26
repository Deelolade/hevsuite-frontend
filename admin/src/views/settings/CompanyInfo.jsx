import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyInfo, updateCompanyInfo, resetCompanyState } from "../../store/setting/companySlice";
import { CountrySelect, StateSelect } from "react-country-state-city";
import { Country, State } from "country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

// Phone code mapping for countries that might not have phonecode in the library
const phoneCodeMapping = {
  Afghanistan: "93",
  Albania: "355",
  Algeria: "213",
  "United States": "1",
  "United Kingdom": "44",
  Canada: "1",
  Australia: "61",
  Germany: "49",
  France: "33",
  Italy: "39",
  Spain: "34",
  Netherlands: "31",
  Belgium: "32",
  Switzerland: "41",
  Austria: "43",
  Sweden: "46",
  Norway: "47",
  Denmark: "45",
  Finland: "358",
  Poland: "48",
  "Czech Republic": "420",
  Hungary: "36",
  Romania: "40",
  Bulgaria: "359",
  Greece: "30",
  Turkey: "90",
  Russia: "7",
  Ukraine: "380",
  India: "91",
  China: "86",
  Japan: "81",
  "South Korea": "82",
  Thailand: "66",
  Vietnam: "84",
  Malaysia: "60",
  Singapore: "65",
  Indonesia: "62",
  Philippines: "63",
  Pakistan: "92",
  Bangladesh: "880",
  "Sri Lanka": "94",
  Nepal: "977",
  Myanmar: "95",
  Cambodia: "855",
  Laos: "856",
  Brazil: "55",
  Argentina: "54",
  Chile: "56",
  Colombia: "57",
  Peru: "51",
  Venezuela: "58",
  Mexico: "52",
  Egypt: "20",
  "South Africa": "27",
  Nigeria: "234",
  Kenya: "254",
  Ghana: "233",
  Ethiopia: "251",
  Morocco: "212",
  Tunisia: "216",
  Algeria: "213",
  Libya: "218",
  Sudan: "249",
  Israel: "972",
  "Saudi Arabia": "966",
  "United Arab Emirates": "971",
  Qatar: "974",
  Kuwait: "965",
  Bahrain: "973",
  Oman: "968",
  Jordan: "962",
  Lebanon: "961",
  Syria: "963",
  Iraq: "964",
  Iran: "98",
  "New Zealand": "64",
};

// Helper to get phone code by country name with fallback mapping
const getPhoneCodeByCountry = (countryName) => {
  if (!countryName) return "";
  // First try to get from the library
  const countries = Country.getAllCountries();
  const country = countries.find((c) => c.name === countryName);
  if (country && country.phonecode) {
    return `+${country.phonecode}`;
  }
  // Fallback to manual mapping
  const phoneCode = phoneCodeMapping[countryName];
  return phoneCode ? `+${phoneCode}` : "+1"; // Default to +1 if not found
};

const getCountryObject = (countryName, countryId) => {
  const countries = Country.getAllCountries();
  if (countryId) {
    const foundById = countries.find((c) => String(c.id) === String(countryId));
    if (foundById) return foundById;
  }
  if (countryName) {
    const foundByName = countries.find((c) => c.name === countryName);
    if (foundByName) return foundByName;
  }
  return null;
};

const getStateObject = (countryId, stateName) => {
  if (!countryId || !stateName) return null;
  const states = State.getStatesOfCountry(countryId);
  return states.find((s) => s.name === stateName) || null;
};

const CompanyInfo = () => {
  const dispatch = useDispatch();
  const { company, isLoading, isSuccess } = useSelector((state) => state.company);
  const [localCompany, setLocalCompany] = useState(company);
  const [isEditing, setIsEditing] = useState(false);

  // Sync local state with Redux state
  useEffect(() => {
    if (!isEditing) {
      let patched = { ...company };
      const countries = Country.getAllCountries();
      // Always sync both country name and id
      if (company.countryId) {
        const found = countries.find((c) => String(c.id) === String(company.countryId));
        if (found) {
          patched.country = found.name;
          patched.countryId = found.id;
        }
      } else if (company.country) {
        const found = countries.find((c) => c.name === company.country);
        if (found) {
          patched.country = found.name;
          patched.countryId = found.id;
        }
      }
      setLocalCompany(patched);
    }
  }, [company, isEditing]);

  // Fetch company info on mount
  useEffect(() => {
    dispatch(getCompanyInfo());
  }, [dispatch]);

  // After successful save, exit edit mode and refresh
  useEffect(() => {
    if (isSuccess && isEditing) {
      setIsEditing(false);
      dispatch(getCompanyInfo());
      dispatch(resetCompanyState());
    }
  }, [isSuccess, isEditing, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalCompany((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountry = (country) => {
    const phoneCode = getPhoneCodeByCountry(country.name);
    setLocalCompany((prev) => ({
      ...prev,
      country: country.name,
      countryId: country.id,
      state: "",
      stateId: "",
      phoneCode,
    }));
  };

  const handleState = (state) => {
    setLocalCompany((prev) => ({
      ...prev,
      state: state.name,
      stateId: state.isoCode,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateCompanyInfo(localCompany));
  };

  if (isLoading && !isEditing) {
    return <div className="text-center p-10">Loading...</div>;
  }

  return (
    <div className="max-w-xxl mx-auto space-y-8 p-10">
      <h2 className="text-2xl font-bold mb-4">Company Information</h2>
      <form className="space-y-4" onSubmit={handleSave}>
        <div>
          <label className="block mb-1 font-medium">Company Name</label>
          <input
            type="text"
            name="name"
            value={localCompany.name || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            readOnly={!isEditing}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Address Line 1</label>
          <input
            type="text"
            name="addressLine1"
            value={localCompany.addressLine1 || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            readOnly={!isEditing}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">City</label>
            <input
              type="text"
              name="city"
              value={localCompany.city || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              readOnly={!isEditing}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Country</label>
            <CountrySelect
              onChange={handleCountry}
              defaultValue={getCountryObject(localCompany.country, localCompany.countryId)}
              placeHolder="Select Country"
              disabled={!isEditing}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #d1d5db",
                fontSize: "16px",
                backgroundColor: !isEditing ? "#f3f4f6" : "white",
                cursor: !isEditing ? "not-allowed" : "pointer",
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">State</label>
            {isEditing ? (
              <StateSelect
                countryid={localCompany.countryId}
                placeHolder="Select State"
                onChange={handleState}
                value={getStateObject(localCompany.countryId, localCompany.state)}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "0.375rem",
                  border: "1px solid #d1d5db",
                }}
              />
            ) : (
              <div className="w-full px-4 py-2 border rounded-lg bg-gray-100 flex items-center justify-between cursor-not-allowed">
                <span className="text-gray-700">{localCompany.state || "Select State"}</span>
              </div>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Postcode</label>
            <input
              type="text"
              name="postcode"
              value={localCompany.postcode || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              readOnly={!isEditing}
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={localCompany.email || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            readOnly={!isEditing}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <div className="flex gap-2">
            {/* Phone code is now read-only and synced with country */}
            <div className="w-24 px-3 py-2 border rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 cursor-not-allowed">
              {localCompany.phoneCode || "+1"}
            </div>
            <input
              type="tel"
              name="phone"
              value={localCompany.phone || ""}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg ${!isEditing ? "bg-gray-100 cursor-not-allowed" : ""}`}
              readOnly={!isEditing}
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium">Website</label>
          <input
            type="text"
            name="website"
            value={localCompany.website || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            readOnly={!isEditing}
          />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          {isEditing ? (
            <>
              <button
                className="px-6 py-2 border rounded-lg"
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setLocalCompany(company); // Reset changes
                }}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-primary text-white rounded-lg"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </>
          ) : (
            <button
              className="px-6 py-2 bg-primary text-white rounded-lg"
              type="button"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CompanyInfo; 