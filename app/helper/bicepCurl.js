// This file serves as an exmaple of how to recognize a correct pose

function bicepCurl(keypoints, s, counter){
    let angle = find_angle(
      {x: POINTS["RIGHT_SHOULDER"], y: keypoints[POINTS["RIGHT_SHOULDER"]].y},
      {x: keypoints[POINTS["RIGHT_ELBOW"]].x, y: keypoints[POINTS["RIGHT_ELBOW"]].y},
      {x: keypoints[POINTS["RIGHT_WRIST"]].x, y: keypoints[POINTS["RIGHT_WRIST"]].y},
      ) * 180 / Math.PI;
      if (angle > 160){
        s = "Move your arm up next"
      }
      if (angle < 30 && s=="Move your arm up next") {
        s = "Move your arm down next";
        counter += 1;
      }
      return s, counter
}