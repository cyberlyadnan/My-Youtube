import "./App.css";
import Head from "./Components/Head";
import Body from "./Components/Body";
import store from "./Utils/store";
import { Provider } from "react-redux";
import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import ShimmerCard from "./Components/ShimmerCard";
import ChannelViewPage from "./Components/ChannelViewPage";


const WatchPage = lazy(() => import("./Components/WatchPage"));
const ErrorPage = lazy(() => import("./Components/ErrorPage"));
const SearchPage = lazy(() => import("./Components/SearchPage"));
const MainContainer = lazy(() => import("./Components/MainContainer"));

const App = () => {
  return (
    <Provider store={store}>
      <Head />
      <Body />
    </Provider>
  );
};

export const RouterList = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <Suspense fallback={<div><ShimmerCard /></div>}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div><ShimmerCard /></div>}>
            <MainContainer />
          </Suspense>
        ),
      },
      {
        path: "watch",
        element: (
          <Suspense fallback={<div><ShimmerCard /></div>}>
            <WatchPage />
          </Suspense>
        ),
      },
      {
        path: "results",
        element: (
          <Suspense fallback={<div><ShimmerCard /></div>}>
            <SearchPage />
          </Suspense>
        ),
      },
      {
        path: "channel/:channelid",
        element: (
          <Suspense fallback={<div><ShimmerCard /></div>}>
            <ChannelViewPage />
          </Suspense>
        ),
      },
    ],
  },
]);


