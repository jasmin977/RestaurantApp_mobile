import { darkPalette } from '../../themes';

const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: darkPalette.card,
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: darkPalette.primary,
      },
    ],
  },
];

export default mapStyle;
