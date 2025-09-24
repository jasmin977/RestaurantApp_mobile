import { darkPalette, lightPalette } from '../../themes';

const darkStyle = [
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

const lightStyle = [
  {
    elementType: 'geometry',
    stylers: [{}],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#eb925e',
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

export { darkStyle, lightStyle };
