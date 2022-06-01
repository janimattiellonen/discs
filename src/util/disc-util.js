export default {
    getManufacturer: (code) => {
        switch (code) {
            case 'innova':
                return 'Innova';

            default:
                return code;
        }
    },
    getDiscMaterial: (code) => {
        switch (code) {
            case 'star':
                return 'Star';

            default:
                return code;
        }
    },
    getDiscType: (code) => {
        switch (code) {
            case 'midrange':
                return 'Mid-range';

            case 'fairwayDriver':
                return 'Fairway driver';

            default:
                return code;
        }
    },
};
