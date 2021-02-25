import * as actions from "../../store/actions/index";
import { Redirect} from "react-router-dom";

export default function Logout() {
  
    actions.logout();
   
	return (        
        <div>
           <Redirect to="/login" />
        </div>
    );
}