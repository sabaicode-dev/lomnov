import 'server-only'
const dictionaries = {
    en: () => import('@/app/dictionaries/en.json').then((module) => module.default),
    km: () => import('@/app/dictionaries/kh.json').then((module) => module.default),
}
export const getDictionary = async (locale: 'en' | 'km') => dictionaries[locale]()