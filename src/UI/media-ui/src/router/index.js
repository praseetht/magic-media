import Vue from "vue";
import VueRouter from "vue-router";

import AlbumFilter from "../components/Album/AlbumFilter";
import AlbumList from "../components/Album/AlbumList";
import DefaultAppBar from "../components/DefaultAppBar";
import FaceAppBar from "../components/Face/FaceAppBar";
import FaceFilter from "../components/Face/FaceFilter";
import MapView from "../components/Map/MapView";
import MapAppBar from "../components/Map/MapAppBar";
import MapFilter from "../components/Map/MapFilter";
import MediaAppBar from "../components/Media/MediaAppBar";
import MediaFilter from "../components/Media/MediaFilter";
import PersonFilter from "../components/Person/PersonFilter";
import FaceList from "../components/Face/FaceList.vue";
import MediaList from "../components/Media/MediaList";
import PersonList from "../components/Person/PersonList";
import UserList from "../components/User/UserList";
import UserFilter from "../components/User/UserFilter";
import Playground from "../components/Playground/Playground";
import PersonTimeline from "../components/Person/PersonTimeline"
import SettingsPage from "../components/Settings/SettingsPage"
import MediaViewLaucher from "../components/Media/MediaViewLauncher"
import LoggedOut from "../components/LoggedOut"
import SessionExpired from "../components/SessionExpired"
import ErrorPage from "../components/ErrorPage"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    components: {
      default: MediaList,
      left: MediaFilter,
      appbar: MediaAppBar
    }
  },
  {
    path: "/faces",
    name: "Faces",
    components: {
      default: FaceList,
      left: FaceFilter,
      appbar: FaceAppBar
    }
  },
  {
    path: "/persons",
    name: "Persons",
    components: {
      default: PersonList,
      left: PersonFilter,
      appbar: DefaultAppBar
    }
  },
  {
    path: "/persons/timeline/:id",
    name: "PersonTimeline",
    components: {
      default: PersonTimeline,
      left: PersonFilter,
      appbar: DefaultAppBar
    },
    meta: { hideSidebar: true }
  },
  {
    path: "/media/view/:id",
    name: "MediaViewLauncher",
    components: {
      default: MediaViewLaucher,
      left: null,
      appbar: DefaultAppBar
    },
    meta: { hideSidebar: true }
  },
  {
    path: "/albums",
    name: "Albums",
    components: {
      default: AlbumList,
      left: AlbumFilter,
      appbar: DefaultAppBar
    }
  },
  {
    path: "/users",
    name: "Users",
    components: {
      default: UserList,
      left: UserFilter,
      appbar: DefaultAppBar
    }
  },
  {
    path: "/map",
    name: "Map",
    components: {
      default: MapView,
      left: MapFilter,
      appbar: MapAppBar
    }
  },
  {
    path: "/settings",
    name: "Settings",
    components: {
      default: SettingsPage,
      left: null,
      appbar: DefaultAppBar
    },
    meta: { hideSidebar: true }
  },
  {
    path: "/playground",
    name: "Playground",
    components: {
      default: Playground,
      left: null,
      appbar: DefaultAppBar
    }
  },
  {
    path: "/loggedout",
    name: "LoggedOut",
    components: {
      root: LoggedOut,
      default: null,
      left: null,
      appbar: null,
    },
    meta: { hideSidebar: true, isRoot: true }
  },
  {
    path: "/session/expired",
    name: "SessionExpired",
    components: {
      root: SessionExpired,
      default: null,
      left: null,
      appbar: null
    },
    meta: { hideSidebar: true, isRoot: true }
  },
  {
    path: "/error",
    name: "Error",
    components: {
      root: ErrorPage,
      default: null,
      left: null,
      appbar: null
    },
    meta: { hideSidebar: true, isRoot: true }
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
