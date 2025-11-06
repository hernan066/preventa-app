import { useSelector } from "react-redux";
import { Error } from "../components/error/Error";
import Loading from "../components/loading/Loading";
import { User } from "../components/user/User";
import { useGetUserQuery } from "../api/apiUser";

export const UserPage = () => {
  const { user } = useSelector((state) => state.authDelivery);

  const {
    data,
    isLoading,
    isError,
  } = useGetUserQuery(user)

  return (
    <>
      {isError && <Error />}
      {isLoading && <Loading />}
      {data && <User data={data.data.user} />}
    </>
  );
};
