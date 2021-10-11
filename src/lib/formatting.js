export function fromNFTAttributes(items) {
  return items.map((item) => {
    return {
      term: item["trait_type"],
      description: item["value"]
    };
  });
}

export function fromObject(object) {
  const keys = Object.keys(object);
  return keys.map((key) => {
    return {
      term: key,
      description: object[key]
    };
  });
}
