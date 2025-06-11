import { useEffect, useState } from "react";
import supportRequestService from "../services/supportRequestService";
import { useSelector } from "react-redux";
import constants from "../constants";

const useUserIdentificationApproved = () => {
    const [ userIdentificationApproved, setUserIdentificationApproved ] = useState(false);
    const { user } = useSelector(s => s.auth);

    useEffect(( ) => {

        const checkIdentificationApproved = async( ) => {

            try { 
                
                const requests = await supportRequestService.getSupportRequests();
                // check if one of the requests is approved
                const isIdentificationApproved = requests.some(r => r.status === constants.supportRequestStatus.approved);
                
                setUserIdentificationApproved(isIdentificationApproved);

            }catch(ex) {
                console.error("[Support Request]: ", ex);
            }

        }

    checkIdentificationApproved()

  }, [user]);

  return {userIdentificationApproved}
}

export default useUserIdentificationApproved