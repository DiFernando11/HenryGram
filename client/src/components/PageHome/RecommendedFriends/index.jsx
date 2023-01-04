import React, { useEffect } from "react";
import CardPreviewMessage from "../../PageChats/CardPreviewMessage";
import logoMatch from "../../../assets/coheteHenry.png";
import SkeletonUser from "../../Skeletons/skeletonUser";
import { useDispatch, useSelector } from "react-redux";
import { getRecomendedMatches } from "../../../redux/actions";
import CardRecommendedMatch from "../CardRecommendedMatch";

function RecommendedFriends() {
  const dispatch = useDispatch();
  const userInformation = useSelector((state) => state.userInformation);
  const matchsRecommended = useSelector((state) => state.matchsRecommended)?.filter(e => typeof e.avatar === 'string');
  useEffect(() => {
    if (userInformation) {
      dispatch(getRecomendedMatches(userInformation?._id));
    }
  }, [userInformation]);
  console.log(matchsRecommended)
  return (
    <section className="w-2/6 bg-neutral-800 hidden lg:block">
      <div className="flex items-center h-16 justify-center gap-2 ">
        <h3 className="text-white">People you can match</h3>
        <img src={logoMatch} className="w-6 h-6" alt="logo match" />
      </div>
      <div className="h-[calc(100vh-4rem)] overflow-y-scroll">
        {/* {matchsRecommended?.length &&
          matchsRecommended.map((message) => (
            <CardPreviewMessage
              key={message?._id}
              id={message?._id}
              image={message?.avatar}
              name={message?.title}
              message={message?.title}
            />
          ))} */}
          {matchsRecommended?.length &&
          matchsRecommended.map((message) => (
            <CardRecommendedMatch
              key={message?._id}
              id={message?._id}
              image={message?.avatar}
              name={message?.title}
            />
          ))}
          {matchsRecommended && !matchsRecommended.length && <div>There are no Incidents</div>}
        {!matchsRecommended &&
          [1, 2, 3, 4, 5, 6, 7, 8].map((value) => <SkeletonUser key={value} />)}
      </div>
    </section>
  );
}

export default RecommendedFriends;
const messages = [
  // {
  //   id: 1,
  //   image:
  //     "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
  //   name: "Reunion con amigos",
  //   message: "23 de Julio",
  // },
];
