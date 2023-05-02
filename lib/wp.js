import wpapi from 'wpapi';

export default function wp() {
  const wp = new wpapi({
    endpoint: 'https://malik-brand.com/wp-json',
    username: process.env.WP_USERNAME,
    password: process.env.WP_PASSWORD,
    auth: true,
  })
  return wp;
}
