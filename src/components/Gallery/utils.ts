const bucketPath = 'https://storage.googleapis.com/iflydrones-public/testing';

const sizes = [300, 600, 1200, 2000, 3000];

export const createSrcSet = (fileName: string) => {
  return sizes.map((size) => `${createImagePath(fileName, size)} ${size}w`).join(', ');
};

export const createImagePath = (fileName: string, size: number) => {
  const [name, ext] = fileName.split('.');

  return `${bucketPath}/${name}-w${size}.${ext}`;
};
