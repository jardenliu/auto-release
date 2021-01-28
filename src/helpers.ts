import { GitHub } from '@actions/github/lib/utils'
import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types'

export type Ootokit = InstanceType<typeof GitHub>
export type Release = RestEndpointMethodTypes['repos']['getReleaseByTag']['response']['data']
export interface CreateOptions {
    name: string
    code: string
    body: string
    prerelease: boolean
}

export interface UploadAssetOptions {
    url: string
    source: string
    target: string
    mineType: string
}

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

export const delay = async (time: number = 1000) => {
    return new Promise(resolve => {
        setTimeout(() => resolve(true), time)
    })
}

export const retryOnFailed = async <T>(
    asyncFunc: () => Promise<T>,
    maxTries = 3,
    delayTime = 1000
): Promise<T> => {
    if (maxTries < 1) {
        throw `Retried ${maxTries} failed always. aborting`
    }

    try {
        await delay(delayTime)
        return await asyncFunc()
    } catch (e) {
        console.log('retryOnFailed', e)
        return await retryOnFailed(asyncFunc, --maxTries, delayTime)
    }
}
