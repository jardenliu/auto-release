export const getAssetsFromInput = (input = '') => {
    return input.split(' ').map(asset => {
        const [source, target, mineType] = asset.split(':')
        return {
            source,
            target,
            mineType
        }
    })
}
