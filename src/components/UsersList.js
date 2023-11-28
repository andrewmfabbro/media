import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store";
import Skeleton from "./Skeleton";

function UsersList() {
  const dispatch = useDispatch();
  const { isLoading, data, error } = useSelector((state) => {
    return state.users; // {data: [], isloading , error}
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (isLoading) {
    return <Skeleton times={6} className="h-10 w-full"/>; //set box amount with times
  }
  if (error) {
    return <div>Error fetching data...</div>;
  }
  return <div>{data.length}</div>;
}

export default UsersList;
