import { useEffect } from "react";
import { useSelector } from "react-redux"
import constants from "../constants";
import { useNavigate } from "react-router-dom";

const useUserMembership = ( ) => {

    const navigate = useNavigate();
    const { user } = useSelector(s => s.auth);
    const { Settings } = useSelector(s => s.generalSettings);

    useEffect(( ) => {

        if(user && Settings) {  

            if(user.membershipStatus === constants.membershipStatus.declined) {
                navigate("/application-declined", {replace:true});
                return;
            }

            if(user.membershipStatus === constants.membershipStatus.accepted && user.joinFeeStatus === constants.joinFeeStatus.paid)
              return;

            if(user.membershipStatus === constants.membershipStatus.accepted && user.joinFeeStatus === constants.joinFeeStatus.pending && Settings.membershipFee){
                navigate("/register-7");
                return;
            }

           if (Settings.requiredReferralNumber > 0) {
              
               if(user.membershipStatus !== constants.membershipStatus.accepted) {
                  navigate("/register-6")
                  return;
                }
                    
                if(Settings.membershipFee ){
                    navigate("/register-7");
                    return;
                }
           }

        }

    }, [user, Settings])

}

export default useUserMembership