import { useEffect, useState } from "react";
import moment from "moment";

const CustomeDateDataHandler = (activities) => {
  const [grouped, setGrouped] = useState({
    annually: {},
    quarterly: {},
    monthly: {},
  });

  useEffect(() => {
    const data = {
      annually: {},
      quarterly: {},
      monthly: {},
    };

    activities.forEach((activity) => {
      const user = activity.userId;
      const date = moment(activity.createdAt);

      const addUser = (bucket, key) => {
        if (!bucket[key]) bucket[key] = new Map();
        bucket[key].set(user._id, user); // store by _id to prevent duplicates
      };

      // Yearly
      const year = date.format("YYYY");
      addUser(data.annually, year);

      // Quarterly
      const quarter = `Q${date.quarter()} ${year}`;
      addUser(data.quarterly, quarter);

      // Monthly
      const month = date.format("MMMM YYYY");
      addUser(data.monthly, month);
    });

    // Convert Maps to arrays
    const convertMaps = (obj) =>
      Object.fromEntries(
        Object.entries(obj).map(([k, v]) => [k, Array.from(v.values())])
      );

    setGrouped({
      annually: convertMaps(data.annually),
      quarterly: convertMaps(data.quarterly),
      monthly: convertMaps(data.monthly),
    });
  }, [activities]);

  return grouped;
};
export default CustomeDateDataHandler;
