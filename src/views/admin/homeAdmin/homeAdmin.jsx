import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RentBarChart from "../../../shared/components/rentBarChart";
import RentCard from "../../../shared/components/rentCard";
import RentLineChart from "../../../shared/components/rentLineChart";
import UsersWizard from "./components/usersWizard";
import CategoriesWizard from "./components/categoriesWizard/categoriesWizard";
import PostsWizard from "./components/postsWizard/postsWizard";
import { doGetApiMethod } from "../../../api/services/axios-service/axios-service";

const HomeAdmin = () => {
  const user = useSelector((state) => state.userSlice.user);
  const [usersCount, setUsersCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [postCount, setPostsCount] = useState(0);
  const [postsByCategory, setPostsByCategory] = useState([]);

  useEffect(() => {
    getUsersCount();
    getCategoriesCount();
    getPostsCount();
    getPostsByCategory();
  }, []);

  const getUsersCount = async () => {
    const { data } = await doGetApiMethod("/users/count");
    setUsersCount(data.count);
  };

  const getCategoriesCount = async () => {
    const { data } = await doGetApiMethod("/categories/count");
    setCategoriesCount(data.count);
  };

  const getPostsCount = async () => {
    const { data } = await doGetApiMethod("/posts/count");
    setPostsCount(data.count);
  };

  const getPostsByCategory = async () => {
    const { data } = await doGetApiMethod("/posts/count-by-category");
    const mappedCategories = mapPostsByCategory(data);
    setPostsByCategory(mappedCategories);
  };

  const mapPostsByCategory = (categories) => {
    return categories.map((category) => {
      return {
        name: category.name,
        Category: category.count,
      };
    });
  };

  // config
  const data = [
    {
      name: 1687368739,
      users: 30,
    },
    {
      name: 1689960739,
      users: 40,
    },
    {
      name: 1692639139,
      users: 200,
    },
    {
      name: 1695317539,
      users: 180,
    },
    {
      name: 1697909539,
      users: 300,
    },
  ];

  return (
    <React.Fragment>
      <div className="flex gap-2 mt-5">
        <UsersWizard count={usersCount} />
        <CategoriesWizard count={categoriesCount} />
        <PostsWizard count={postCount} />
      </div>

      {/* posts by category */}
      <RentCard styleClass={"mb-4 shadow-lg"}>
        <h4 className="ps-3 mb-4 font-semibold text-center">Category:</h4>
        <RentBarChart config={null} activeLegend={false} />
      </RentCard>

      {/* users by date */}
      <RentCard styleClass={"shadow-lg mb-4"}>
        <h4 className="ps-3 mb-4 font-semibold text-center">Users:</h4>
        <RentLineChart config={data} />
      </RentCard>
    </React.Fragment>
  );
};
export default HomeAdmin;
