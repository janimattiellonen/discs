export default {
  getManufacturer: (code) => {
    switch (code) {
      case 'innova':
        return 'Innova';

      default:
        return 'Unknown';
    }
  },
  getDiscMaterial: (code) => {
    switch (code) {
      case 'star':
        return 'Star';

      default:
        return 'Unknown';
    } 
  },
  getDiscType: (code) => {
    switch (code) {
      case 'midrange':
        return 'Mid-range';

      case 'fairwayDriver':
        return 'Fairway driver';

      default:
        return 'Unknown';
    }
  }


};