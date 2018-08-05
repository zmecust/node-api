import koaRouter from 'koa-router';
import articleController from '../controllers/articleController';

const router = koaRouter();

router.get('/articles', articleController.index);

export default router;
