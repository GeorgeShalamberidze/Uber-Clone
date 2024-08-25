import { Text, View } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

const Map: React.FC = () => {
  // const region = {}
  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      className="w-full h-full rounded-2xl"
      tintColor="black"
      mapType="standard"
      showsPointsOfInterest={false}
      // initialRegion={}
      showsUserLocation
      userInterfaceStyle="dark"
    >
      <Text>Map</Text>
    </MapView>
  );
};

export default Map;
