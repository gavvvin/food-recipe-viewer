export const Homepage = () => {
  console.log(process.env.NEXT_PUBLIC_GQL_API_ENDPOINT);
  return <div>Homepage {process.env.NEXT_PUBLIC_GQL_API_ENDPOINT}</div>;
};

export default Homepage;
