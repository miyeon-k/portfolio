import Vue from 'vue';
import VueRouter from 'vue-router';

import KrLayout from '../layout/KrLayout.vue';
import EnLayout from '../layout/EnLayout.vue';

import KrHome from '../views/kr/main/index.vue';
import KrCompany from '../views/kr/company/company.vue';
import KrMedia from '../views/kr/media/media.vue';
import KrDoc from '../views/kr/doc/index.vue';
import KrPrivacy from '../views/kr/etc/privacy.vue';
import KrTerms from '../views/kr/etc/terms.vue';
import EnHome from '../views/en/main/index.vue';
import EnCompany from '../views/en/company/company.vue';
import EnMedia from '../views/en/media/media.vue';
import EnDoc from '../views/en/doc/index.vue';
import app from '../views/app/app.vue';

Vue.use(VueRouter);

const routes = [

  {
    path: '/',
    name: 'KrHome',
    component: KrHome,
    meta: { layout: KrLayout },
  },
  {
    path: '/kr/',
    name: 'KrHome',
    component: KrHome,
    meta: { layout: KrLayout },
  },
  {
    path: '/kr/company',
    name: 'KrCompany',
    component: KrCompany,
    meta: { layout: KrLayout },
  },
  {
    path: '/kr/media',
    name: 'KrMedia',
    component: KrMedia,
    meta: { layout: KrLayout },
  },
  {
    path: '/kr/doc',
    name: 'KrDoc',
    component: KrDoc,
    meta: { layout: KrLayout },
  },
  {
    path: '/kr/privacy',
    name: 'KrPrivacy',
    component: KrPrivacy,
    meta: { layout: KrLayout },
  },
  {
    path: '/kr/terms',
    name: 'KrTerms',
    component: KrTerms,
    meta: { layout: KrLayout },
  },

  {
    path: '/en/',
    name: 'EnHome',
    component: EnHome,
    meta: { layout: EnLayout },
  },
  {
    path: '/en/company',
    name: 'EnCompany',
    component: EnCompany,
    meta: { layout: EnLayout },
  },
  {
    path: '/en/media',
    name: 'EnMedia',
    component: EnMedia,
    meta: { layout: EnLayout },
  },
  {
    path: '/en/doc',
    name: 'EnDoc',
    component: EnDoc,
    meta: { layout: EnLayout },
  },
  {
    path: '/app/hispace',
    name: 'hispaceAppCheck',
    component: app,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
