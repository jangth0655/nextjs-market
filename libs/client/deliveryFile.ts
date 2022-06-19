const deliveryFile = (imageId?: string, small?: "small") => {
  return small === "small"
    ? `https://imagedelivery.net/h3kJx8b63YkXouCAFpwF5w/${imageId}/avatar`
    : `https://imagedelivery.net/h3kJx8b63YkXouCAFpwF5w/${imageId}/public`;
};

export default deliveryFile;
