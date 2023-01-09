const mapType = (type) => {
    const types = {
        putter: 'Putter',
        fairwayDriver: 'Fairway driver',
        distanceDriver: 'Distance driver',
        midrange: 'Mid-range',
    };

    return types[type] ? types[type] : '';
};

export const createQueryString = ({ query, limit, offset, order }) => {
    const output = [];

    let limitValue = limit;

    if (limitValue) {
        output.push(`max=${limitValue}`);
    }

    if (offset) {
        output.push(`skip=${offset}`);
    }

    let hints = [];

    if (!order) {
        hints.push('"$orderby": {"$moment._created": 1, "name": 1}');
    } else {
        const col = order.column;
        const mode = order.mode.toUpperCase();

        hints.push(`"$orderby": {"${col}": ${mode === 'ASC' ? 1 : -1}}`);
    }

    const queryParams = [];
    if (query) {
        if (query.name && query.name.length >= 2) {
            queryParams.push(`"name": {"$regex": "^${query.name}"}`);
        }

        if (query.type && query.type.length) {
            queryParams.push(`"type": "${mapType(query.type)}"`);
        }

        if (query.manufacturer && query.manufacturer.length) {
            queryParams.push(`"manufacturer": "${query.manufacturer}"`);
        }

        if (query.missing && query.missing.length) {
            queryParams.push(`"missing": ${query.missing}`);
        }

        if (query.sold && query.sold.length) {
            queryParams.push(`"sold": ${query.sold}`);
        }

        if (query.forSale && query.forSale.length) {
            queryParams.push(`"for_sale": ${query.forSale}`);
        }

        if (query.donated && query.donated.length) {
            queryParams.push(`"donated": ${query.donated}`);
        }

        if (query.collection && query.collection.length) {
            queryParams.push(`"collection_item": ${query.collection}`);
        }

        if (query.ownStamp && query.ownStamp.length) {
            queryParams.push(`"own_stamp": ${query.ownStamp}`);
        }

        if (query.holeInOne && query.holeInOne.length) {
            queryParams.push(`"hole_in_one": ${query.holeInOne}`);
        }

        if (query.broken && query.broken.length) {
            queryParams.push(`"broken": ${query.broken}`);
        }

        if (query.favourite && query.favourite.length) {
            queryParams.push(`"favourite": ${query.favourite}`);
        }

        if (query.glow && query.glow.length) {
            queryParams.push(`"glow": ${query.glow}`);
        }

        if (query.huk && query.huk.length) {
            queryParams.push(`"huk": ${query.huk}`);
        }

        if (query.available && query.available.length) {
            const availableQuery = [];

            availableQuery.push('{"donated": {"$not": true}}');
            availableQuery.push('{"missing": {"$not": true}}');
            availableQuery.push('{"sold": {"$not": true}}');
            availableQuery.push('{"broken": {"$not": true}}');

            queryParams.push(`"$and": [${availableQuery.join(',')}]`);
        }

        if (query.latest) {
            hints = [];
            hints.push('"$orderby": {"_created": -1}');
            limitValue = 10;
        }
    }

    return `max=${limitValue}&skip=${offset}&q={${queryParams.join(',')}}&h={${hints.join(',')}}&totals=true`;
};
