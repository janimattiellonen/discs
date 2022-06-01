import moment from 'moment';

export default (discs, filter) => {
    /*
  discs = discs.sort((a, b) => {
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1
    }

    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1
    }

    return 0
  })
  */

    if (!filter) {
        return discs;
    }

    if (filter.type === 'distanceDriver') {
        return discs.filter((disc) => disc.type.id === 'distance-driver');
    }

    if (filter.type === 'fairwayDriver') {
        return discs.filter((disc) => disc.type.id === 'fairway-driver');
    }

    if (filter.type === 'putter') {
        return discs.filter((disc) => disc.type.id === 'putter');
    }

    if (filter.type === 'midrange') {
        return discs.filter((disc) => disc.type.id === 'mid-range');
    }

    if (filter.type === 'approach') {
        return discs.filter((disc) => disc.type.id === 'approach');
    }

    if (filter.type === 'missing') {
        return discs.filter((disc) => disc.is_missing === true);
    }

    if (filter.type === 'sold') {
        return discs.filter((disc) => disc.is_sold === true);
    }

    if (filter.type === 'forSale') {
        return discs.filter((disc) => disc.for_sale === true);
    }

    if (filter.type === 'donated') {
        return discs.filter((disc) => disc.is_donated === true);
    }

    if (filter.type === 'broken') {
        return discs.filter((disc) => disc.is_broken === true);
    }

    if (filter.type === 'collection') {
        return discs.filter((disc) => disc.is_collection_item === true);
    }

    if (filter.type === 'ownStamp') {
        return discs.filter((disc) => disc.is_own_stamp === true);
    }

    if (filter.type === 'available') {
        return discs.filter((disc) => disc.is_sold !== true && disc.is_missing !== true && disc.is_broken !== true);
    }

    if (filter.type === 'holeInOne') {
        return discs.filter((disc) => disc.is_hole_in_one === true);
    }

    if (filter.type === 'latest') {
        return discs
            .sort((a, b) => {
                if (moment(a.created_at).isBefore(moment(b._created))) {
                    return -1;
                }

                if (moment(a.created_at).isAfter(moment(b._created))) {
                    return 1;
                }

                if (moment(a.created_at).isSame(moment(b._created))) {
                    return 0;
                }

                return 1;
            })
            .takeLast(10)
            .reverse();
    }

    return discs;
};
