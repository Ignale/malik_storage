const sizes = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};
export const devices = {
  mobileS: `@media(max-width: ${sizes.mobileS})`,
  mobileM: `@media(max-width: ${sizes.mobileM})`,
  mobileL: `@media(max-width: ${sizes.mobileL})`,
  tablet: `@media(max-width: ${sizes.tablet})`,
  laptop: `@media(max-width: ${sizes.laptop})`,
  laptopL: `@media(max-width: ${sizes.laptopL})`,
  desktop: `@media(max-width: ${sizes.desktop})`,
};