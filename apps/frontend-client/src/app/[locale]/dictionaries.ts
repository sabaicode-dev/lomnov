import 'server-only'
const dictionaries = {
    en: () => import('@/app/dictionaries/en.json').then((module) => module.default),
    kh: () => import('@/app/dictionaries/kh.json').then((module) => module.default),
}
export const getDictionary = async (locale: 'en' | 'kh') => dictionaries[locale]()