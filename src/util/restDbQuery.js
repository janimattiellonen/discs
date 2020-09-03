const createQuery = (values = null) => {}
const createHint = (values = null) => {
  if (!values) {
    return ''
  }

  return 'h={' + values.join(',') + '}'
}

const mapType = type => {
  const types = {
    putter: 'Putter',
    fairwayDriver: 'Fairway driver',
    distanceDriver: 'Distance driver',
    midrange: 'Mid-range',
  }

  return types[type] ? types[type] : ''
}

export const createQueryString = ({ query, limit, offset, order }) => {
  console.log(`QUERY IS NOW: ${JSON.stringify(query, null, 2)}`)
  console.log(`ORDER IS NOW: ${JSON.stringify(order, null, 2)}`)
  console.log(`ORDER? ${!order}`)
  const output = []

  if (limit) {
    output.push(`max=${limit}`)
  }

  if (offset) {
    output.push(`skip=${offset}`)
  }

  //return output.join('&')

  const hints = []

  if (!order) {
    hints.push('"$orderby": {"$moment._created": 1, "name": 1}')
  } else {
    const col = order.column
    const mode = order.mode.toUpperCase()

    hints.push('"$orderby": {"' + col + '": ' + (mode === 'ASC' ? 0 : 1) + '}')
  }

  const queryParams = []

  if (query) {
    if (query.name && query.name.length) {
      queryParams.push('"name": {"$regex": "^' + query.name + '"}')
    }

    if (query.type && query.type.length) {
      queryParams.push(`"type": "${mapType(query.type)}"`)
    }

    if (query.missing && query.missing.length) {
      queryParams.push(`"missing": ${query.missing}`)
    }

    if (query.sold && query.sold.length) {
      queryParams.push(`"sold": ${query.sold}`)
    }

    if (query.donated && query.donated.length) {
      queryParams.push(`"Donated": ${query.donated}`)
    }

    if (query.collection && query.collection.length) {
      queryParams.push(`"collection_item": ${query.collection}`)
    }

    if (query.ownStamp && query.ownStamp.length) {
      queryParams.push(`"Own stamp": ${query.ownStamp}`)
    }
  }

  const hintsStr = hints.length > 0 ? 'h={' + hints.join(',') + '}' : ''

  const ret = [output.join('&'), hintsStr].join('&')

  console.log(`output: ${JSON.stringify(ret, null, 2)}`)

  console.log(`ret: ${JSON.stringify(ret, null, 2)}`)

  // return 'max=4&skip=0&q={}&h={"$orderby": {"$moment._created": 1}}'
  return `max=${limit}&skip=${offset}&q=` + '{' + queryParams.join(',') + '}' + '&h={"$orderby": {"_created": -1}}'

  // &max=${limit}&skip=${offset}&h={"$orderby": {"_created": 1, "name": 1}}
}

//getDiscs({ limit: 5, offset: 0, query: { name: 'Fop' }, order: { column: '_created', mode: 'ASC|DESC' } })

// https://testdb-8e20.restdb.io/rest/discs?metafields=true&apikey=5e98ae5a436377171a0c24a0&max=4&skip=4&h={"$orderby": "{_created": 1}}
