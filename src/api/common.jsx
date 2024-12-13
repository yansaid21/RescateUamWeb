export function addFiltersParams(url, filters) {
  if (filters) {
    for (const key in filters) {
      if (filters[key] === null) {
        continue;
      }
      for (const value of filters[key]) {
        url += `&${key}[]=${value}`;
      }
    }
  }
  return url;
}

export function addQueryParams(
  url,
  { page = 1, perPage = 15, orderBy, order, filters, searchValue },
) {
  url += `?page=${page}`;
  url += `&per_page=${perPage}`;
  if (searchValue) {
    url += `&search=${searchValue}`;
  }
  if (orderBy) {
    url += `&order_by=${orderBy}`;
  }
  if (order) {
    url += `&order=${order}`;
  }
  url = addFiltersParams(url, filters);
  return url;
}
