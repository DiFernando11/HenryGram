import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function FavoriteActivities({id}) {
  
  const profileTechnologies = useSelector((state) => state.userProfileFriend?.technologies);
  const profilePreferences = useSelector((state) => state.userProfileFriend?.preferences);
  const userInformation = useSelector((state) => state.userInformation);

  const [technologies, setTechnologies] = useState([...profileTechnologies]);
  const [preferences, setPreferences] = useState([...profilePreferences]);
  
    return (
    <section>
     
    </section>
  );
}

export default FavoriteActivities;
