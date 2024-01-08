const getImageFilename = (url: string | undefined): string => {
  if (!url) {
    return '';
  }

  const imagePath = url.split('/');
  const [filename] = imagePath[imagePath.length - 1].split('.');

  return filename;
};

export default getImageFilename;
