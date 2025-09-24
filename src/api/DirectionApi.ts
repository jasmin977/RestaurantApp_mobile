import axios from 'axios';
const api_key = '5b3ce3597851110001cf624851e1bb7a07d04fd98fd13826b89c0924';

class DirectionAPI {
  public static getDirection({ src, dest }: { src: number[]; dest: number[] }) {
    return axios.get(
      `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${api_key}&start=${src[0]},${src[1]}&end=${dest[0]},${dest[1]}`
    );
  }
}

export default DirectionAPI;
