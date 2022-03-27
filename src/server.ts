process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import BlogRoute from '@routes/blog.route';
import PrescriptionRoute from '@routes/prescription.route';
import CategoryRoute from '@routes/category.route';
import ProductRoute from '@routes/products.route';
import validateEnv from '@utils/validateEnv';
import OrderRoute from './routes/order.route';
import BannerRoute from './routes/banner.route';

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new BlogRoute(),
  new PrescriptionRoute(),
  new ProductRoute(),
  new CategoryRoute(),
  new OrderRoute(),
  new BannerRoute(),
]);

app.listen();
