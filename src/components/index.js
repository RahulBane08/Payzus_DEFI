/*--------------- Common Components ------------------*/
import Header from "./common/Header/Header";
import Footer from "./common/Footer/Footer";
import Sidebar from "./common/Sidebar/Sidebar";
import ChatSidebar from "./common/ChatSidebar/ChatSidebar";
import Stylebar from "./common/Stylebar/Stylebar";
import StyleSettings from "./common/StyleSettings/StyleSettings";
import Favcontacts from "./common/Chatbar/Favcontacts";
import Allcontacts from "./common/Chatbar/Allcontacts";
import Chatgroups from "./common/Chatbar/Chatgroups";
import Notifications from "./common/Notifications/Notifications";
import Messages from "./common/Messages/Messages";
import Mailbox from "./common/Mailbox/Mailbox";
import DownloadCard from "./common/DownloadCard/DownloadCard";

/*--------------- General Admin Components ------------------*/
import CardAuthor from "./general/CardElements/CardAuthor";
import CardCategory from "./general/CardElements/CardCategory";
import CardSocials from "./general/CardElements/CardSocials";
import Button from "./general/CustomButton/CustomButton";
import Checkbox from "./general/CustomCheckbox/SimpleCheckbox";
import Radio from "./general/CustomRadio/CustomRadio";
import FormInputs from "./general/FormInputs/FormInputs";
import Navmenudropdown from "./general/Navmenudropdown/Navmenudropdown";
import Navmenugroup from "./general/Navmenudropdown/Navmenugroup";
import BlogPosts from "./general/BlogPosts/BlogPosts";
import SearchPosts from "./general/SearchPosts/SearchPosts";
import Memberslist from "./general/Memberslist/Memberslist";
import Messagewidget from "./general/Messagewidget/Messagewidget";
import StatsCard from "./general/StatsCard/StatsCard";

/*--------------- Unused Components ------------------*/
//import PanelHeader from './general/PanelHeader/PanelHeader';
//import Stats from './general/Stats/Stats';
//import Tasks from './general/Tasks/Tasks';

export {
  // CardElements
  CardAuthor,
  CardCategory,
  CardSocials,
  // CustomButton
  Button,
  // CustomCheckbox
  Checkbox,
  // CustomRadio
  Radio,
  // Footer
  Footer,
  // FormInputs
  FormInputs,
  // Header
  Header,
  // PanelHeader
  //PanelHeader,
  // Sidebar
  Sidebar,
  // ChatSidebar
  ChatSidebar,
  Stylebar,
  // Stats
  //Stats,
  // Tasks
  //Tasks,
  // topbar messages
  Messages,
  // topbar notifications
  Notifications,
  // chatbar Favourite contacts
  Favcontacts,
  // chatbar All contacts
  Allcontacts,
  // chatbar Groups
  Chatgroups,
  // dropdown links in navigation side menu
  Navmenudropdown,
  Navmenugroup,
  Mailbox,
  Messagewidget,
  BlogPosts,
  SearchPosts,
  Memberslist,
  StyleSettings,
  //   Dashboard Stats Card
  StatsCard,
  DownloadCard,
};
