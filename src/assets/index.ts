//restaurants images
export { default as rest_1 } from './images/restaurants/1.jpg';
export { default as rest_2 } from './images/restaurants/2.jpg';
export { default as rest_3 } from './images/restaurants/3.jpg';
export { default as rest_4 } from './images/restaurants/4.jpg';
export { default as rest_5 } from './images/restaurants/5.jpg';

//meals
export { default as classicBurger } from './images/meals/burger1.jpg';
export { default as vegyBurger } from './images/meals/burger2.jpg';
export { default as vegeterianPizza } from './images/meals/vegeterian_pizza.jpg';
export { default as peperoniPizza } from './images/meals/peperoni_pizza.jpg';
export { default as eggsBenedict } from './images/meals/eggs_benedict.jpg';
export { default as avocadoToast } from './images/meals/avocado_toast.jpg';
export { default as pancakes } from './images/meals/pancakes.jpg';
export { default as salad } from './images/meals/salad.jpg';
export { default as seafood } from './images/meals/seafood.jpg';
export { default as RESTAURANT } from './images/restaurants/1.jpg';

//AVATARS
export { default as AVATAR } from './images/avatars/avatar_1.jpg';
//fonts
export { default as BOLD } from './fonts/poppins/Poppins-Bold.ttf';
export { default as MEDIUM } from './fonts/poppins/Poppins-Medium.ttf';
export { default as REGULAR } from './fonts/poppins/Poppins-Regular.ttf';

//SVG
export { default as MenuIcon } from './svg/Menu';
export { default as NotifIcon } from './svg/Notif';
export { default as FilterIcon } from './svg/Filter';
export { default as SettingsIcon } from './svg/Settings';
export { default as HomeIcon } from './svg/Home';
export { default as SearchIcon } from './svg/Search';
export { default as QRcodeIcon } from './svg/QRcode';
export { default as LikeIcon } from './svg/Like';
export { default as StarIcon } from './svg/Star';
export { default as LoaderIcon } from './svg/Loader';
export { default as BackIcon } from './svg/Back';
export { default as LocationIcon } from './svg/Location';
export { default as ClockIcon } from './svg/Clock';
export { default as SaveIcon } from './svg/Save';
export { default as CloseIcon } from './svg/Close';
export { default as LogoutIcon } from './svg/Logout';
export { default as NextIcon } from './svg/Next';

//GIFs
export { default as LoaderGif } from './GIF/fork.gif';
export { default as ScanGif } from './GIF/scan.gif';
export { default as ReviewGif } from './GIF/review.gif';

const assets = {
  lottieFiles: {
    QRscanner: require('./JSON/scanning-qr-code.json'),
    QRscanSuccessful: require('./JSON/qr-scan-successful.json'),
    QRscanIcon: require('./JSON/scan-qr-code.json'),
    SearchNotFound: require('./JSON/search-not-found.json'),
  },
};
export default assets;
