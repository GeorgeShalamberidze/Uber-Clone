import { Redirect } from "expo-router";

const Home: React.FC = () => {
  return <Redirect href="/(auth)/welcome" />;
};

export default Home;
