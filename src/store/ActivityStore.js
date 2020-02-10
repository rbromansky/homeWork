import uuid from "uuid/v4";
import { types as t } from "mobx-state-tree";

export const ActivityModel = t.model("TodoModel", {
  id: t.identifier,
  date: t.string,
  type: t.string,
  distance: t.number,
  duration: t.number,
  speed: t.number
});

export const ActivityListModel = t
  .model("ActivityListModel", {
    list: t.array(ActivityModel)
  })
  .views(store => ({
    get runList() {
      return store.list.filter(item => item.type === "Run");
    },
    get rideList() {
      return store.list.filter(item => item.type === "Ride");
    },
    get runTotalDistance() {
      let total = 0;
      store.runList.map(activity => (total = total + activity.distance));

      return total;
    },
    get rideTotalDistance() {
      let total = 0;
      store.rideList.map(activity => (total = total + activity.distance));

      return total;
    },
    get longestRun() {
      let longest = store.runList[0];
      store.runList.map(
        activity =>
          (longest = longest < activity.distance ? activity.distance : longest)
      );
      return longest;
    },
    get longestRide() {
      let longest = store.rideList[0];
      store.rideList.map(
        activity =>
          (longest =
            longest.distance < activity.distance ? activity.distance : longest)
      );

      return longest;
    }
  }))
  .actions(store => ({
    add(date, type, distance, duration, speed) {
      const activity = ActivityModel.create({
        id: uuid(),
        date,
        type,
        distance,
        duration,
        speed
      });

      store.list.unshift(activity);
    }
  }));

const rootStore = ActivityListModel.create({});

rootStore.add("2020/01/02", "Run", 3.4, 68, 16.5);
rootStore.add("2020/02/09", "Ride", 5.4, 30, 18.3);
rootStore.add("2020/02/05", "Run", 6.7, 270, 20.5);

export default rootStore;
