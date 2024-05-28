import { useQuery } from "@apollo/client";
import { GET_RECIPES, GET_RECIPE } from "../components/utils/queries";

export const Homepage = () => {
  // useEffect(() => {

  // })

  const { loading, error, data } = useQuery(GET_RECIPE, {
    variables: {
      id: "",
    },
  });

  console.log(data);
  return <div>Homepage {process.env.NEXT_PUBLIC_API_ENDPOINT}</div>;
};

export default Homepage;
