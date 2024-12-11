export const transformedObjectDetails = (schema: any | {}) => {
    const convert = schema.map((d: any) => ({
        language: d.language,
        content: {
            bedrooms: d.bedrooms,
            bathrooms: d.bathrooms,
            size: d.size,
            parking: d.parking
        }
    }))
    return convert
}
